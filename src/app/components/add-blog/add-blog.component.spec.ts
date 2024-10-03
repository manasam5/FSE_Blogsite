import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../api.service';
import { AddBlogComponent } from './add-blog.component';

describe('AddBlogComponent', () => {
  let component: AddBlogComponent;
  let fixture: ComponentFixture<AddBlogComponent>;
  let myService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const myServiceSpy = jasmine.createSpyObj('ApiService', ['sendData']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, MatInputModule, MatButtonModule],
      declarations: [AddBlogComponent],
      providers: [{ provide: ApiService, useValue: myServiceSpy }]
    }).compileComponents();

    await TestBed.configureTestingModule({
      declarations: [AddBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBlogComponent);
    component = fixture.componentInstance;
    myService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
