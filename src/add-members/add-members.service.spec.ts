import { Test, TestingModule } from '@nestjs/testing';
import { AddMembersService } from './add-members.service';

describe('AddMembersService', () => {
  let service: AddMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddMembersService],
    }).compile();

    service = module.get<AddMembersService>(AddMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
