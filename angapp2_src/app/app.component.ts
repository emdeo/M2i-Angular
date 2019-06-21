import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angapp2'
  mdp = "4l1c3"
  showSecret = true
  logs = []

  onToggleDetails(){
    this.showSecret = !this.showSecret
    this.logs.push(new Date())
  }
}
