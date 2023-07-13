import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Comment } from '../comment'; // '../comment' dosyasından Comment modelini import ediyoruz
import { CommentService } from '../comment.service'; // '../comment.service' dosyasından CommentService'i import ediyoruz
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  comments: Comment[] = []; // Yorumlar dizisi
  dataSource = new MatTableDataSource<Comment>(); // MatTableDataSource kullanarak veri kaynağı oluşturuyoruz
  displayedColumns: string[] = ['commentId', 'postId', 'userId', 'comment', 'creationDate', 'isConfirmed', 'transactions']; // Tablo sütunları
  totalItems: any;

  constructor(
    private commentService: CommentService,
    private router: Router
  ) {
    this.getAllComments(); // Tüm yorumları al ve tabloyu güncelle
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllComments() {
    if (this.commentService.getComments().length === 0)
      this.commentService.setComments(); // Yorumları yükle
    this.comments = this.commentService.getComments(); // Yorumları al
    if (this.comments != undefined) {
      this.totalItems = this.comments.length;
      this.dataSource = new MatTableDataSource(this.comments); // Yorumları MatTableDataSource'a aktar
    }
  }

  handleDeleteClick($event: number) {
    this.commentService.deleteComment($event); // Yorumu sil
    this.comments = this.commentService.getComments(); // Yorumları al
    this.totalItems = this.comments.length;
    this.dataSource = new MatTableDataSource(this.comments); // Tabloyu güncelle
    this.dataSource.paginator = this.paginator;
  }

  handleDetailClick($event: number) {
    this.router.navigateByUrl(`/commentlist/${$event}`); // Yorum detayına yönlendir
  }

  applyFilter(filterValue: any): void {
    this.dataSource.filter = filterValue.value.trim().toLowerCase(); // Filtreleme işlemi
  }
}
