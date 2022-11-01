/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Role, User } from './user';

@Injectable()
export class UserService {
   private users: User[] = [
       new User(1, "registro", "registro", [Role.REGISTRO]),
       new User(2, "isis", "isis", [Role.COORDINADOR]),
   ];

   async findOne(username: string): Promise<User | undefined> {
       return this.users.find(user => user.username === username);
   }
}