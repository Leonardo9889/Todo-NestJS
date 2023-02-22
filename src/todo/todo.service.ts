import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { prismaTodoMapper } from './mapper/todo.mapper';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      const userExists = await this.prismaService.user.findFirst({
        where: {
          id: createTodoDto.userId,
        },
      });

      if (!userExists) {
        throw new HttpException('User not found', 404);
      }

      const newTodo = await this.prismaService.todo.create({
        data: createTodoDto,
      });

      return HttpStatus.CREATED, prismaTodoMapper.toPrisma(newTodo);
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    return await this.prismaService.todo.findMany();
  }

  async findOne(id: number) {
    try {
      const userExists = await this.prismaService.todo.findFirst({
        where: {
          id,
        },
      });

      if (!userExists) {
        throw new HttpException('Todo does not exist!!!', 404);
      }

      const findTodo = await this.prismaService.todo.findFirst({
        where: {
          id,
        },
        include: {
          User: true,
        },
      });

      return findTodo;
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try {
      const userExists = await this.prismaService.todo.findFirst({
        where: {
          id,
        },
      });

      if (!userExists) {
        throw new HttpException('Todo does not exist!!!', 404);
      }

      const updateTodo = await this.prismaService.todo.update({
        where: {
          id,
        },
        data: updateTodoDto,
      });

      return updateTodo;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number) {
    try {
      const userExists = await this.prismaService.todo.findFirst({
        where: {
          id,
        },
      });

      if (!userExists) {
        throw new HttpException('Todo does not exist!!!', 404);
      }

      await this.prismaService.todo.delete({
        where: {
          id,
        },
      });

      return;
    } catch (err) {
      throw err;
    }
  }
}
