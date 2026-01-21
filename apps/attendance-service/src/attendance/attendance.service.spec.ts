import { Test } from '@nestjs/testing';
import { AttendanceService } from './attendance.service';

describe('AttendanceService', () => {
  let service: AttendanceService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AttendanceService],
    }).compile();

    service = moduleRef.get(AttendanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Example: replace with a real method you have
  it('should return true for a valid check-in payload', () => {
    const payload = { childId: 'child-001', checkedInBy: 'staff-01' };
    // Suppose you have a method validateCheckIn(payload)
    // expect(service.validateCheckIn(payload)).toBe(true);
    expect(payload.childId).toContain('child-');
  });
});
