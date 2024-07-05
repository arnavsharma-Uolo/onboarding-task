import { ELASTICSEARCH_URI } from '../constants';

const { Client } = require('@elastic/elasticsearch');
export const client = new Client({
  node: ELASTICSEARCH_URI,
});

export const createIndex = async (index: string, mappings: object, settings: object) => {
  try {
    const { body } = await client.indices.create({
      index: index,
      body: {
        mappings: mappings,
        settings: settings,
      },
    });
    console.log(body);
  } catch (error) {
    console.error('Error creating index:', error);
  }
};

export const deleteIndex = async (index: string) => {
  try {
    const { body } = await client.indices.delete({
      index: index,
    });
    console.log('Index deleted:', body);
  } catch (error) {
    console.error('Error deleting index:', error);
  }
};

export const addDocument = async (index: string, doc: any, id: string) => {
  try {
    const { body } = await client.index({
      index: index,
      id: id,
      body: doc,
    });
    console.log('User added:', body);
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export const updateDocument = async (index: string, id: string, updatedDoc: any) => {
  try {
    const { body } = await client.update({
      index: index,
      id: id,
      body: {
        doc: updatedDoc,
      },
    });
    console.log('User updated:', body);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const searchDocument = async (index: string, query: any) => {
  try {
    const { body } = await client.search({
      index: index,
      body: {
        query: query,
      },
    });
    console.log('Search results:', body.hits.hits);
  } catch (error) {
    console.error('Error searching user:', error);
  }
};

// searchDocument('test_user10', {
//   bool: {
//     should: [{ match: { name: 'Test' } }, { match: { email: 'aay' } }],
//     minimum_should_match: 1,
//     filter: [{ bool: { must_not: { exists: { field: 'deleted_at' } } } }],
//   },
// });

// addDocument('test_user10', { name: 'Arnav Sharma', email: 'arnav.sharma@uolo.com', deleted_at: null }, '0001');
// addDocument('test_user10', { name: 'Aayush Sharma', email: 'aayusharma@google.com', deleted_at: null }, '0002');
// addDocument('test_user10', { name: 'Rohan Dubey', email: 'dubey@gmail.com', deleted_at: null }, '0003');
// addDocument('test_user10', { name: 'Jaspreet Singh', email: 'jaspreet@uolo.com', deleted_at: null }, '0004');

// updateDocument('test_user10', '0002', { name: 'Test User 2 Updated', email: 'user2@test.com', deleted_at: null });

// const settings = {
//   analysis: {
//     tokenizer: {
//       ngram_tokenizer: {
//         type: 'ngram',
//         min_gram: 3,
//         max_gram: 3,
//         token_chars: ['letter', 'digit'],
//       },
//     },
//     analyzer: {
//       ngram_analyzer: {
//         type: 'custom',
//         tokenizer: 'ngram_tokenizer',
//         filter: ['lowercase'],
//       },
//     },
//   },
//   number_of_shards: 1,
//   number_of_replicas: 1,
// };

// const mappings = {
//   properties: {
//     id: { type: 'keyword' },
//     name: {
//       type: 'text',
//       analyzer: 'ngram_analyzer',
//     },
//     email: {
//       type: 'text',
//       analyzer: 'ngram_analyzer',
//     },
//     deleted_at: { type: 'date' },
//   },
// };

// createIndex('test_user10', mappings, settings);

// deleteIndex('test_user10');

// checkIndexExists('test_user10');
