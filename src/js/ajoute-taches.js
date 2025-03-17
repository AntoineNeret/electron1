const ajoutTachesForm = document.querySelector('#ajoutForm');
let titre

async function setTodo(titre){
    console.log("ajout tâche à été appelé")
    titre = document.querySelector('#inputTitre').value;
    await todosAPI.setTodo(titre)
}

ajoutTachesForm.addEventListener('submit', (e) => {
    console.log("ajout tâche à été appelé")
    event.preventDefault()
    setTodo()
})

