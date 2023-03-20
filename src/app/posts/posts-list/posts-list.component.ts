import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { AppState } from 'src/app/store/app.state';
import { getPosts } from './state/post.selectots';
import { deletePost } from './state/posts.actions';
import { PostState } from './state/posts.state';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: Observable<Post[]> =  new Observable<Post[]>;
  
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
  }

  onDeletePost(id: any){
    if(confirm("Are you sure you want to delete ?")){
      this.store.dispatch(deletePost({id:id}));
    }
  }
}
