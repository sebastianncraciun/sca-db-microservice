'use strict';
const { initializeApp, cert } = require('firebase-admin/app')
const serviceAccount = require('./key.json')
initializeApp({
    credential: cert(serviceAccount)
})

const { getFirestore } = require('firebase-admin/firestore');

const habits = getFirestore().collection('Habits');
const tasks = getFirestore().collection('Tasks');
const goals = getFirestore().collection('Goals');

module.exports = {
    habits,
    tasks,
    goals
} 