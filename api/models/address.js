const getAddressModel = (sequelize, { DataTypes }) => {
    const Address = sequelize.define("address", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        houseNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(2),
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Address;
}

module.exports = getAddressModel;