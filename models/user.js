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
