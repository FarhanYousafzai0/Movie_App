import { Client, Databases, ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPRITE_COLLECTION_ID;

const clientInstance = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Corrected endpoint
  .setProject(PROJECT_ID);

const database = new Databases(clientInstance); // Initialize the Databases instance

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // Fetch the documents based on the searchTerm
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm),
    ]);

    if (result.documents.length > 0) {
      // Document exists, increment the count
      const doc = result.documents[0];

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });

      console.log(`Updated count for search term: ${searchTerm}`);
    } else {
      // Document does not exist, create a new one
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });

      console.log(`Created new document for search term: ${searchTerm}`);
    }
  } catch (error) {
    console.error('Error updating search count:', error);
  }
};


export const getTrendingMovies = async()=>{


    try{
        const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[

            Query.limit(5),
            Query.orderDesc("count")
        ])

        return result.documents;
    }catch(error){
        console.log(error)
    }
};