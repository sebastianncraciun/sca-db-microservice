const express = require('express')

const { postTask, postHabit, postGoal, getHabits, deleteHabit } = require('../controllers/db-controller')

const router = express.Router()

router.post('/postTask', postTask)
router.post('/postHabit', postHabit)
router.post('/postGoal', postGoal)
router.post('/getHabits',getHabits)
router.post('/deleteHabit',deleteHabit)

module.exports = {
    routes: router
}