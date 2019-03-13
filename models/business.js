module.exports = function (sequelize, DataTypes){
    var Business = sequelize.define("Business", {
        business_name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [1]
            }
        },
        business_phone:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[1]
            }
        },
        business_address:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[1]
            }
        }
    })

    Business.associate = function(models){


    Business.belongsTo(models.User, {
        foreignKey:{
            allowNull:false
        }
        
    });

    Business.belongsTo(models.Hour,{
        foreignKey:{
            allowNull:false
        }
    });
    
};

return Business;

};