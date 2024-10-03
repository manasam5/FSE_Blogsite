import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ResponseDialogComponent } from './response-dialog.component';

describe('ResponseDialogComponent', () => {
  let component: ResponseDialogComponent;
  let fixture: ComponentFixture<ResponseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ResponseDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: { message: 'Test message' } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the message passed in data', () => {
    const messageElement: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(messageElement.textContent).toBe('Test message');
  });
});
