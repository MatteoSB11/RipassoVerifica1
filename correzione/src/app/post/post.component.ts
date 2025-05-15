import { Component, Input } from '@angular/core';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post! : Post;
  numeroLike: number = 0;

  like(){
    this.numeroLike++;
  }

}
