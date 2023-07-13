import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { PostService } from 'src/app/posts/post.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  categories: Category[] = [];
  dataSource = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['categoryId', 'categoryName', 'creationDate', 'transactions'];
  totalItems: any;

  constructor(private categoryService: CategoryService, private router: Router, private postService: PostService) {
    this.getAllCategories();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllCategories() {
    if (this.categoryService.getCategories().length === 0) {
      this.categoryService.setCategories();
    }
    this.categories = this.categoryService.getCategories();
    if (this.categories != undefined) {
      this.totalItems = this.categories.length;
      this.dataSource = new MatTableDataSource(this.categories);
    }
  }

  handleDeleteClick($event: number) {
    this.categoryService.deleteCategory($event);
    this.categories = this.categoryService.getCategories();
    this.totalItems = this.categories.length;
    this.dataSource = new MatTableDataSource(this.categories);
    this.dataSource.paginator = this.paginator;
  }

  handleDetailClick($event: number): void {
    this.router.navigate(["/categorylist/", $event]);
  }


  applyFilter(filterValue: any): void {
    this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }
}
