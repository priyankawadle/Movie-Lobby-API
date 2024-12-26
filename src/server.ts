import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();
console.log(process.env.NODE_ENV)
const PORT = process.env.PORT || 3000;
let MONGODB_URI;
if(process.env.NODE_ENV === 'development'){
  MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/movie-lobby-api';
}else{
  MONGODB_URI = process.env.MONGODB_URI_TEST || 'mongodb://127.0.0.1:27017/movie-lobby-api-test';
}


mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
