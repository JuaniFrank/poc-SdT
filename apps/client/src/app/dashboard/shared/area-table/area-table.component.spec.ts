import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaTableComponent } from './area-table.component';

describe('AreaTableComponent', () => {
  let component: AreaTableComponent;
  let fixture: ComponentFixture<AreaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
