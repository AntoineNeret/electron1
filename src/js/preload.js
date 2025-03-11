//Ce script sera exécuté avant le chargement de la page
//Ce script a un accès aux API Node et Electron

const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('versions',{
    //fonction qui récupère les versions via IPC
    getVersions : () =>  ipcRenderer.invoke('get-versions')
})

console.log("Preload chargé avec succès")