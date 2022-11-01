/* eslint-disable prettier/prettier */
import { SetMetadata } from "@nestjs/common";
import { Role } from "./user";

export const Roles = (...roles: Role[]) => SetMetadata("roles", roles);