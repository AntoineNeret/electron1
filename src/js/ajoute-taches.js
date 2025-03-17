const ajoutTachesForm = document.querySelector('#ajoutForm');
let titre

async function setTodo(titre){
    titre = document.querySelector('#inputTitre').value;
    await todosAPI.setTodo(titre)
}

ajoutTachesForm.addEventListener('submit', (e) => {
    setTodo()
})

