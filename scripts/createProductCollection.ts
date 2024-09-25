import { client } from '../src/utils/typesenseClient';

interface SchemaField {
  name: string;
  type: 'string' | 'int32' | 'float' | 'bool' | 'string[]';
  [key: string]: any;  // Allow extra properties like `facet`
}

async function createProductCollection() {
  const schema = {
    name: 'products',
    fields: [
      { name: 'id', type: 'string' },                 // Product ID as string
      { name: 'name', type: 'string' },               // Name as string
      { name: 'description', type: 'string' },        // Description as string
      { name: 'price', type: 'float' },               // Price as float
      { name: 'in_stock', type: 'bool' },             // Stock status as boolean
      { name: 'tags', type: 'string[]', facet: true },// Tags as an array of strings, facet-enabled
      { name: 'rating', type: 'float' ,optional: true},
      { name: 'thumbnail', type: 'string', optional: true } // Rating as float
    ] as SchemaField[],
    default_sorting_field: 'price'                    // Add the default sorting field
  };

  try {
    const result = await client.collections().create(schema);
    console.log('Collection created:', result);
  } catch (error) {
    console.error('Error creating collection:', error);
  }
}

createProductCollection();
