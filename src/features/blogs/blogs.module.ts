import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from '../../outerservices/database/database.module';
import { LikesModule } from '../likes/likes.module';
import { PostsModule } from '../posts/posts.module';
import { BlogsController } from './api/blogs.controller';
import { BlogsService } from './application/blogs.service';
import { FindAllBlogsUseCase } from './application/use-cases/FindAllBlogs';
import { FindOneBlogByIdUseCase } from './application/use-cases/FindOneBlogById';
import { FindPostsByBlogIdUseCase } from './application/use-cases/FindPostsByBlogId';
import { BlogIsExistRule } from './custom-validators/customValidateBlog';
import { BlogsRepo } from './infrastructure/blogs.repo';
import { LoggerModule } from '../../helpers/logger/logger.module';
import { BlogsSQL } from './infrastructure/blogs.repositorySQL';

const commands = []
const queries = [FindAllBlogsUseCase, FindPostsByBlogIdUseCase, FindOneBlogByIdUseCase]

@Module({
  controllers: [BlogsController],
  imports: [DatabaseModule, PostsModule, LikesModule, CqrsModule, LoggerModule],
  providers: [
    BlogsService,
    BlogsRepo,
    BlogsSQL,
    BlogIsExistRule,
    JwtService,
    ...commands,
    ...queries,
  ],
  exports: [
    BlogsRepo,
  ]

})
export class BlogsModule {}
