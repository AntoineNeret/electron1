//Processus principal

const {app, BrowserWindow, ipcMain, Menu} = require("electron")
const path = require("path");

let window


//Créer la fenêtre principale

function createWindow() {
     window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, //Acces aux API Node depuis le processus de rendu
            contextIsolation: true,
            sandbox: true,
            preload: path.join(__dirname, 'src/js/preload.js'),
        }
    })
    //Création du menu
    createMenu()
    window.loadFile('src/pages/index.html')
}

//Fonction permettant de créer un menu personnalisé
function createMenu() {
    //Créer un tableau qui va représenter le menu
    const template = [
        {
            label: 'App',
            submenu: [
                {
                    label: 'Versions',
                    accelerator: 'V',
                    click: () => window.loadFile('src/pages/index.html')
                },
                {
                  type: 'separator'
                },
                {
                    label: 'Quitter',
                    accelerator: process.platform === "darwin" ? 'Cmd+Q' : 'Esc',
                    click: () => app.quit()
                }
            ]
        },
        {
            label: 'Tâches',
            submenu: [
                {
                   label: 'Lister',
                   accelerator: 'L',
                   click: () => window.loadFile('src/pages/liste-taches.html')
                },
                {
                    label: 'Ajouter',
                    accelerator: 'A',
                    click: () => window.loadFile('src/pages/ajoute-taches.html')
                }
            ]

        }
    ]

    //Construire le menu à partir du modèle
    const menu = Menu.buildFromTemplate(template)

    //Définir le menu comme étant le menu de l'application
    Menu.setApplicationMenu(menu)

}

//Attendre l'initialisation de l'application
app.whenReady().then( () => {
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

// Ecouter sur le canal "get-versions"
ipcMain.handle("get-versions", () => {
    //Renvoyer un objet contenant les versions des  outils
    return {
        electron : process.versions.electron,
        node : process.versions.node,
        chromium : process.versions.chrome,
    }
})