import axios from 'axios';
import { client } from '../src/utils/typesenseClient';

interface Product {
  thumbnail?: string;
  id: string;
  title: string;
  description: string;
  variants: { prices: { amount: number }[] }[];
  tags: { value: string }[];
  inventory_quantity: number;
  // Add this field to get inventory count
}

async function fetchAndIndexProducts() {
  try {
    const response = await axios.get('http://localhost:9000/store/products', {
      headers: { Authorization: `pk_01J8JN8EY49NPAAKVKFTKQ9AWT` },
    });

    const products: Product[] = response.data.products;

    const productsForIndexing = products.map(product => ({
      id: product.id,
      name: product.title,
      description: product.description,
      price: product.variants[0].prices[0].amount / 100,
      tags: product.tags.map(tag => tag.value),
      in_stock: product.inventory_quantity > 0, // Determine if the product is in stock
      rating: 0,
      thumbnail: product.thumbnail || null,
    }));

    await client.collections('products').documents().import(productsForIndexing);
    console.log('Products indexed successfully');
  } catch (error) {
    console.error('Error indexing products:', error);
  }
}

fetchAndIndexProducts();
