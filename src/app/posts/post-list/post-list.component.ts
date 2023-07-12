import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
  displayedColumns: string[] = ['postId', 'title', 'viewCount', 'creationDate', 'isPublished', 'islemler'];
  totalItems: any;
  constructor(private postService: PostService, private router: Router) {
    if (this.postService.getPosts().length === 0) {
      this.postService.setPosts();
    }
    this.posts = this.postService.getPosts()
    if (this.posts != undefined) {
      this.totalItems = this.posts.length;
      this.dataSource = new MatTableDataSource(this.posts);
    }

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  ngOnInit() {
  }



}
