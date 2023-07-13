import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Comment } from '../comment';
import { CommentService } from '../comment.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  comments: Comment[] = [];
  dataSource = new MatTableDataSource<Comment>();
  displayedColumns: string[] = ['commentId', 'postId', 'userId', 'comment', 'creationDate', 'isConfirmed', 'transactions'];
  totalItems: any;

  constructor(private commentService: CommentService,
    private router: Router) {
    this.getAllComments();
  };

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllComments() {
    if (this.commentService.getComments().length === 0)
      this.commentService.setComments();
    this.comments = this.commentService.getComments();
    if (this.comments != undefined) {
      this.totalItems = this.comments.length;
      this.dataSource = new MatTableDataSource(this.comments);
    }
  }

  handleDeleteClick($event: number) {
    this.commentService.deleteComment($event);
    this.comments = this.commentService.getComments();
    this.totalItems = this.comments.length;
    this.dataSource = new MatTableDataSource(this.comments);
    this.dataSource.paginator = this.paginator;
  }

  handleDetailClick($event: number) {
    this.router.navigateByUrl(`/commentlist/${$event}`);
  }


  applyFilter(filterValue: any): void {
    this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }

}
