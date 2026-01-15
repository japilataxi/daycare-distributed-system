export interface ChildCheckedInEvent {
  type: 'ChildCheckedIn';
  childId: string;
  occurredAt: string;
}

export interface ChildCheckedOutEvent {
  type: 'ChildCheckedOut';
  childId: string;
  occurredAt: string;
}

export type ChildEvent = ChildCheckedInEvent | ChildCheckedOutEvent;
