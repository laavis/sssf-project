const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

export const connectDB = async () => {
  try {
    await mongoose.set('bufferCommands', false);
    // @todo: add timeout? for debugging??
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};
