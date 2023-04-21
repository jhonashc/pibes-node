import { Repository } from "typeorm";

import { AppDataSource } from "../config";
import { Address } from "../entities";

class AddressService {
  private readonly addressService: Repository<Address>;

  constructor() {
    this.addressService = AppDataSource.getRepository(Address);
  }

  getAddressById(id: string): Promise<Address | null> {
    return this.addressService.findOne({
      where: {
        id,
      },
    });
  }
}

export default new AddressService();
