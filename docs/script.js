//const fs = require('fs');
//gestionaire de fichier, importer avec node.js

//si le fichier existe => le lire
// if(fs.existsSync("storage.json")){
//     loadStorage();
// }

/**
 * Charger le contenu du fichier storage.json
 */
// function loadStorage() {
//     try {
//         const data = fs.readFileSync('storage.json', 'utf8' );
//         console.log(data);
//     } catch (err) {
//         console.log(err);
//     }
// }

//requête vers l'api chucknorris.io pour récupérer les catégories, les transformer en json pour pouvoir travailler avec et appeler createCategory avec le json en paramètre.
fetch("https://api.chucknorris.io/jokes/categories")
    .then((response) => response.json())
    .then(json => createCategory(json))
    .catch((error) => {
        console.log("There was an error!", error);
    });

// récupération du select dans le html.
let select = document.getElementById('select');


/**
 * création des catégories dans le select a partir du json créer a partir du résultat de la requête a l'api.
 * @param json le json créer a partir du résultat de la requête a l'api.
 */
function createCategory(json) {

    // parcourir toute les catégories.
    for (let category of json){
        // créé l'option et l'ajouter au select.
        let option = document.createElement('option');
        option.innerText = category;
        select.append(option);
    }
}

/**
 *  Function appeler l'ors du click sur le button générate.
 */
function generate() {
    // récupération de la catégorie selectionner.
    let cat = select.options[select.selectedIndex].innerText;
    let url;
    // si pas de catégorie sélectionner faire une requête vers random sinon préciser la catégorie.
    if(cat === 'none'){
        url = 'https://api.chucknorris.io/jokes/random';
    }else {
        url = "https://api.chucknorris.io/jokes/random?category=" + cat;
    }

    // requête vers l'api avec ou non la catégorie et appel createList avec le résultat en paramètre.
    fetch(url)
        .then((response) => response.json())
        .then(json => createDiv(json))
        .catch((error) => {
            console.log("There was an error!", error);
        });
}


/**
 * crée les div a afficher avec le résultat de l'api (json).
 * @param json résultat de l'api (json).
 */
function createDiv(json) {
    // création du div.
    let div = document.createElement('div');
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.alignItems = 'center';
    document.body.appendChild(div);

    // création de l'image (l'image de l'API n'est plus disponible).
    let img = document.createElement('img');
    // img.src = json['icon_url'];
    img.src = 'https://images02.military.com/sites/default/files/2021-04/chucknorris.jpeg';
    div.append(img);

    // création du texte.
    let p = document.createElement('p');
    p.innerText = json['value'];

    div.append(p);

    // se positionne en bas de la page.
    window.scrollTo(0, document.body.scrollHeight);

    // sauvegarder le contenu dans storage.json.
    //saveToStorage();

}


// function saveToStorage() {
//
//     let body = document.body.json();
//
//     fs.writeFile("storage.json", body);
//
// }

