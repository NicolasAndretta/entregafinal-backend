//src/controllers/mocks.controller.js
import { generateMockProducts } from '../services/mocks.service.js';

export const getMockProducts = (req, res) => {
  try {
    const { qty } = req.query;
    const quantity = qty ? parseInt(qty) : 10;

    const products = generateMockProducts(quantity);

    res.json({
      status: 'success',
      quantity: products.length,
      payload: products,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
