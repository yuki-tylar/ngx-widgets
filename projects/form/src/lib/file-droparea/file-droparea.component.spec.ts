import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDropareaComponent } from './file-droparea.component';

describe('FileDropareaComponent', () => {
  let component: FileDropareaComponent;
  let fixture: ComponentFixture<FileDropareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDropareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDropareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
