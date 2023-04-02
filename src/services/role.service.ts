import { FindOptionsWhere, In, Like, Repository } from "typeorm";

import { AppDataSource } from "../config";
import { Role } from "../entities";
import { GetRolesQueryDto } from "../dtos";

class RoleService {
  private readonly roleRepository: Repository<Role>;

  constructor() {
    this.roleRepository = AppDataSource.getRepository(Role);
  }

  getRoles(getRolesQueryDto: GetRolesQueryDto): Promise<Role[]> {
    const { name, limit = 10, offset = 0 } = getRolesQueryDto;

    const findOptionsWhere: FindOptionsWhere<Role> = {};

    if (name) {
      findOptionsWhere.name = Like(`%${name.toLowerCase()}%`);
    }

    return this.roleRepository.find({
      where: findOptionsWhere,
      take: limit,
      skip: offset,
    });
  }

  getRoleByName(name: string): Promise<Role | null> {
    return this.roleRepository.findOne({
      where: {
        name: Like(name.toLowerCase()),
      },
    });
  }

  getRolesByIds(roleIds: string[]): Promise<Role[]> {
    return this.roleRepository.find({
      where: {
        id: In(roleIds),
      },
    });
  }
}

export default new RoleService();
