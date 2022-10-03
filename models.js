const path = require('path')

import Sequelize from "rn-sequelize";
const Op = Sequelize.Op;
const Model = Sequelize.Model

const sequelize = new Sequelize({
    dialectModule: SQLite,
    database: "mydb",
    dialectOptions: {
      version: "1.0",
      description: "Test DB"
    }
  });


class Category extends Model {}

class Question extends Model {}

class Answer extends Model {}


Category.init({
    name: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
});


Question.init({
    text: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
});

Answer.init({
    text: DataTypes.STRING,
    isCorrect: DataTypes.BOOLEAN,
}, {
    sequelize,
    timestamps: false,
});

Category.hasMany(Question)
Question.belongsTo(Category)

Question.hasMany(Answer)
Answer.belongsTo(Question)

module.exports = {Category, Question, Answer, sequelize}