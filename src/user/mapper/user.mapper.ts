import { ReturnUserDto } from '../dto/return-user.dto';

export class prismaUserMapper {
  static toPrisma(user: ReturnUserDto) {
    return {
      id: user.id,
      userId: user.userId,
      name: user.name,
      surname: user.surname,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
