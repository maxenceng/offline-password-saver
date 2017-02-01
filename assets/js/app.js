/*jshint esversion: 6 */

let app = angular.module('store', [])

app.controller('StoreController', ['$http', '$timeout', function ($http, $timeout) {

    const store = this

    // Decide what to show
    this.passwords = true

    this.showPasswords = function () {
        this.passwords = true
    }

    this.showControls = function () {
        this.passwords = false
    }


    store.dataJSON = {}
    // Load the data from the JSON file and put it in the HTML file
    this.get = function () {
        $http.get('../store/pass.json').then(function (res) {
            store.dataJSON = res.data
            const objectKeys = Object.keys(store.dataJSON.password)
            for(let i = 0; i < objectKeys.length; i++) {
                let decrypted = decipher(store.dataJSON.password[objectKeys[i]])
                store.dataJSON.password[objectKeys[i]] = decrypted
            }
            store.selection = Object.keys(store.dataJSON.password)
        })
    }

    // Call the function to init it
    this.get()



    // Reloads the data 10 ms after new data has been added
    this.reload = function () {
        $timeout(this.get, 10)
    }

    // Function to show the password
    this.show = function (key) {
        store.dataJSON.show[key] = true
    }

    // Function to hide the password
    this.hide = function (key) {
        store.dataJSON.show[key] = false
    }
} ])


// Pass key for the encryption
const pass = 'This is not the real pass'

// Function to decipher the content given by the JSON file
function decipher(arg) {
    let decryptedBytes = CryptoJS.AES.decrypt(arg, pass)
    let decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8)
    return decrypted
}




