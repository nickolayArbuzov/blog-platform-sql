import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../outerservices/database/database.module';
import { LikesRepo } from './infrastructure/like.repo';
import { LoggerModule } from '../../helpers/logger/logger.module';
import { LikesSQL } from './infrastructure/like.repositorySQL';

@Module({
  controllers: [],
  imports: [DatabaseModule, LoggerModule],
  providers: [
    LikesRepo,
    LikesSQL,
  ],
  exports: [
    LikesRepo,
  ]
})
export class LikesModule {}
