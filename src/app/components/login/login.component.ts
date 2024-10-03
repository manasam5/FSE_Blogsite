import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit {
 
  loginForm!: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router,private apiService: ApiService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      emailId: ['', Validators.required]
    });
  }
  onSubmit(): void {
    this.successMessage = null;
    this.errorMessage = null;
    this.isSubmitting = true;
    if (this.loginForm.invalid) {
      return;
    }
    const { name, password, emailId } = this.loginForm.value;
    //debugger; 
      this.apiService.register(name,password,emailId).subscribe(
        (data) => {
          this.successMessage = 'Login successful!';
          console.info('Login successful', data);
          this.router.navigate(['/blog']);
        },
        (error) => {
          if (error.status == 400) {
            this.errorMessage = error.error;
            console.error('Error fetching data:', error);
          }
          if (error.status == 201) {
            this.successMessage = 'Login successful!';
          console.info('Login successful');
          this.router.navigate(['/blog']);
          }
        }
      );
  }
}
