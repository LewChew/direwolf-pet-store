const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Jon Snow',
    email: 'jon@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Arya Stark',
    email: 'arya@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

module.exports = users;
