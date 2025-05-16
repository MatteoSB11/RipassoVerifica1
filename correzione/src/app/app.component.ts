import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Post } from './models/post.model';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , CommonModule, PostComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'correzione';
  vettPost: Post[] = [];
  obs : Observable<Post[]>;
  //Mi faccio dare l'oggetto http da angular
  constructor(private http: HttpClient) {
    //Faccio la richiesta http perché il costruttore parte all'avvio
    this.obs = this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts'); //richiedo i post dal mio server
    //Dico all'observable cosa fare quando ricevo i dati
    this.obs.subscribe(this.getData);
  }

  //La funzione che l'observable chiama quando riceve i dati
  getData = (data: Post[]) => {
    console.log(data);
    this.vettPost = data; //Assegno i dati ricevuti all'array di post
  }

  obsPost! : Observable<any>; //Per ora non so che dati riceverò
  addPost(userID : string, body : string) {
    let nuovoPost = new Post(userID,body, "0", "SENZA TITOLO");
    this.vettPost.push(nuovoPost);
    //console.log(this.vettPost);

    this.obsPost = this.http.post('https://jsonplaceholder.typicode.com/posts', nuovoPost) //Qui invio i dati del nuovo post al server
    this.obsPost.subscribe();
    
  }

  rispostaPost = (data : any) =>
  {
    console.log(data);
  }
}
