import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { AppState } from 'src/app/store/app.state';
import { PostsListComponent } from '../posts-list/posts-list.component';
import { getPostsById } from '../posts-list/state/post.selectots';
import { addPost, editPost } from '../posts-list/state/posts.actions';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {

  post: Post | any;
  postForm: FormGroup | any;
  postSubscription : Subscription | any;
  constructor(private route:ActivatedRoute, private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.postSubscription = this.route.paramMap.subscribe((params)=>{
      const id = params.get('id');
      this.store.select(getPostsById, {id}).subscribe((data)=>{
        this.post = data;
        this.createForm();
      })
    })
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  createForm(){
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title,[Validators.required,Validators.minLength(6)]),
      description: new FormControl(this.post.description,[Validators.required,Validators.minLength(10)])
    })
  }

  onUpdatePost(){
    if(!this.postForm.valid)
      return;
    
    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post = {title: title, description: description, id: this.post.id}
    this.store.dispatch(editPost({post}));
    this.router.navigate(['posts']);
  }

}
