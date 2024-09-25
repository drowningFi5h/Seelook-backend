import { client } from '../src/utils/typesenseClient';

async function deleteProductCollection() {
  try {
    const result = await client.collections('products').delete();
    console.log('Collection deleted:', result);
  } catch (error) {
    console.error('Error deleting collection:', error);
  }
}

deleteProductCollection();
