import type { ComponentType } from 'react';

import { DurinGate } from '@/components/durin-gate/durin-gate';
import { GateThumbnail } from '@/components/durin-gate/gate-thumbnail';
import { InvitationCard } from '@/components/invitation-card';
import { type InvitationDetails, sampleInvitation } from '@/lib/invitation';

export interface CardDesign {
  id: string;
  name: string;
  description: string;
  /** A still image for the list. Keep it cheap: it renders once per row. */
  Thumbnail: ComponentType<{ width: number; height: number }>;
  /** The full animated card. */
  Preview: ComponentType<{ invitation: InvitationDetails }>;
}

/** Every card in the app. To add one, build its component and add an entry here. */
export const cardDesigns: CardDesign[] = [
  {
    id: 'doors-of-durin',
    name: 'Doors of Durin',
    description: 'Speak the password, and the gate opens onto the great hall.',
    Thumbnail: GateThumbnail,
    Preview: ({ invitation }) => (
      <DurinGate>
        <InvitationCard invitation={invitation} />
      </DurinGate>
    ),
  },
];

export const previewInvitation = sampleInvitation;
