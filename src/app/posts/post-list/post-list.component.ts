import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActionTypes } from 'src/app/enums/action-types.enum';
import { PostAddComponent } from '../post-add/post-add.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  posts: any[] = [];
  pagedData: Post[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  dataSource = new MatTableDataSource<Post>();
  displayedColumns: string[] = ['postId', 'title', 'viewCount', 'creationDate', 'isPublished', 'transactions'];
  totalItems: any;
  dialogRefNewPost: any;


  constructor(private postService: PostService, private router: Router, private matDialog: MatDialog) {
    this.getAllPosts();

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllPosts() {
    if (this.postService.getPosts().length === 0) {
      this.postService.setPosts();
    }
    this.posts = this.postService.getPosts()
    if (this.posts != undefined) {
      this.totalItems = this.posts.length;
      this.dataSource = new MatTableDataSource(this.posts);
    }
  }

  handleDeleteClick($event: number): void {
    this.postService.deletePost($event);
    this.posts = this.postService.getPosts();
    this.totalItems = this.posts.length;
    this.dataSource = new MatTableDataSource(this.posts);
    this.dataSource.paginator = this.paginator;

  }

  handleDetailClick($event: number): void {
    this.router.navigate(["/postlist/", $event]);
  }

  applyFilter(filterValue: any): void {
    this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }



}
