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

    Contact.associate = (models) => {
        Contact.belongsTo(models.Person);
    };

    Contact.findById = async function (id) {
        return await this.findByPk(id);
    };

    Contact.findAllContacts = async function () {
        return await this.findAll(); // Sem include
    };

    Contact.updateEmail = async function (id, newEmail) {
        const contact = await this.findByPk(id);
        if (!contact) return null;
        contact.email = newEmail;
        await contact.save();
        return contact;
    }

    Contact.updatePhone = async function (id, newPhone) {
        const contact = await this.findByPk(id);
        if (!contact) return null;
        contact.phone = newPhone;
        await contact.save();
        return contact;
    }

    return Contact;
}

module.exports = getContactModel;