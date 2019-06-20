# M2i-Angular
Introduction aux single page app dynamiques avec le meilleur framework JS de tous les temps.

### Installer et utiliser Angular

Dans un terminal, entrer les commandes suivantes :

    npm install - @angular/cli
    ng new myAngApp
    cd myAngApp
    ng serve
    ng g c NouveauDossier

La 1ère commande installe Angular. Pour pouvoir l'utiliser sous Windows, pensez à ajouter le chemin d'accès au fichier '**ng**' (chemin habituel : "*C:\Users\Administrateur\AppData\Roaming\npm*").
Ce chemin peut être défini dans la variable *PATH* de l'environnement système.

Les 2e et 3e commandes servent à créer et se déplacer dans un nouveau projet.

La 4e commande permet de démarrer le serveur sur lequel tourne l'application (habituellement sur le port 4200).

Le 5e commande est utile pour générer un nouveau dossier dans notre projet contenant tous les fichiers, classes et méthodes générés automatiquement.

### Exercice 1 - myAngApp

Le dossier **myAngApp_src** contient les fichiers **src** du premier projet vu en cours.

<img src="https://raw.githubusercontent.com/emdeo/M2i-Angular/master/angular1.PNG" width="55%" height="55%">
<img src="https://raw.githubusercontent.com/emdeo/M2i-Angular/master/angular2.PNG" width="55%" height="55%">
<img src="https://raw.githubusercontent.com/emdeo/M2i-Angular/master/angular3.PNG" width="55%" height="55%">

### Exercice 2 - angapp2

Fichier **app.component.html** :

    <div class="container">
      <br>
      <button class="btn btn-primary" (click)="onToggleDetails()">Afficher mot de passe</button>
      <p [hidden]="showSecret">Mot de passe : "{{mdp}}"</p>
    </div>

Le bouton contient un **event binding** qui lance la méthode *onToggleDetails()* à chaque événement *click*.

Le paragraphe contient un **property binding** qui attribue la valeur de *showSecret* à la propriété *hidden*. Il contient également un **string interpolation** qui récupère la valeur de *mdp* pour l'afficher.

Ce code permet d'afficher et de cacher un paragraphe à chaque fois que le bouton est cliqué.

Fichier **app.component.ts** :

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
      log = []

      onToggleDetails(){
        this.showSecret = !this.showSecret
        this.log.push(new Date())
      }
    }

Résultat :
