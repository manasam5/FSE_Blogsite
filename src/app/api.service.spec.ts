import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get the blogs', () => {
    const mockData = [ {
      id: "123",
      name : "First Blog",
      category : "test",
      article : "First blog",
      authorName : "Manasa M",
      timeStamp : "2024-08-20T11:13:09.276+00:00"
  }];

  service.getAllBlogs().subscribe(data => {
    return expect(data).toEqual(mockData);
  });
   
  
  const req = httpMock.expectOne('http://localhost:8080/api/v1.0/blogsite/user/blogs/getall');
  expect(req.request.method).toBe('GET');
  req.flush(mockData);

  });
});
