import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogComponent } from './create-area-dialog.component';

describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
