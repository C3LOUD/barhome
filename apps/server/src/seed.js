const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user');

const seed = async () => {
  await mongoose.connect(process.env.MONGODB);
  const password = await bcrypt.hash('Test1234', 12);
  const user = new User({
    email: 'test@email.com',
    password,
    name: 'test',
  });
  await user.save();
};

seed()
  .then(() => {
    mongoose.connection.close();
    console.log('success');
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
