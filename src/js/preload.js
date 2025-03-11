//Ce script sera exécuté avant le chargement de la page
//Ce script a un accès aux API Node et Electron

const {contextBridge} = require('electron');

contextBridge.exposeInMainWorld('versions',{
    electron : process.versions.electron,
    node : process.versions.node,
    chromium : process.versions.chrome,
})

console.log("Preload chargé avec succès")