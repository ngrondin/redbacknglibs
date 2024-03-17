import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbGraphsVBarComponent } from './rb-graphs-vbar.component';

describe('RbGraphsBarComponent', () => {
  let component: RbGraphsVBarComponent;
  let fixture: ComponentFixture<RbGraphsVBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbGraphsVBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbGraphsVBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
