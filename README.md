# M2i-Angular
Introduction aux single page app dynamiques avec le meilleur framework JS de tous les temps.

## Table des matières <a name="tblMatieres"></a>
1. [Installer et utiliser Angular](#installer-et-utiliser-angular)
2. [Projet 1 - myAngApp](#projet-1---myangapp)
3. [Projet 2 - angapp2](#projet-2---angapp2)
4. [Projet 3 - angAppBDD](#projet-3---angappbdd)

## Installer et utiliser Angular

Dans un terminal, entrer les commandes suivantes :

    npm install -g @angular/cli
    ng new myAngApp
    cd myAngApp
    ng serve
    ng g c NouveauDossier

La 1ère commande installe Angular. Pour pouvoir l'utiliser sous Windows, pensez à ajouter le chemin d'accès au fichier '**ng**' (chemin habituel : "*C:\Users\Administrateur\AppData\Roaming\npm*").
Ce chemin peut être défini dans la variable *PATH* de l'environnement système.

Les 2e et 3e commandes servent à créer et se déplacer dans un nouveau projet.

La 4e commande permet de démarrer le serveur sur lequel tourne l'application (habituellement sur le port 4200).

Le 5e commande est utile pour générer un nouveau dossier dans notre projet contenant tous les fichiers, classes et méthodes générés automatiquement.

[Remonter vers la table des matières](#tblMatieres)

## Projet 1 - myAngApp

Le dossier **myAngApp_src** contient les fichiers **src** du premier projet vu en cours.

<img src="https://raw.githubusercontent.com/emdeo/M2i-Angular/master/angular1.PNG" width="55%" height="55%">
<img src="https://raw.githubusercontent.com/emdeo/M2i-Angular/master/angular3.PNG" width="55%" height="55%">

[Remonter vers la table des matières](#tblMatieres)

## Projet 2 - angapp2

<img src="https://raw.githubusercontent.com/emdeo/M2i-Angular/master/angapp2.PNG" alt="maquette angapp2"  width="55%" height="55%">

### Fichier **app.component.html** :

    <!-- Bouton -->
    <button class="btn btn-primary"
      (click)="onToggleDetails()"
      [disabled]="logs.length > 10">
        Afficher mot de passe
    </button>

    <!-- Mot de passe -->
    <p [hidden]="showSecret">Mot de passe : "{{mdp}}"</p>

    <!-- Log -->
    <div
      *ngFor="let logItem of logs; let i = index "
      [ngStyle]="{backgroundColor: i >= 5 ? 'dodgerblue' : 'transparent'}"
      [ngClass]="{'white-text': i >= 5}">
      {{i}} - {{logItem}}
    </div>

Le bouton contient un **event binding** qui lance la méthode *onToggleDetails()* à chaque événement *click*. Il contient également un **property binding** qui empêche de cliquer dessus plus de 10 fois.

Le paragraphe contient un **property binding** qui attribue la valeur de *showSecret* à la propriété *hidden*. Il contient également un **string interpolation** qui récupère la valeur de *mdp* pour l'afficher.

Le **div** sert à afficher une liste de logs. Les 5 premiers logs sont affichés normalement, les suivants sont en blanc (*[ngClass] = 'white-text'*) sur fond bleu (*[ngStyle] = backgroundColor*).

A chaque clic de bouton, ce code permet d'afficher le mot de passe et le moment où le bouton a été cliqué.

### Fichier **app.component.ts** :

    import { Component } from '@angular/core';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    })
    export class AppComponent {
      title = 'angapp2'
      mdp = "4l1c3"
      showSecret = false
      logs = []

      onToggleDetails(){
        this.showSecret = !this.showSecret
        this.logs.push(new Date())
      }
    }

### Fichier **app.component.css** :

    .white-text{
        color: white;
    }

    p{
        margin: 2%;
        padding: 20px;
        background-color: palegreen;
        border: 1px solid green;
    }

[Remonter vers la table des matières](#tblMatieres)

## Projet 3 - angAppBDD

Intro à Angular et la gestion de BDD (Firebase). L'application permet à l'utilisateur de sauvegarder les données d'un formulaire dans une base de donénes et de récupérer ces sauvegardes pour les afficher sur la page.

Produit final de l'application :

<img src="https://raw.githubusercontent.com/emdeo/M2i-Angular/master/angAppBdd1.PNG" width="55%" height="55%">

Contenu de la base de données Firebase :

<img src="https://raw.githubusercontent.com/emdeo/M2i-Angular/master/angAppBdd2.PNG" width="55%" height="55%">

### Fichier **app.module.ts**

Créer le module **FormsModule** (pour récupérer les données entrées dans le formulaire par l'utilisateur) et **HttpClientModule** (pour les requêtes http).

La première étape consiste à importer et nommer les modules.

    import { FormsModule } from '@angular/forms';
    import { HttpClientModule } from '@angular/common/http';

On définit ensuite le rôle des modules dans la clé **imports** de **NgModule**.

    @NgModule({
        ...
        imports: [
        FormsModule,
        HttpClientModule
        ]
        ...
    })

Le reste du fichier est inchangé.

### Fichier **post.modele.ts**

Il permet de décrire le format d'un objet post que l'application va échanger avec la base de données. 

    export interface Post {
        title: string
        content: string
        id?: string // Le '?' signifie que cet attribut est optionnel
    }

### Fichier **app.component.ts**

Avant de définir la classe, pensez à importer les bibliothèques nécessaires à l'exécution du code. **HttpClient** permet de générer des requêtes HTTP ; **map** contient les opérateurs utilisé dans le pipe() ; **Post** définit le format attendu d'un post (voir plus haut).

    import { HttpClient } from '@angular/common/http'
    import { map } from 'rxjs/operators'
    import { Post } from './post.modele'

On commence par créer les attributs de la classe **AppComponent**.

      titreJumbo = "Angular & stockage externe"
      leadJumbo = "La gestion de BDD avec Firebase"
      titrePost = "Alice"
      contenuPost = "Mais alors, si le monde n'a absolument aucun sens, qui nous empêche d'en inventer un ?"

Adresse de la BDD Firebase (consultable depuis "https://console.firebase.google.com/project/angappdb1/database/angappdb1/data", requiert une authentification de compte Google).

      url = "https://angappdb1.firebaseio.com/"
      urlPosts = this.url + "/posts.json"

Le constructeur de la classe est vide. Il prend en paramètre une requête HTTP.

      constructor(private http: HttpClient) {

      }

**ngOnInit()** s'exécute au chargement de la page. Il lance **readAllBDD()**.

      ngOnInit() {
        this.readallBDD();
      }

Envoyer une requête *POST*.

      onCreerPost(donneesPostees: Post) {
        console.log(donneesPostees)

        // Poster les données sur la BDD (url en paramètre)
        this.http.post(
          this.urlPosts,
          donneesPostees
        ).subscribe(reponse => { // pas de subscribe() == pas de requête HTTP !!!
          console.log(reponse)
        })
      }

Envoyer une requête *GET*.

      onLirePosts() {
        this.readallBDD()
      }

Récupérer les données stockées dans la BDD.

      private readallBDD() {

        this.http
          .get<{ [key: string]: Post }> // le format du post doit correspondre au modèle défini dans 'post.modele.ts'
          (this.urlPosts)               // url de la bdd
          .pipe(                        // pipe() permet de de mettre en forme les données avec des opérateurs - par ex. map()
            map(reponse => {

              const lstPosts: Post[] = []   // liste des posts stockés dans la bdd
              for (const key in reponse) {  // par ex. "Lhu9iQIeFgNotw0vQii"

                // On s'assure qu'on récupère l'objet qui nous intéresse (et non pas un prototype)
                if (reponse.hasOwnProperty(key)) {

                  // Ajouter un objet à la liste à chaque itération. Chaque objet est identifiable par sa clé cryptée
                  lstPosts.push({ ...reponse[key], id: key })
                }
              }
              return lstPosts
            }))
          .subscribe(posts => {   // récupérer une liste de posts tels qu'ils ont été créés par l'utilisateur
            console.log(posts)    // affiche le contenu de la BDD dans la console du navigateur
          })
      }


### Fichier **app.component.html**

Jumbotron avec texte centré horizontalement (voir classe *center* dans **app.component.css**).

    <div class="jumbotron center">
      <h1 class="display-5">{{titreJumbo}}</h1>
      <p class="lead">{{leadJumbo}}</p>
    </div>

Le reste du code est dans un **div** de class *container*. On commence par créer un **formulaire** (attention : *#postForm* recquiert le module *@angular/forms*).

    <form #postForm="ngForm" (ngSubmit)="onCreerPost(postForm.value)">
        ...
    </form>

Les deux premières **div** contiennent un titre et un **input** centrés horizontalement (voir classe *aumilieu* dans **app.component.css**).

    <div class="form-group aumilieu">
        <h5>Titre</h5>
        <input
            type="text"
            class="form-control col-sm-7"
            id="txtTitre"
            required
            ngModel
            name="txtTitre"
            [placeholder]="titrePost"
            [value]="titrePost">
    </div>

    <div class="form-group aumilieu">
        <h5>Contenu</h5>
        <textarea
            class="form-control col-sm-7"
            id="txtContenu"
            required
            ngModel
            name="txtContenu"
            [placeholder]="contenuPost">
        </textarea>
    </div>

Un bouton permettant de poster les inputs dans la BDD. Le bouton est désactivé tant que le formulaire n'est pas rempli (propriété *required* des inputs ci-dessus).

    <div class="form-group aumilieu">
        <button
            class="btn btn-primary espacer"
            id="btnPoster"
            [disabled]="!postForm.valid">
                Poster
        </button>
    </div>

Une ligne séparant la page.

    <hr class="my-3">

Deux boutons permettant d'afficher la liste de posts et de vider la base de données.

    <div class="form-group aumilieu">
        <button type="button" class="btn btn-primary espacer">Lire posts</button>
        <button type="button" class="btn btn-warning espacer">Vider posts</button>
    </div>

Afficher la liste de posts.

    <div class="form-group aumilieu">
        <p *ngFor="let post of lstPosts">{{post}}</p>
    </div>

[Remonter vers la table des matières](#tblMatieres)
