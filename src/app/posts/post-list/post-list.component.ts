import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PostService } from '../post.service'; // '../post.service' dosyasından PostService'i import ediyoruz
import { Post } from '../post'; // '../post' dosyasından Post modelini import ediyoruz
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/user/user.service';
import { CategoryService } from 'src/app/category/category.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  posts: any[] = []; // Yazılar dizisi
  users: any[] = []; // Kullanıcı dizisi
  categories: any[] = []; // Kategori dizisi
  dataSource = new MatTableDataSource<Post>(); // MatTableDataSource kullanarak veri kaynağı oluşturuyoruz
  displayedColumns: string[] = ['postId', 'title', 'viewCount', 'creationDate', 'isPublished', 'transactions']; // Tabloda görüntülenecek sütunlar
  totalItems: any; // Toplam öğe sayısı
  selectedUserId: any;
  selectedCategoryId: any;
  selectedPostId: any;

  constructor(private postService: PostService, private router: Router, private userService: UserService, private categoryService: CategoryService, private route: ActivatedRoute) {

    if (this.userService.getUsers().length === 0) {
      this.userService.setUsers(); // UserService'ten kullanıcıları yükle
    }
    this.users = this.userService.getUsers();
    if (this.categoryService.getCategories().length === 0) {
      this.categoryService.setCategories(); // CategoryService'ten kategorileri yükle
    }
    this.categories = this.categoryService.getCategories();
    this.getAllPosts(); // Tüm yazıları almak için getAllPosts() fonksiyonunu çağırıyoruz
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // MatPaginator'ı kullanarak veri sayfalandırmasını yapılandırıyoruz
    this.route.queryParams.subscribe(params => {
      this.selectedCategoryId = Number(params['categoryId'])
      if (this.selectedCategoryId > 0) {
        this.applyFilterCategorie();
      }
    });
  }

  getAllPosts() {
    if (this.postService.getPosts().length === 0) {
      this.postService.setPosts(); // PostService üzerinden yazıları ayarla
    }
    this.posts = this.postService.getPosts(); // Yazıları al
    if (this.posts != undefined) {
      this.totalItems = this.posts.length; // Toplam öğe sayısını ayarla
      this.dataSource = new MatTableDataSource(this.posts); // MatTableDataSource kullanarak veri kaynağını ayarla
    }
  }

  handleDeleteClick($event: number): void {
    this.postService.deletePost($event); // Yazıyı silmek için PostService üzerinden deletePost() fonksiyonunu çağır
    this.posts = this.postService.getPosts(); // Güncellenmiş yazıları al
    this.totalItems = this.posts.length; // Toplam öğe sayısını güncelle
    this.dataSource = new MatTableDataSource(this.posts); // MatTableDataSource kullanarak veri kaynağını güncelle
    this.dataSource.paginator = this.paginator; // MatPaginator'ı güncelle
  }

  handleDetailClick($event: number): void {
    this.router.navigate(["/postlist/", $event]); // Yazı detayına yönlendir
  }

  applyFilter(filterValue: any): void {
    this.dataSource.filter = filterValue.value.trim().toLowerCase(); // Filtreleme işlemini uygula
  }
  applyFilterUser(filterValue: any): void {
    this.dataSource = new MatTableDataSource(this.posts.filter(x => x.userId === Number(filterValue.target.value)));
    this.dataSource.paginator = this.paginator; // MatPaginator'ı güncelle
  }
  applyFilterCategorie(): void {
    this.dataSource = new MatTableDataSource(this.posts.filter(x => x.categoryId === Number(this.selectedCategoryId)));
    this.dataSource.paginator = this.paginator; // MatPaginator'ı güncelle
  }
  applyFilterPost(filterValue: any): void {
    this.dataSource = new MatTableDataSource(this.posts.filter(x => x.postId === Number(filterValue.target.value)));
    this.dataSource.paginator = this.paginator; // MatPaginator'ı güncelle
  }
}
