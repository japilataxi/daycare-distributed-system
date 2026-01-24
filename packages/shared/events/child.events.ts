export type ChildCheckedInEvent = {
  type: 'ChildCheckedIn';
  childId: string;
  occurredAt: string;
};

export type ChildCheckedOutEvent = {
  type: 'ChildCheckedOut';
  childId: string;
  occurredAt: string;
};
