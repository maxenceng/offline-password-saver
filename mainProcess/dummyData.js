/*jshint esversion: 6 */

/**
 * Fill the JSON file with dummy data
 */

const fs = require('fs')
const filePath = __dirname + '/../store/pass.json'
const encryption = require('./encryption')


const data = {
    password: {
        facebook: encryption.encrypt('1'),
        twitter: encryption.encrypt('2'),
        github: encryption.encrypt('3'),
        test1: encryption.encrypt('4'),
        test2: encryption.encrypt('4'),
        test3: encryption.encrypt('4'),
        test4: encryption.encrypt('4'),
        test5: encryption.encrypt('4'),
        test7: encryption.encrypt('4'),
        test8: encryption.encrypt('4'),
        test9: encryption.encrypt('4'),
        test10: encryption.encrypt('4'),
        test12: encryption.encrypt('4'),
        test13: encryption.encrypt('4'),
        test14: encryption.encrypt('4'),
        test15: encryption.encrypt('4'),
        test16: encryption.encrypt('4'),
        test17: encryption.encrypt('4'),
        test18: encryption.encrypt('4'),
        test19: encryption.encrypt('4'),
        test20: encryption.encrypt('4')

    },
    show: {
        facebook: false,
        twitter: false,
        github: false,
        test1: false,
        test2: false,
        test3: false,
        test4: false,
        test5: false,
        test6: false,
        test7: false,
        test8: false,
        test9: false,
        test10: false,
        test11: false,
        test12: false,
        test13: false,
        test14: false,
        test15: false,
        test16: false,
        test17: false,
        test18: false,
        test19: false,
        test20: false
    }
}

const send = JSON.stringify(data, null, "\t")

fs.writeFileSync(filePath, send)
