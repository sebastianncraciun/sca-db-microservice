const express = require('express')

const { postTask, postHabit, postGoal } = require('../controllers/db-controller')

const router = express.Router()

router.post('/postTask', postTask)
router.post('/postHabit', postHabit)
router.post('/postGoal', postGoal)

module.exports = {
    routes: router
}