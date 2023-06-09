import { Repository } from "typeorm";

import { AppDataSource } from "../database";

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
      name: name.trim().toLowerCase(),
      sideStreet: sideStreet.trim().toLowerCase(),
      deliveryInstruction: deliveryInstruction.trim().toLowerCase(),
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
    const { page = 1, limit = 10 } = getUserAddressesQueryDto;

    const offset: number = (page - 1) * limit;

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
    user: User,
    address: Address,
    updateUserAddressDto: UpdateUserAddressDto
  ): Promise<Address> {
    const { name, sideStreet, deliveryInstruction } = updateUserAddressDto;

    const newUserAddress: Address = this.addressService.create({
      id: address.id,
      name: name ? name.trim().toLowerCase() : address.name,
      sideStreet: sideStreet
        ? sideStreet.trim().toLowerCase()
        : address.sideStreet,
      deliveryInstruction: deliveryInstruction
        ? deliveryInstruction.trim().toLowerCase()
        : address.deliveryInstruction,
      user: this.userService.create({
        id: user.id,
      }),
    });

    return this.addressService.save(newUserAddress);
  }

  deleteUserAddress(address: Address): Promise<Address> {
    return this.addressService.remove(address);
  }
}

export default new UserAddressService();
