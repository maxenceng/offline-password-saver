/*jshint esversion: 6 */

const { app, BrowserWindow } = require('electron')
const ipc = require('electron').ipcMain
const url = require('url')
let win

const JSONops = require('./mainProcess/JSONops')
const encryption = require('./mainProcess/encryption')
const fs = require('fs')
const randomstring = require('randomstring')

/**
 * TODO: - ADD A COPY TO CLIBOARD BUTTON TO THE GENERATE PASS
 *
 **/

// Create the JSON file first if it does not exist
if(!fs.existsSync(__dirname + '/store/pass.json')) {
    JSONops.create()
}


app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

// Add a password corresponding to the app name
ipc.on('add-pass', (event, app, pass) => {
    const check = JSONops.read(app)
    if(check !== undefined || app === '' || pass === '') {
        return
    } else {
        const passEncrypted = encryption.encrypt(pass)
        JSONops.append(app, passEncrypted)
    }
})

// Delete the password corresponding to the app name
ipc.on('delete-pass', (event, app) => {
    const check = JSONops.read(app)
    if(check === undefined || app === '') {
        return
    } else {
        JSONops.del(app)
    }
})

// Generates a 10 characters long password
ipc.on('generate-pass', (event) => {
    const genPass = randomstring.generate(10)
    event.sender.send('gen-reply', genPass)
})

/**
 * Create our window for the application
 */
function createWindow() {
    // Our window's parameters
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        resizable: true,
        minWidth: 480,
        minHeight: 400,
        backgroundColor: '#333333',
        frame: false // Removes the classic frame
    })

    // Loads our html file for the window
    win.loadURL(url.format({
        pathname: __dirname + '/views.min/index.html',
        protocol: 'file:',
        slashes: true
    }))

    // Open Chrome Dev Tools by default
    //win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}