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

    return Contact;
}

module.exports = getContactModel;