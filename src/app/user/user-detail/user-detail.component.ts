import { Component } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { PostService } from 'src/app/posts/post.service';
import { CategoryService } from 'src/app/category/category.service';
import { Category } from 'src/app/category/category';
import { Post } from 'src/app/posts/post';
import { CommentService } from 'src/app/comments/comment.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  users: User[] = [];
  user: User = {
    userId: 0,
    creationDate: "",
    email: "",
    isActive: false,
    username: ""
  };
  editMode: Boolean = false;
  categories: Category[] = [];
  posts: Post[] = [];

  constructor(private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private categoryService: CategoryService,
    private commentService: CommentService) {
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
      this.user = this.users.find(user => user.userId === Number(id))!;
      if (this.user == undefined) {
        alert("An error occurred while retrieving user information.");
        this.router.navigateByUrl("/userlist");
      }
    })
  }
  handleSaveClick() {
    if (this.user.username == '' || this.user.email == '' || this.user.creationDate == '')
      alert("All the empty spaces must be filled.");
    else if (this.userService.checkUnique(this.user.username, this.user.email, this.user.userId) === false)
      alert("Username and email must be unique from others.");
    else {
      this.userService.editUser(this.user, this.user.userId);
      this.router.navigateByUrl('/userlist');
    }
  }
  //son kullanıcı kalması durumunda hata vermesini sağladık.
  handleDeleteClick() {
    if (this.userService.userCount() === 1)
      alert("You can not delete last users.")
    else if (this.checkPostsAndComments(this.user.userId) === true)
      alert("You cannot delete a user with post or comment");
    else {
      this.userService.deleteUser(this.user.userId);
      this.router.navigateByUrl('/userlist');

    }
  }


  checkPostsAndComments(id: number): boolean {
    if (this.postService.getPosts().filter((post) => post.userId === id).length !== 0)
      return true;
    else if (this.commentService.getComments().filter((comment) => comment.userId === id).length !== 0)
      return true;
    else
      return false;
  }

  handleEditClick() {
    this.editMode = !this.editMode;
  }
}

