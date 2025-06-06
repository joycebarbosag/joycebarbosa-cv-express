const getPersonModel = (sequelize, { DataTypes }) => {
  const Person = sequelize.define("person", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentJob: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desiredJob: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    hooks: {
      beforeValidate: (person) => {
        if (!person.desiredJob) {
          person.desiredJob = person.currentJob;
        }
      }
    }
  });

  Person.associate = (models) => {
    Person.hasOne(models.Contact, {
      foreignKey: "personId",
      onDelete: "CASCADE",
    });

    Person.hasOne(models.Address, {
      foreignKey: "personId",
      onDelete: "CASCADE",
    });

    // Método colocado aqui para ter acesso aos models corretamente
    Person.updatePerson = async function (id, data) {
      const person = await this.findByPk(id);
      if (!person) return null;

      await person.update(data);

      const { contact, address } = data;

      if (contact) {
        const existingContact = await models.Contact.findOne({ where: { personId: id } });
        if (existingContact) {
          await existingContact.update(contact);
        } else {
          await models.Contact.create({ ...contact, personId: id });
        }
      }

      if (address) {
        const existingAddress = await models.Address.findOne({ where: { personId: id } });
        if (existingAddress) {
          await existingAddress.update(address);
        } else {
          await models.Address.create({ ...address, personId: id });
        }
      }

      return await this.findById(id); // com include de contact e address
    };
  };

  Person.findById = async function (id) {
    return await this.findByPk(id, {
      include: [this.associations.contact, this.associations.address],
    });
  };

  Person.findAllPersons = async function () {
    return await this.findAll({
      include: [this.associations.contact, this.associations.address],
    });
  };

  Person.createPerson = async function (data) {
    return await this.create(data, {
      include: [this.associations.contact, this.associations.address],
    });
  };

  Person.deleteById = async function (id) {
    const person = await this.findByPk(id);
    if (!person) return null;
    await person.destroy();
    return person;
  };

  return Person;
};

module.exports = getPersonModel;