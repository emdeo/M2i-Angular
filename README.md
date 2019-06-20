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
      
      <!-- Bouton -->
      <button class="btn btn-primary" (click)="onToggleDetails()">
        Afficher mot de passe
      </button>
      
      <!-- Mot de passe -->
      <p [hidden]="showSecret">Mot de passe : "{{mdp}}"</p>
      
      <!-- Log -->
      <div
        *ngFor="let logItem of logs; "
        [ngStyle]="{backgroundColor: logItem >= 5 ? 'dodgerblue' : 'transparent'}"
        [ngClass]="{'white-text': logItem >= 5}">
            {{logItem}}
      </div>
      
    </div>

Le bouton contient un **event binding** qui lance la méthode *onToggleDetails()* à chaque événement *click*.

Le paragraphe contient un **property binding** qui attribue la valeur de *showSecret* à la propriété *hidden*. Il contient également un **string interpolation** qui récupère la valeur de *mdp* pour l'afficher.

Le **div** sert à afficher la liste des moments où le bouton a été cliqué (variable *logs*). Chaque logItem est affiché en blanc (*[ngClass] = 'white-text'*) sur fond bleu (*[ngStyle] = backgroundColor*).

A chaque clic de bouton, ce code permet d'afficher le mot de passe et le moment où le bouton a été cliqué.

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
      logs = []

      onToggleDetails(){
        this.showSecret = !this.showSecret
        this.logs.push(new Date())
      }
    }

Fichier **app.component.css** :

    .white-text{
        color: white;
    }

Résultat :
