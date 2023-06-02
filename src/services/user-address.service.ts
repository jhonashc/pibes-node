import { Repository } from "typeorm";

import { AppDataSource } from "../config";

import {
  CreateUserAddressDto,
  GetUserAddressesQueryDto,
  UpdateUserAddressDto,
} from "../dtos";

import { Address, User } from "../entities";

class UserAddressService {
  private readonly addressService: Repository<Address>;
  private readonly userService: Repository<User>;

  constructor() {
    this.addressService = AppDataSource.getRepository(Address);
    this.userService = AppDataSource.getRepository(User);
  }

  createUserAddress(
    userId: string,
    createUserAddress: CreateUserAddressDto
  ): Promise<Address> {
    const { name, sideStreet, deliveryInstruction } = createUserAddress;

    const newUserAddress: Address = this.addressService.create({
      name,
      sideStreet,
      deliveryInstruction,
      user: this.userService.create({
        id: userId,
      }),
    });

    return this.addressService.save(newUserAddress);
  }

  getUserAddresses(
    userId: string,
    getUserAddressesQueryDto: GetUserAddressesQueryDto
  ): Promise<Address[]> {
    const { limit = 10, offset = 0 } = getUserAddressesQueryDto;

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

  getUserAddress(addressId: string, userId: string): Promise<Address | null> {
    return this.addressService.findOne({
      where: {
        id: addressId,
        user: {
          id: userId,
        },
      },
    });
  }

  updateUserAddress(
    userId: string,
    addressId: string,
    updateUserAddressDto: UpdateUserAddressDto
  ): Promise<Address> {
    const { name, sideStreet, deliveryInstruction } = updateUserAddressDto;

    const newUserAddress: Address = this.addressService.create({
      id: addressId,
      name,
      sideStreet,
      deliveryInstruction,
      user: this.userService.create({
        id: userId,
      }),
    });

    return this.addressService.save(newUserAddress);
  }

  deleteUserAddress(address: Address): Promise<Address> {
    return this.addressService.remove(address);
  }
}

export default new UserAddressService();
