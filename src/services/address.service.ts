import { Repository } from "typeorm";

import { AppDataSource } from "../config";

import {
  CreateAddressDto,
  GetAddressesQueryDto,
  UpdateAddressDto,
} from "../dtos";

import { Address } from "../entities";

class AddressService {
  private readonly addressService: Repository<Address>;

  constructor() {
    this.addressService = AppDataSource.getRepository(Address);
  }

  createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const { addressLine1, addressLine2, addressReference, userId } =
      createAddressDto;

    const newAddress: Address = this.addressService.create({
      addressLine1,
      addressLine2,
      addressReference,
      user: {
        id: userId,
      },
    });

    return this.addressService.save(newAddress);
  }

  getUserAddress(
    getAddressesQueryDto: GetAddressesQueryDto
  ): Promise<Address[]> {
    const { userId, limit = 10, offset = 0 } = getAddressesQueryDto;

    return this.addressService.find({
      where: {
        user: {
          id: userId,
        },
      },
      take: limit,
      skip: offset,
    });
  }

  getAddressById(id: string): Promise<Address | null> {
    return this.addressService.findOne({
      where: {
        id,
      },
    });
  }

  updateAddressById(
    address: Address,
    updateAddressDto: UpdateAddressDto
  ): Promise<Address> {
    const { addressLine1, addressLine2, addressReference } = updateAddressDto;

    const newAddress: Address = this.addressService.create({
      id: address.id,
      addressLine1,
      addressLine2,
      addressReference,
    });

    return this.addressService.save(newAddress);
  }

  deleteAddressById(address: Address): Promise<Address> {
    return this.addressService.remove(address);
  }
}

export default new AddressService();
