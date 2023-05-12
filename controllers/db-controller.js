'use strict';
const { scaDb } = require('../db')

const postTask = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({ "failed": "body is missing" })
        } else {
            if (req.body.userId == null || req.body.userId === "" || req.body.task == null || req.body.task === "") {
                res.status(400).json({ "failed": 'malformed request' })
            }
            else {
                const doc = await scaDb.doc(req.body.userId).get()
                if (doc.exists) {
                    const currentHabits = doc.data().habits || [];
                    const updatedHabits = [...currentHabits, req.body.habit];
                    await scaDb.doc(req.body.userId).update({ "habits": updatedHabits })
                } else {
                    console.log("no")
                }
            }
            res.status(200).json({ message: req.body.habit })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'server error' })
    }
}

const postHabit = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({ "failed": "body is missing" })
        } else {
            if (req.body.userId == null || req.body.userId === "" || req.body.habit == null || req.body.habit === "") {
                res.status(400).json({ "failed": 'malformed request' })
            }
            else {
                const doc = await scaDb.doc(req.body.userId).get()
                if (doc.exists) {
                    const currentHabits = doc.data().habits || [];
                    const updatedHabits = [...currentHabits, req.body.habit];
                    await scaDb.doc(req.body.userId).update({ "habits": updatedHabits })
                    res.status(200).json({ message: req.body.habit })
                } else {
                    scaDb.doc(req.body.userId).set({"habits": [req.body.habit]})
                    res.status(200).json({ message: req.body.habit })
                }
            }
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'server error' })
    }
}

const getHabits = async (req, res, next) => {
    try {
        console.log(req.body)
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({ "failed": "body is missing" })
        } else {
            if (req.body.userId == null || req.body.userId === "") {
                res.status(400).json({ "failed": 'malformed request' })
            }
            else {
                const doc = await scaDb.doc(req.body.userId).get()
                if (doc.exists) {
                    const currentHabits = doc.data().habits || [];
                    res.status(200).json(currentHabits.map(habit => {
                        return { habit };
                      }) )
                } else {
                    //TODO: add user
                    res.status(200).json([])
                }
            }
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'server error' })
    }
}

const deleteHabit = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({ message: "body is missing" })
        }
        else {
            if (req.body.userId == null || req.body.userId === "" || req.body.habitIndex == null || req.body.habitIndex === "") {
                res.status(400).json({ message: 'malformed request' })
            } else {
                const doc = await scaDb.doc(req.body.userId).get()
                if (doc.exists) {
                    const currentHabits = doc.data().habits || [];
                    const habitIndex = parseInt(req.body.habitIndex);
                    if (isNaN(habitIndex) || habitIndex < 0 || habitIndex >= currentHabits.length) {
                        res.status(400).json({ message: 'invalid habit index' });
                    } else {
                        currentHabits.splice(habitIndex, 1);
                        await scaDb.doc(req.body.userId).update({ "habits": currentHabits })
                        res.status(200).json({ message: `habit at index ${habitIndex} deleted` })
                    }
                } else {
                    res.status(404).json({ message: 'user not found' })
                }
            }
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'server error' })
    }
}

const postGoal = async (req, res, next) => {
    res.send({ "message": "test" });
}

module.exports = {
    postTask,
    postHabit,
    getHabits,
    deleteHabit,
    postGoal
}