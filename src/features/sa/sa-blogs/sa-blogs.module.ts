import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../../../outerservices/database/database.module';
import { LikesModule } from '../../likes/likes.module';
import { PostsModule } from '../../posts/posts.module';
import { BlogsController } from './api/blogs.controller';
import { BlogsRepo } from './infrastructure/blogs.repo';
import { BindBlogWithUserUseCase } from './application/use-cases/BindBlogWithUser';
import { BanOneBlogByIdUseCase } from './application/use-cases/BanOneBlogById';
import { FindAllBlogsUseCase } from './application/use-cases/FindAllBlogs';
import { LoggerModule } from '../../../helpers/logger/logger.module';
import { BlogsSQL } from './infrastructure/blogs.repositorySQL';

const commands = [BindBlogWithUserUseCase, BanOneBlogByIdUseCase]
const queries = [FindAllBlogsUseCase]

@Module({
  controllers: [BlogsController],
  imports: [DatabaseModule, PostsModule, LikesModule, CqrsModule, LoggerModule],
  providers: [
    BlogsRepo,
    BlogsSQL,
    JwtService,
    ...commands,
    ...queries,
  ],
  exports: [

  ]

})
export class SABlogsModule {}
