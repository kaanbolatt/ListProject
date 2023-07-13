import { Component, Inject, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user';
import { ActionTypes } from 'src/app/enums/action-types.enum';
import { PostService } from 'src/app/posts/post.service';
import { Post } from 'src/app/posts/post';
import { Category } from '../category';
import { CategoryService } from '../category.service';
@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})

export class CategoryAddComponent implements OnInit {
  category: Category = {
    categoryId : 0,
    name: "",
    creationDate: ""
  };

  dialogTitle: string = "Add Category";
  users: User[] = [];
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private router: Router, private userService: UserService) {
    this.userService.setUsers();
    this.users = this.userService.getUsers();
    if (this.categoryService.getCategories().length === 0)
      this.categoryService.setCategories();
    this.categories = this.categoryService.getCategories();
  }

  ngOnInit() {
  }


  handleSaveClick() {
    this.category.categoryId = this.categories[this.categories.length - 1].categoryId + 1;
    this.categoryService.addCategory(this.category.name,this.category.creationDate);
    this.categories = this.categoryService.getCategories();
    this.router.navigateByUrl('/categorylist');
  }

  handleCancelClick() {
    this.router.navigateByUrl("/categorylist");
  }



}
