//src/services/mocks.service.js
import { faker } from '@faker-js/faker';

export const generateMockProducts = (quantity = 10) => {
  const products = [];

  for (let i = 0; i < quantity; i++) {
    products.push({
      _id: faker.database.mongodbObjectId(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      stock: faker.number.int({ min: 0, max: 100 }),
      category: faker.commerce.department(),
      thumbnail: faker.image.url(),
    });
  }

  return products;
};
