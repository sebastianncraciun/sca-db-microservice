'use strict';
//const { defaultCommands, dynamicCommands } = require('../db')

const postTask = async (req, res, next) => 
{
    res.send({"message": "test"});
}

const postHabit = async (req, res, next) => 
{
    res.send({"message": "test"});
}

const postGoal = async (req, res, next) => 
{
    res.send({"message": "test"});
}

module.exports = {
    postTask,
    postHabit,
    postGoal
}