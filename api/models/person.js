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

    Person.updateSkills = async function (id, newSkill) {
        const person = await this.findByPk(id);
        if (!person) return null;
        person.skills = newSkill;
        await person.save();
        return person;
    }

    Person.updateCurrentJob = async function (id, newJob) {
        const person = await this.findByPk(id);
        if (!person) return null;
        person.currentJob = newJob;
        await person.save();
        return person;
    }

    Person.updateDesiredJob = async function (id, newDesiredJob) {
        const person = await this.findByPk(id);
        if (!person) return null;
        person.desiredJob = newDesiredJob;
        await person.save();
        return person;
    }

    Person.updateDescription = async function (id, newDescription) {
        const person = await this.findByPk(id);
        if (!person) return null;
        person.description = newDescription;
        await person.save();
        return person;
    }

    Person.deleteById = async function (id) {
        const person = await this.findByPk(id);
        if (!person) return null;
        await person.destroy();
        return person;
    };

    return Person;
};

module.exports = getPersonModel;