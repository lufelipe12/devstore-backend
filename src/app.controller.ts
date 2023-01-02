import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('health')
export class AppController {
  @Get()
  @HttpCode(HttpStatus.OK)
  health() {
    return true;
  }
}
