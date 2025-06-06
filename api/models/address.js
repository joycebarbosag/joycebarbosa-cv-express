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

    Address.associate = (models) => {
        Address.belongsTo(models.Person);
    };

    Address.findById = async function (id) {
        return await this.findByPk(id);
    };

    Address.findAllAddresses = async function () {
        return await this.findAll(); // Sem include
    };

    return Address;
}

module.exports = getAddressModel;