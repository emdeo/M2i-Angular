import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  clicBouton = false
  serverCreationStatus = "Pas de serveur créé"
  nomServeur = "anonyme"
  serveurCree = false

  // Constructeur
  constructor() {
    // clicBouton devient true après 2 secs
    setTimeout(() => { this.clicBouton = true }, 2000)
  }

  // Méthode générée automatiquement
  ngOnInit() { }

  // Méthode perso
  onCreationServeur() {

    this.serveurCree = true

    // modifie la variable serverCreationStatus quand la méthode est appelée (cf. servers.components.html)
    this.serverCreationStatus = "Création du serveur '" + this.nomServeur + "'"
  }

  // méthode appelée pour n'importe quel type d'événement
  onModifieNomServeur(event: Event) {
    console.log(event)

    // nomServeur prend la même valeur que celle de l'événement détecté (caractères tapés au clavier)
    this.nomServeur = (<HTMLInputElement>event.target).value
  }

}
