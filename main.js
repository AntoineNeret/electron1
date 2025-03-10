//Processus principal

const {app, BrowserWindow} = require("electron")

//Créer la fenêtre principale

function createWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, //Acces aux API Node depuis le processus de rendu
            contextIsolation: false,
        }
    })
    window.loadFile('src/pages/index.html')
}

//Attendre l'initialisation de l'application
app.whenReady().then( () => {
    console.log("application initialisée")
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
}
)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})