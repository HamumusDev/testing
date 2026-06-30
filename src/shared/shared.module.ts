import { Module } from '@nestjs/common';

import { LoggerService, UtilsService } from './services';

@Module({
  providers: [LoggerService, UtilsService],
  exports: [LoggerService, UtilsService],
})
export class SharedModule {}
