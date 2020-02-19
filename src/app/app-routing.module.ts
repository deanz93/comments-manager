import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';


const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'post', component: PostsComponent },
  { path: 'comment', component: CommentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
