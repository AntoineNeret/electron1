const listeTaches = document.querySelector('#ListeTaches');
const rafraichirBouton = document.querySelector('#rafraichir');

async function getListeTaches() {
    const taches = await todosAPI.getAll();
    // taches = []
        listeTaches.innerHTML = taches.length===0 ? `<div class="fw-bold">Vous n'avez créé aucune tâche !</div>` : taches.map( (tache) =>`
                <div class="card mx-auto my-3 shadow" style="width: 18rem;">
                <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill ${tache.termine === 1 ? 'bg-success' : 'bg-danger'}">
                    ${tache.termine === 1 ? 'Cette tâche est terminée' : 'Cette  tâche n\'est pas terminée'}
                </span>
                    <div class="card-body">
                        <h5 class="card-title">${tache.titre}</h5>
                        <p class="card-text">Créée le ${tache.createdAt.toLocaleDateString()} à ${tache.createdAt.toLocaleTimeString()}</p>
                        <p  class="card-text"></p>
                        <button data-id=${tache.id} class="btn-suppr btn btn-outline-danger">Supprimer</button>
                    </div>
                </div>
        `).join('   ');
}
getListeTaches()

rafraichirBouton.addEventListener('click', () => {
    location.reload()
})

//Fonction qui appelle l'API pour supprimer une tâche à partir de son id
async function deleteTarget(idTarget){
    await todosAPI.delete(idTarget)
}

//On ajoute un écouteur sur l'événement de clique puis on regarde quel bouton de suppression est le plus proche
//On récupère l'id de la tâche à laquelle appartient le bouton et on appelle la fonction pour supprimer
listeTaches.addEventListener('click', (evt) => {
    const target = evt.target.closest('.btn-suppr');
    const idTarget = target.dataset.id;
    deleteTarget(idTarget)
    location.reload()
})