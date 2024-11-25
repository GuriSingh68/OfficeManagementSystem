import { Test, TestingModule } from '@nestjs/testing';
import { AddMembersController } from './add-members.controller';

describe('AddMembersController', () => {
  let controller: AddMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddMembersController],
    }).compile();

    controller = module.get<AddMembersController>(AddMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
