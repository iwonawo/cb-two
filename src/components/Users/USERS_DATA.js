//initial dummy data created with Faker library

import { faker } from '@faker-js/faker'

const USERS_DATA = []

function createRandomUser() {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    avatar: faker.image.avatar()
  }
}

Array.from({ length: 10 }).forEach(() => {
  USERS_DATA.push(createRandomUser())
})

export default USERS_DATA
