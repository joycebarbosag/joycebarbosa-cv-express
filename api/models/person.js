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

    return Person;
};

module.exports = getPersonModel;