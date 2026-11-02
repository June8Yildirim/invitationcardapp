/** @jest-environment node */
import { closeDb, compile, getDb, sql } from '@/server/db';

const strings = (parts: string[]) => Object.assign(parts, { raw: parts }) as TemplateStringsArray;

describe('compile', () => {
  const parts = strings(['SELECT * FROM t WHERE a = ', ' AND b = ', '']);

  it('numbers postgres placeholders', () => {
    expect(compile({ placeholder: (i) => `$${i + 1}` }, parts)).toBe(
      'SELECT * FROM t WHERE a = $1 AND b = $2',
    );
  });

  it('uses positional placeholders for mysql and sqlite', () => {
    expect(compile({ placeholder: () => '?' }, parts)).toBe(
      'SELECT * FROM t WHERE a = ? AND b = ?',
    );
  });
});

describe('sql', () => {
  const previousUrl = process.env.DATABASE_URL;

  beforeAll(() => {
    process.env.DATABASE_URL = 'sqlite::memory:';
  });

  afterAll(async () => {
    await closeDb();
    process.env.DATABASE_URL = previousUrl;
  });

  it('binds values as parameters and returns rows', async () => {
    const name = "Robert'); DROP TABLE guests;--";
    await sql`CREATE TABLE guests (name TEXT)`;
    await expect(sql`INSERT INTO guests (name) VALUES (${name})`).resolves.toEqual([]);

    await expect(sql`SELECT name FROM guests WHERE name = ${name}`).resolves.toEqual([{ name }]);
  });

  it('reuses one connection until it is closed', async () => {
    const db = getDb();
    await sql`SELECT 1`;
    expect(getDb()).toBe(db);

    await closeDb();
    expect(getDb()).not.toBe(db);
  });

  it('rejects unknown schemes, including inherited object keys', async () => {
    await closeDb();
    process.env.DATABASE_URL = 'oracle://localhost/db';
    expect(() => getDb()).toThrow('Unsupported database "oracle"');
    process.env.DATABASE_URL = 'constructor://localhost/db';
    expect(() => getDb()).toThrow('Unsupported database');
    process.env.DATABASE_URL = 'sqlite::memory:';
  });
});
