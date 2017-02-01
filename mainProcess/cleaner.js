/*jshint esversion: 6 */

/**
 * Empty the JSON file
 */

const fs = require('fs')
const filePath = __dirname + '/../store/pass.json'
const encryption = require('./encryption')


const data = {
    password: {
    },
    show: {
    }
}

const send = JSON.stringify(data, null, "\t")

fs.writeFileSync(filePath, send)