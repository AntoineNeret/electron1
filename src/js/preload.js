//Ce script sera exécuté avant le chargement de la page
//Ce script a un accès aux API Node et Electron

const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('versions',{
    //fonction qui récupère les versions via IPC
    getVersions : () =>  ipcRenderer.invoke('get-versions')
})

contextBridge.exposeInMainWorld('todosAPI',{
    //fonction qui récupère la liste des tâches via IPC
    getAll : () =>  ipcRenderer.invoke('todos:getAll')
})

console.log("Preload chargé avec succès")