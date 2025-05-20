import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaPillComponent } from './area-pill.component';

describe('AreaPillComponent', () => {
  let component: AreaPillComponent;
  let fixture: ComponentFixture<AreaPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaPillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
