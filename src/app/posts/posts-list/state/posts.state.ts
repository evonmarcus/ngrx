import { Post } from "src/app/model/post.model";

export interface PostState{
    posts: Post[];
}

export const initialState : PostState = {
    posts:[
        {id:'1', title:'Sample title 1', description:'This is a sample description 1'},
        {id:'2', title:'Sample title 2', description:'This is a sample description 2'},
    ]
}