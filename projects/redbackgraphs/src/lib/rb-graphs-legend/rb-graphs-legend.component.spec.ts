import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbGraphsLegendComponent } from './rb-graphs-legend.component';

describe('RbGraphsLegendComponent', () => {
  let component: RbGraphsLegendComponent;
  let fixture: ComponentFixture<RbGraphsLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbGraphsLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbGraphsLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
