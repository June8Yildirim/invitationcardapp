/* eslint-disable @typescript-eslint/no-require-imports -- drivers load lazily; see `drivers`. */

/**
 * Server-only database access. Import this from API routes (`src/app/**\/*+api.ts`), never from
 * screens or components: drivers don't run on devices, and credentials must stay off the client.
 *
 * The scheme of DATABASE_URL picks the driver. To support another database, add an entry to
 * `drivers`.
 *
 *   const users = await sql<User>`SELECT * FROM users WHERE id = ${id}`;
 *
 * Interpolated values are always sent as bound parameters, so they can't inject SQL, and the same
 * query works on every driver.
 */

const DEFAULT_URL = 'postgresql://localhost:5432/invitationcardapp';

type Row = Record<string, unknown>;

export interface Driver {
  /** Bound-parameter marker for the value at a zero-based position. */
  placeholder(index: number): string;
  execute(text: string, params: unknown[]): Promise<Row[]>;
  close(): Promise<void>;
}

function postgres(url: string): Driver {
  const { Pool } = require('pg') as typeof import('pg');
  const pool = new Pool({ connectionString: url });
  // Without a listener, a dropped idle connection (e.g. a database restart) crashes the process.
  pool.on('error', (error) => console.error('Idle database connection failed', error));
  return {
    placeholder: (index) => `$${index + 1}`,
    execute: async (text, params) => (await pool.query(text, params)).rows,
    close: () => pool.end(),
  };
}

function mysql(url: string): Driver {
  const { createPool } = require('mysql2/promise') as typeof import('mysql2/promise');
  const pool = createPool(url);
  return {
    placeholder: () => '?',
    execute: async (text, params) => {
      const [rows] = await pool.execute(text, params as never[]);
      return Array.isArray(rows) ? (rows as Row[]) : [];
    },
    close: () => pool.end(),
  };
}

function sqlite(url: string): Driver {
  const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');
  const db = new DatabaseSync(url.replace(/^sqlite:(\/\/)?/, ''));
  return {
    placeholder: () => '?',
    execute: async (text, params) => db.prepare(text).all(...(params as never[])) as Row[],
    close: async () => {
      db.close();
    },
  };
}

// Each driver loads its package on first use, so only the selected one has to be present at runtime.
const drivers: Record<string, (url: string) => Driver> = {
  postgres,
  postgresql: postgres,
  mysql,
  sqlite,
};

function connect(url: string): Driver {
  const scheme = url.split(':', 1)[0].toLowerCase();
  const driver = Object.hasOwn(drivers, scheme) ? drivers[scheme] : undefined;
  if (!driver) {
    throw new Error(
      `Unsupported database "${scheme}". Supported: ${Object.keys(drivers).join(', ')}.`,
    );
  }
  return driver(url);
}

// Lives on globalThis because each API route is bundled separately and dev reloads re-run this
// module, so a module-level variable would give every route its own pool.
const shared = globalThis as typeof globalThis & { __db?: Driver };

/** Returns the process-wide connection, creating it on first use. */
export function getDb(): Driver {
  shared.__db ??= connect(process.env.DATABASE_URL || DEFAULT_URL);
  return shared.__db;
}

/** Compiles a tagged template into the driver's parameterized form. */
export function compile(driver: Pick<Driver, 'placeholder'>, strings: TemplateStringsArray) {
  return strings.reduce((text, part, i) => text + driver.placeholder(i - 1) + part);
}

/** Runs a query. Returns the rows, or an empty array for statements that return none. */
export async function sql<T extends Row = Row>(
  strings: TemplateStringsArray,
  ...params: unknown[]
): Promise<T[]> {
  const driver = getDb();
  return (await driver.execute(compile(driver, strings), params)) as T[];
}

/** Closes the shared connection, e.g. on shutdown or after tests. */
export async function closeDb(): Promise<void> {
  const driver = shared.__db;
  shared.__db = undefined;
  await driver?.close();
}
