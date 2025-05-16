const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users');
const direwolves = require('./data/direwolves');
const User = require('./models/userModel');
const Direwolf = require('./models/direwolfModel');
const Order = require('./models/orderModel');

// Load env vars
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

// Import data into DB
const importData = async () => {
  try {
    // Clear all existing data
    await Order.deleteMany();
    await Direwolf.deleteMany();
    await User.deleteMany();

    // Insert users
    const createdUsers = await User.insertMany(users);

    // Get admin user id
    const adminUser = createdUsers[0]._id;

    // Add admin user to all direwolves
    const sampleDirewolves = direwolves.map((direwolf) => {
      return { ...direwolf, user: adminUser };
    });

    // Insert direwolves
    await Direwolf.insertMany(sampleDirewolves);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Delete all data from DB
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Direwolf.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Run the appropriate function based on command line argument
connectDB().then(() => {
  if (process.argv[2] === '-d') {
    destroyData();
  } else {
    importData();
  }
});
