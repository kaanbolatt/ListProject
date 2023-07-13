import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { PostService } from 'src/app/posts/post.service';
import { CommentService } from 'src/app/comments/comment.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<User>();

  users: User[] = [];

  //forms kısmında yer alan değişkenleri tanımladık.
  username: string = "";
  email: string = "";
  creationDate: string = "";
  isActive: boolean = false;
  editMode: boolean = false;
  userId: number = 0;
  totalItems: any;
  displayedColumns: string[] = ['userId', 'username', 'email', 'creationDate', 'isActive', 'transactions'];


  constructor(private userService: UserService, private postService: PostService, private commentService: CommentService, private router: Router) {
    this.getAllUsers();
    if (this.postService.getPosts().length === 0)
      this.postService.setPosts();
    if (this.commentService.getComments().length === 0)
      this.commentService.setComments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllUsers() {
    if (this.userService.getUsers().length === 0)
      this.userService.setUsers();
    this.users = this.userService.getUsers();
    if (this.users != undefined) {
      this.totalItems = this.users.length;
      this.dataSource = new MatTableDataSource(this.users);
    }
  }

  //son kullanıcı kalması durumunda hata vermesini sağladık.
  handleDeleteClick($event: number) {
    if (this.userService.userCount() === 1)
      alert("You can not delete last users.")
    else if (this.checkPostsAndComments($event) === true)
      alert("You cannot delete a user with post or comment");
    else {
      this.userService.deleteUser($event);
      this.users = this.userService.getUsers();
      this.totalItems = this.users.length;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
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

  handleDetailClick($event: number): void {
    this.router.navigate(["/userlist/", $event]);
  }

  // handleEditClick($event: number): void {
  //   this.editMode = true;
  //   this.userId = $event;
  // }

  // handleCancelClick(): void {
  //   this.editMode = false;
  //   this.username = "";
  //   this.email = "";
  //   this.creationDate = "";
  //   this.userId = 0;
  // }

  applyFilter(filterValue: any): void {
    this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }
}

