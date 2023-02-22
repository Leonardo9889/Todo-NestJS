import { ReturnTodoDto } from '../dto/return-todo.dto';

export class prismaTodoMapper {
  static toPrisma(todo: ReturnTodoDto) {
    return {
      id: todo.userId,
      title: todo.title,
      description: todo.description,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
      userId: todo.userId,
    };
  }
}
