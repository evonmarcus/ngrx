import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { addPost, deletePost, editPost } from "./posts.actions";
import { initialState } from "./posts.state";

const _postReducer = createReducer(initialState,on(addPost, (state,action) => {
    let post = {...action.post};
    post.id = (state.posts.length + 1).toString();
    return {
        ...state,
        posts: [...state.posts,post],
    };
}), on(editPost,(state,action)=>{
    let updatedPosts = state.posts.map(post=>{
        return action.post.id== post.id? action.post:post;
    })
    return {
        ...state,
        posts: updatedPosts,
    };
}), on(deletePost,(state,{id})=>{
    let afterDeletePost =  state.posts.filter(post=>{return post.id !== id} );
    return{
        ...state,
        posts: afterDeletePost,
    };
}));

export function postReducer(state : any, action: any){
    return _postReducer(state,action);
}