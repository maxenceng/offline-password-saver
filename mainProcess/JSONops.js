/*jshint esversion: 6 */

const fs = require('fs')
const path = __dirname + '/../store/pass.json'


/**
 *  Functions to use when modifying informations in the JSON file
 */

function create() {
    let send = { password: {}, show: {} }
    send = JSON.stringify(send, null, "\t")
    fs.writeFileSync(path, send)
}

function append(app, data) {
    const fileJSON = fs.readFileSync(path, 'utf-8')
    const fileParsed = JSON.parse(fileJSON)
    fileParsed.password[app] = data
    fileParsed.show[app] = false
    const send = JSON.stringify(fileParsed, null, "\t")
    fs.writeFileSync(path, send)
}

function read(app) {
    const fileJSON = fs.readFileSync(path, 'utf-8')
    const fileParsed = JSON.parse(fileJSON)
    return fileParsed.password[app]
}

function del(app) {
    const fileJSON = fs.readFileSync(path, 'utf-8')
    let fileParsed = JSON.parse(fileJSON)
    delete fileParsed.password[app]
    delete fileParsed.show[app]
    const send = JSON.stringify(fileParsed, null, "\t")
    fs.writeFileSync(path, send)
}

module.exports = { create, append, read, del }