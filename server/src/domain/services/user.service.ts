import { Injectable } from '@nestjs/common';

import { UserEntity } from '@shop-domain/entities/user.entity';

@Injectable()
export class UserService {
  private readonly users: UserEntity[] = [];

  add(user: UserEntity) {
    this.users.push(user);
  }

  showAll(): UserEntity[] {
    return this.users;
  }
}
