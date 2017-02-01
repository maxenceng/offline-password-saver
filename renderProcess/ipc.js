/*jshint esversion: 6 */

const ipc = require('electron').ipcRenderer

addPass()
deletePass()
generatePass()

/**
 * Add a password to the JSON file
 */

function addPass() {

    const addBtn = document.getElementById('add-btn')

    addBtn.addEventListener('click', (event) => {
        let inputApp = document.getElementById('input-app').value
        let inputPass = document.getElementById('input-pass').value
        ipc.send('add-pass', inputApp, inputPass)
    })
}

/**
 * Delete a password in the JSON file
 */

function deletePass() {

    const deleteBtn = document.getElementById('delete-btn')
    deleteBtn.addEventListener('click', (event) => {
        const selectVal = document.getElementById('delete-select').value.split("string:")[1]
        ipc.send('delete-pass', selectVal)
    })
}

/**
 * Generate a password with Randomstring in the main process
 */

function generatePass() {
    const generateBtn = document.getElementById('gen-btn')
    generateBtn.addEventListener('click', (event) => {
        ipc.send('generate-pass')
    })
    ipc.on('gen-reply', (event, genPass) => {
        document.getElementById('gen-pass').innerHTML = genPass
    })
}