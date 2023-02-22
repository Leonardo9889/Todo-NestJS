import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) {
      throw new HttpException('Authorization not found!', 401);
    }

    const [username, password] = Buffer.from(
      authorization.replace('Basic ', ''),
      'base64',
    )
      .toString('utf-8')
      .split(':');
    const user = await this.prismaService.user.findFirst({
      where: {
        username,
        password,
      },
    });
    if (!user) {
      throw new HttpException('Not authorized', 401);
    }
    return true;
  }
}
