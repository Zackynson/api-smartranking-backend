import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlayerValidationPipe } from './create-player-validation.pipe';

describe('ValidationService', () => {
  let service: CreatePlayerValidationPipe;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatePlayerValidationPipe],
    }).compile();

    service = module.get<CreatePlayerValidationPipe>(
      CreatePlayerValidationPipe,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
