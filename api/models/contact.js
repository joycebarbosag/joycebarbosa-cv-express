const getContactModel = (sequelize, { DataTypes }) => {
    const Contact = sequelize.define("contact", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Contact;
}

module.exports = getContactModel;