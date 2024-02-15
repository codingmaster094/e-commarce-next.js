import mongoose from "mongoose"
mongoose.connect("mongodb+srv://Headbase:Headbase@cluster0.oszr5as.mongodb.net/node-next?retryWrites=true&w=majority").then(()=>{
    console.log("DateBase Connected !")
}).catch(err =>{
    console.log(err)
})

// ======  Counr Collection  =====

// import mongoose from 'mongoose';
// const db = mongoose
//   .connect(
//     'mongodb+srv://Headbase:Headbase@cluster0.oszr5as.mongodb.net/node-next?retryWrites=true&w=majority',
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(async () => {
//     console.log('Database Connected!');

//     // Access the MongoDB databasex
//     const mongoDB = mongoose.connection.db;

//     // Use the aggregate pipeline to get document count for each collection
//     const collections = await mongoDB.listCollections().toArray();
//     const countPromises = collections.map(async (collection) => {
//       const count = await mongoDB.collection(collection.name).countDocuments({});
//       return { collection: collection.name, count };
//     });

//     const documentCounts = await Promise.all(countPromises);

//     // Output the results
//     documentCounts.forEach(({ collection, count }) => {
//       console.log(`Collection: ${collection}, Document Count: ${count}`);
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });


// ======  Remove Field =====
// import { MongoClient } from 'mongodb';

// const uri = 'mongodb+srv://Headbase:Headbase@cluster0.oszr5as.mongodb.net/node-next?retryWrites=true&w=majority';
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// async function removeRecords() {
//   try {
//     await client.connect();

//     const database = client.db('node-next');
//     const collection = database.collection('products');

//     const categoryIdToRemove = '658584bb29fd0925ff549508';

//     const find = await collection.deleteMany({ category: new mongoose.Types.ObjectId(categoryIdToRemove) });

//     console.log('find', find)
//     const result = await collection.deleteMany({ category: categoryIdToRemove });

//     console.log(`Deleted ${result.deletedCount} document(s) with category ID ${categoryIdToRemove}`);
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     await client.close();
//   }
// }

// removeRecords();


// ======  insert New Field =====
// import product from "../model/product.js";
// mongoose
//     .connect('mongodb+srv://Headbase:Headbase@cluster0.oszr5as.mongodb.net/node-next?retryWrites=true&w=majority', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(async () => {
//         console.log('Database Connected!');

//         // Add the new field to all documents in the collection
//         await product.updateMany({}, { $set: { like: false } });

//         // Close the MongoDB connection (optional)
//         mongoose.connection.close();
//     })
//     .catch((error) => {
//         console.error('Error connecting to the database:', error);
//     });
