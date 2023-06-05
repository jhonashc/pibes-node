import { setSeederFactory } from "typeorm-extension";

import { Person, User, UserRole } from "../../entities";

export default setSeederFactory(User, (faker) => {
  const person = new Person();
  person.firstName = faker.person.firstName().toLowerCase();
  person.lastName = faker.person.lastName().toLowerCase();
  person.telephone = faker.phone.number("+593 ## ### ####");

  const user = new User();

  /* Assigning the person reference to the user */
  user.person = person;

  user.username = faker.internet
    .userName({ firstName: person.firstName })
    .toLowerCase();

  user.email = faker.internet
    .email({ firstName: person.firstName })
    .toLowerCase();

  user.password = "password";
  user.avatarUrl = faker.internet.avatar();
  user.roles = [UserRole.USER];
  user.isActive = true;

  return user;
});
