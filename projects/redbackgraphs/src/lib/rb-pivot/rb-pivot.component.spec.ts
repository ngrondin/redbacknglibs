import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbPivotComponent } from './rb-pivot.component';

describe('RbPivotComponent', () => {
  let component: RbPivotComponent;
  let fixture: ComponentFixture<RbPivotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbPivotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbPivotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
