import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs/internal/observable/of';
import { ApiService } from '../../api.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let apiService: ApiService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,ReactiveFormsModule,MatInputModule,BrowserAnimationsModule,MatCardModule,MatFormFieldModule ],
      declarations: [LoginComponent],
      providers: [ApiService] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService); // Correctly inject the service
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the login method of ApiService on form submission', () => {
    spyOn(apiService, 'register').and.returnValue(of({ success: true })); // Mock the login method
    //jasmine.createSpy().and.callThrough();
    component.loginForm.setValue({ name:'Manasa', password: 'password123',emailId: 'test@example.com' });
    component.onSubmit();

    expect(apiService.register).toHaveBeenCalledWith('Manasa', 'password123','test@example.com');
  });

});
