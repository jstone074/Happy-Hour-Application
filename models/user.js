const bcrypt = require("bcrypt");

const user = (sequelize, DataTypes) => {
  // User table
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [7, 42]
      }
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [10, 14]
      }
    },
    isBusiness: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  // Before user is made, generate a password hash so this is stored in the db
  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  // Function to hash the password 10 rounds
  // Each round improves security but takes longer; 10-12 is standard
  User.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  // bcrypt's compare allows us to check the user's login password to the stored val
  // We'll use this after findByLogin and before we send back a token
  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  // We'll use this function when the user tries to log in
  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { username: login }
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login }
      });
    }

    return user;
  };

  return User;
};

module.exports = user;
