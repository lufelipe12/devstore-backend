import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { JWTService } from './jwt.service';

describe('WithdrawTypesService', () => {
  let jwtService: JWTService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'process.env.JWT_SECRET',
          signOptions: { expiresIn: '1d' },
        }),
      ],
      providers: [JWTService],
    }).compile();

    jwtService = module.get<JWTService>(JWTService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(jwtService).toBeDefined();
  });

  it('should return token', async () => {
    const token = jwtService.sign({});
    expect(token).toBeDefined();
  });
});
