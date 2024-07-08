import { ELASTICSEARCH_URI } from '../../constants';

const { Client } = require('@elastic/elasticsearch');
export const client = new Client({
  node: ELASTICSEARCH_URI,
});

export const checkIndexExists = async (index: string) => {
  try {
    const { body } = await client.indices.exists({ index });
    return body;
  } catch (error) {
    console.error('Error checking index existence:', error);
    return false;
  }
};

export const createIndex = async (index: string, mappings: object, settings: object) => {
  try {
    await client.indices.create({
      index: index,
      body: {
        mappings: mappings,
        settings: settings,
      },
    });
  } catch (error) {
    console.error('Error creating index:', error);
  }
};

export const deleteIndex = async (index: string) => {
  try {
    await client.indices.delete({
      index: index,
    });
  } catch (error) {
    console.error('Error deleting index:', error);
  }
};

export const addDocument = async (index: string, doc: any, id: string | undefined) => {
  try {
    await client.index({
      index: index,
      id: id,
      body: doc,
    });
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export const updateDocument = async (index: string, id: string, updatedDoc: any) => {
  try {
    await client.update({
      index: index,
      id: id,
      body: {
        doc: updatedDoc,
      },
    });
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const searchDocument = async (index: string, query: any, form: number, size: number) => {
  try {
    const { body } = await client.search({
      index: index,
      body: {
        query: query,
        from: form,
        size: size,
        track_total_hits: true,
      },
    });

    return { total_count: body.hits.total.value, document_list: body.hits.hits };
  } catch (error) {
    console.error('Error searching user:', error);
    return { total_count: 0, document_list: [], error: error };
  }
};

export const bulkAddDocuments = async (index: string, documents: any[]) => {
  try {
    const { body } = await client.bulk({
      index: index,
      body: documents,
    });
    console.log('Bulk operation completed:', body);
  } catch (error) {
    console.error('Error adding documents in bulk:', error);
  }
};
