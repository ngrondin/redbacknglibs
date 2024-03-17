import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbGraphsChartframeComponent } from './rb-graphs-chartframe.component';

describe('RbGraphsChartframeComponent', () => {
  let component: RbGraphsChartframeComponent;
  let fixture: ComponentFixture<RbGraphsChartframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbGraphsChartframeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbGraphsChartframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
