import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { ApiService } from '../../api.service';
import { Blogs } from '../../model/blogs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  blogs: Blogs[] = [];
  filteredBlogs: Blogs[] = []; 
  categories: string[] = [];
  selectedCategory: string = '';
  isFormVisible = false;
  pageSize = 10;
  currentPage = 0;
 
  constructor(private blogService: ApiService) { }

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getAllBlogs().subscribe(
      (data: Blogs[]) => {
        this.blogs = data;
        this.filteredBlogs = data;
        this.extractCategories();
      },
      error => {
        console.error('Error fetching blogs', error);
      }
    );
  }

  extractCategories(): void {
    const uniqueCategories = new Set(this.blogs.map(blog => blog.category));
    this.categories = Array.from(uniqueCategories);
  }

  onCategoryChange(event: MatSelectChange): void {
    console.log(event);
    this.selectedCategory = event.value;
    this.loadFilteredBlogs();
  }
  
  loadFilteredBlogs(): void {
    if (this.selectedCategory) {
      console.log(this.selectedCategory);
      this.blogs = this.blogs.filter(blog => blog.category === this.selectedCategory);
    } else {
     this.loadBlogs();
    }
    this.currentPage = 0; 
  }
  

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
