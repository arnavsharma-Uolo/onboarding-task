import { User } from '../../models/user.model';
import { bulkAddDocuments, checkIndexExists, createIndex } from './elasticsearch.service';
import { ELASTICSEARCH_USER_INDEX } from '../../constants';

const settings = {
  analysis: {
    filter: {
      autocomplete_filter: {
        type: 'edge_ngram',
        min_gram: 1,
        max_gram: 20,
      },
    },
    tokenizer: {
      autocomplete_tokenizer: {
        type: 'edge_ngram',
        min_gram: 1,
        max_gram: 20,
        token_chars: ['letter', 'digit'],
      },
    },
    analyzer: {
      autocomplete: {
        type: 'custom',
        tokenizer: 'autocomplete_tokenizer',
        filter: ['lowercase', 'autocomplete_filter'],
      },
      keyword_lowercase: {
        type: 'custom',
        tokenizer: 'keyword',
        filter: ['lowercase'],
      },
    },
  },
  number_of_shards: 1,
  number_of_replicas: 1,
};

const mappings = {
  properties: {
    id: { type: 'keyword' },
    name: {
      type: 'text',
      analyzer: 'autocomplete',
      search_analyzer: 'keyword_lowercase',
    },
    email: {
      type: 'text',
      analyzer: 'autocomplete',
      search_analyzer: 'keyword_lowercase',
    },
    deleted_at: { type: 'date' },
  },
};

const syncDatabase = async (index: string) => {
  try {
    const users = await User.find();
    const body = users.flatMap((user) => [
      { index: { _index: index, _id: user._id.toString() } },
      { id: user._id, name: user.name, email: user.email, image: user.image, deleted_at: user.deleted_at },
    ]);

    await bulkAddDocuments(index, body);
  } catch (error) {
    console.error('Error adding users in bulk:', error);
  }
};

export const setupIndex = async () => {
  if (!(await checkIndexExists(ELASTICSEARCH_USER_INDEX))) {
    await createIndex(ELASTICSEARCH_USER_INDEX, mappings, settings);
    await syncDatabase(ELASTICSEARCH_USER_INDEX);
    console.log('Index created and synced with database');
  } else {
    console.log('Index already exists');
  }
};
