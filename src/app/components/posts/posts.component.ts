import { Component, OnInit } from '@angular/core';
import { PostsDataService } from '../../services/posts-data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any;
  post = {
    userId: "",
    id: "",
    title: "",
    body: ""
  };
  addSuccess = false;
  addError = false;
  editSuccess = false;
  editError = false;
  deleteSuccess = false;
  deleteError = false;

  constructor(
    public postsService: PostsDataService
  ) { }

  ngOnInit() {
    this.postsService.getPosts().subscribe(posts => {
      this.posts = posts;
      console.log(typeof this.posts);
      console.log(posts);
    }, error => {
      console.log(error);
    });
  }

  addPost(form) {
    this.post.userId = '1';
    this.postsService.addPost(this.post).subscribe(post => {
      this.posts.unshift(post);
      form.resetForm();
      this.addSuccess = true;
      setTimeout(() => {
        this.addSuccess = false;
      }, 2000);
    }, error => {
      console.log(error);
      this.addError = true;
      setTimeout(() => {
        this.addError = false;
      }, 2000);
    });
  }

  editPost(post) {
    this.postsService.editPost(post).subscribe(post => {
      this.editSuccess = true;
      setTimeout(() => {
        this.editSuccess = false;
      }, 2000);
    }, error => {
      console.log(error);
      this.editError = true;
      setTimeout(() => {
        this.editError = false;
      }, 2000);
    });
    post.editing = false;
  }

  toggleEditPost(post) {
    this.posts[post.id - 1].editing = true;
  }

  deletePost(post) {
    this.posts.splice(post, 1);
    this.postsService.deletePost(post).subscribe(post => {
      this.deleteSuccess = true;
      setTimeout(() => {
        this.deleteSuccess = false;
      }, 2000);
      }, error => {
        console.log(error);
        this.deleteError = true;
        setTimeout(() => {
          this.deleteError = false;
        }, 2000);
      })
  }

}
