import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../api.service';
import { ResponseDialogComponent } from '../response-dialog/response-dialog.component';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent implements OnInit {
  isFormVisible = false;
  isVisible = false;
  deleteVisible = false;
  postData = {
    id: '',
    name: '',
    category: '',
    article: '',
    authorName: ''
  };

  constructor(private blogService: ApiService,  public dialog: MatDialog) { }
  ngOnInit(): void {
    this.onSubmit,
    this.onUpdate
  }

  onSubmit(): void {
    this.blogService.addBlogs(this.postData,this.postData.name).subscribe(
      response => {
        console.log('Blog added successfully!', response);
        this.openDialog(`Response: ${response.message}`);
      },
      error => {
        console.error('Error creating post', error);
        this.openDialog(`Error: ${error.error.message}`);
      }
     );
  }
  onUpdate(): void {
    this.blogService.updateBlogs(this.postData,this.postData.id).subscribe(
      response => {
        console.log('Blog updated successfully!', response);
        this.openDialog(`Response: ${response.message}`);
      },
      error => {
        console.error('Error updating the blog', error);
        this.openDialog(`Error: ${error.error.message}`);
      }
     );
  }
  
  onDelete(): void {
    this.blogService.deleteBlogs(this.postData.name).subscribe(
      response => {
        console.log('Blog deleted successfully!', response);
        this.openDialog('Blog deleted successfully!');
      },
      error => {
        console.error('Error deleting post', error);
        this.openDialog(`Error: ${error.error.message}`);
      }
     );
  }
  openDialog(message: string): void {
    this.dialog.open(ResponseDialogComponent, {
      data: { message }
    });
  }

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
  toggle() {
    this.isVisible = !this.isVisible;
  }
  toggleDelete() {
    this.deleteVisible = !this.deleteVisible;
  }
}
