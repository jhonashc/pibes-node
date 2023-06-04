import { setSeederFactory } from "typeorm-extension";

import { Person, Roles, User } from "../../entities";

export default setSeederFactory(User, (faker) => {
  const person = new Person();
  person.firstName = faker.person.firstName();
  person.lastName = faker.person.lastName();
  person.telephone = faker.phone.number("+593 ## ### ####");

  const user = new User();

  /* Assigning the person reference to the user */
  user.person = person;

  user.username = faker.internet.userName({ firstName: person.firstName });
  user.email = faker.internet.email({ firstName: person.firstName });
  user.password = "password";
  user.avatarUrl = faker.internet.avatar();
  user.roles = [Roles.USER];
  user.isActive = faker.datatype.boolean();

  return user;
});
