import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})

export class serverComponent {
  statutServeur = "hors-ligne"
  idServeur = 42

  // Constructeur
  constructor() {
    this.statutServeur = Math.random() > .5 ? "hors-ligne" : "en ligne"
  }

  getStatutServeur() {
    return this.statutServeur
  }

  getColor() {
    return this.statutServeur === "hors-ligne" ? "salmon" : "lightgreen"
  }

}
