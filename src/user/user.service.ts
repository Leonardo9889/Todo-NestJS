import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { prismaUserMapper } from './mapper/user.mapper';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userExists = await this.prismaService.user.findFirst({
        where: {
          username: createUserDto.username,
        },
      });

      if (userExists) {
        throw new HttpException('Username already exists', 404);
      }

      const newUser = await this.prismaService.user.create({
        data: createUserDto,
      });

      return HttpStatus.CREATED, prismaUserMapper.toPrisma(newUser);
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.user.findMany();
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number) {
    try {
      const userExists = await this.prismaService.user.findFirst({
        where: {
          id,
        },
      });

      if (!userExists) {
        throw new HttpException('User not found', 404);
      }

      return prismaUserMapper.toPrisma(userExists);
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const userExists = await this.prismaService.user.findFirst({
        where: {
          id,
        },
      });

      if (!userExists) {
        throw new HttpException('User not found', 404);
      }

      const updateUser = await this.prismaService.user.update({
        data: updateUserDto,
        where: {
          id,
        },
      });

      return updateUser;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number) {
    try {
      const userExists = await this.prismaService.user.findFirst({
        where: {
          id,
        },
      });

      if (!userExists) {
        throw new HttpException('User not found', 404);
      }

      await this.prismaService.user.delete({
        where: {
          id,
        },
      });

      return HttpStatus.CONTINUE;
    } catch (err) {
      throw err;
    }
  }
}
