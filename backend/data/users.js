const bcrypt = require("bcryptjs");

const users = [
  {
    name: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "tech123",
    email: "Tech@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "tech",
    email: "tech@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];
module.exports = users;
