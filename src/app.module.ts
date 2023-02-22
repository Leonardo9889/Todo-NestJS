import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [UserModule, TodoModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    PrismaService,
  ],
})
export class AppModule {}
