import { Test } from '@nestjs/testing';
import { AttendanceService } from './attendance.service';

describe('AttendanceService', () => {
  let service: AttendanceService;

  const repoMock = {
    create: jest.fn((x) => x),
    save: jest.fn(async (x) => ({ id: 'att-1', ...x })),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AttendanceService,
        {
          provide: 'AttendanceRepository',
          useValue: repoMock,
        },
      ],
    }).compile();

    service = moduleRef.get(AttendanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('checkIn should create and save a record', async () => {
    const result = await service.checkIn({ childId: 'child-1', checkedInBy: 'staff-1' });

    expect(repoMock.create).toHaveBeenCalledTimes(1);
    expect(repoMock.save).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('id');
    expect(result.childId).toBe('child-1');
  });
});
