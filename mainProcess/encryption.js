/*jshint esversion: 6 */

const CryptoJS = require('crypto-js')

const pass = 'This is not the real pass'

/**
 *  Encrypt and decrypt functions for the JSON file
 */

function encrypt(text) {
    const cipher = CryptoJS.AES.encrypt(text, pass)
    return cipher.toString()
}

function decrypt(text) {
    const decipherBytes = CryptoJS.AES.decrypt(text, pass)
    const decipher = decipherBytes.toString(CryptoJS.enc.Utf8)
    return decipher
}

module.exports = { encrypt, decrypt }