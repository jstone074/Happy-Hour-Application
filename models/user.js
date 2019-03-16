var bcrypt = require("bcrypt-nodejs");
module.exports = function(sequelize, DataTypes) {
  // User table
  const User = sequelize.define("User", {
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
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  // We'll use this function when the user tries to log in
  // User.findByLogin = async login => {
  //   let user = await User.findOne({
  //     where: { username: login }
  //   });

  //   if (!user) {
  //     user = await User.findOne({
  //       where: { email: login }
  //     });
  //   }

  //   return user;
  // };

  return User;
};
