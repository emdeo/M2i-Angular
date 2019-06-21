import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators' // opérateur utilisé dans le pipe()
import { Post } from './post.modele' // le format attendu d'un post

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titreJumbo = "Angular & stockage externe"
  leadJumbo = "La gestion de BDD avec Firebase"
  titrePost = "Alice"
  contenuPost = "Mais alors, si le monde n'a absolument aucun sens, qui nous empêche d'en inventer un ?"

  // Adresse de la BDD Firebase (consultable depuis "https://console.firebase.google.com/project/angappdb1/database/angappdb1/data")
  url = "https://angappdb1.firebaseio.com/"
  urlPosts = this.url + "/posts.json"

  constructor(private http: HttpClient) {

  }

  // Exécution au lancement de la page
  ngOnInit() {
    this.readallBDD();
  }

  // Envoyer une requête http POST
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

  // Envoyer une requête http GET
  onLirePosts() {
    this.readallBDD()
  }

  // Récupérer les données stockées dans la BDD
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
}
