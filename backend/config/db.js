const mongoose = require('mongoose');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const uri =  process.env.NODE_ENV === 'production' ? `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}?retryWrites=true&w=majority` :
`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

  } catch (err) {
    console.log(err);
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

// Connect Database
connectDB();

// Event listeners for error after initialization
const mongoConnection = mongoose.connection;
mongoConnection.on('error', err => {
  console.log(`There was an error connecting to the database: ${err}`);
})
mongoConnection.once('open', ()=> {
  console.log(`You have successfully connected to your mongodatabase: ${uri}`);
})

