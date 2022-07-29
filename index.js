require('dotenv').config()
const mongoose = require('mongoose')

let url_suffix = "?retryWrites=true&w=majority"
mongoose.connect(process.env.mongodb_url.concat('testv2') + url_suffix);
const { Schema } = mongoose;


const article = mongoose.model('article', new Schema({ name: String, title: String }));

article.bulkWrite([
    {
      insertOne: {
        document: {
          name: 'Eddard Stark',
          title: 'Warden of the North'
        }
      }
    },
    {
      updateOne: {
        filter: { name: 'Eddard Stark' },
        // If you were using the MongoDB driver directly, you'd need to do
        // `update: { $set: { title: ... } }` but mongoose adds $set for
        // you.
        update: { title: 'Hand of the King' }
      }
    },
    {
      deleteOne: {
        filter: { name: 'Eddard Stark' }
      }
    }
  ]).then(res => {
   // Prints "1 1 1"
   console.log(res.insertedCount, res.modifiedCount, res.deletedCount);
  });
  