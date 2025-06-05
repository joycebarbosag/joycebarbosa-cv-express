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

    Address.updateStreet = async function (id, newStreet) {
        const address = await this.findByPk(id);
        if (!address) return null;
        address.street = newStreet;
        await address.save();
        return address;
    }

    Address.updateHouseNumber = async function (id, newHouseNumber) {
        const address = await this.findByPk(id);
        if (!address) return null;
        address.houseNumber = newHouseNumber;
        await address.save();
        return address;
    }

    Address.updateCity = async function (id, newCity) {
        const address = await this.findByPk(id);
        if (!address) return null;
        address.city = newCity;
        await address.save();
        return address;
    }

    Address.updateState = async function (id, newState) {
        const address = await this.findByPk(id);
        if (!address) return null;
        address.state = newState;
        await address.save();
        return address;
    }

    Address.updateCountry = async function (id, newCountry) {
        const address = await this.findByPk(id);
        if (!address) return null;
        address.country = newCountry;
        await address.save();
        return address;
    }

    return Address;
}

module.exports = getAddressModel;