import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const env = process.env.NODE_ENV;
    let mongoURL;

    if (env === 'production') mongoURL = process.env.MONGO_URL_PROD;
    else if (env === 'staging') mongoURL = process.env.MONGO_URL_STAGING;
    else if (env === 'development') mongoURL = process.env.MONGO_URL_DEV;
    else mongoURL = process.env.MONGO_URL_DEV_LOCAL

    await mongoose.connect(mongoURL);
    console.log(`MongoDB connected (${env})`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export { connectDB }
