import { Component } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/category/category.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent {
  posts: Post[] = [];
  post: Post = {
    postId: 0,
    userId: 0,
    categoryId: 0,
    title: "",
    content: "",
    viewCount: 0,
    creationDate: "",
    isPublished: false
  };
  users: User[] = [];
  categories: Category[] = [];
  editMode: Boolean = false;

  constructor(private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private categoryService: CategoryService) {
    if (this.userService.getUsers().length === 0) {
      this.userService.setUsers();
    }
    else {
      this.users = this.userService.getUsers();
    }
    if (this.categoryService.getCategories().length === 0) {
      this.categoryService.setCategories();
    }
    else {
      this.categories = this.categoryService.getCategories();
    }
    if (this.postService.getPosts().length === 0) {
      this.postService.setPosts();
    }
    this.posts = this.postService.getPosts()
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.post = this.posts.find(post => post.postId === Number(id))!;
      if (this.post == undefined) {
        alert("An error occurred while retrieving post information.");
        this.router.navigateByUrl("/postlist");
      }
    })
  }

  handleSaveClick() {
    this.postService.updatePost(this.post);
    this.router.navigateByUrl('/postlist');
  }

  handleDeleteClick() {
    this.postService.deletePost(this.post.postId);
    this.router.navigateByUrl('/postlist');
  }

  handleEditClick() {
    this.editMode = !this.editMode;
  }
}
