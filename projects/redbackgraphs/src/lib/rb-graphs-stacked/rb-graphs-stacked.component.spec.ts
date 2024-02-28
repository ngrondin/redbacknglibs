import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbGraphsStackedComponent } from './rb-graphs-stacked.component';

describe('RbGraphStackedComponent', () => {
  let component: RbGraphsStackedComponent;
  let fixture: ComponentFixture<RbGraphsStackedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbGraphsStackedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbGraphsStackedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
