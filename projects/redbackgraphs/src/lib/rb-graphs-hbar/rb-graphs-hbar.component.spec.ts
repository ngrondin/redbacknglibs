import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbGraphsHbarComponent } from './rb-graphs-hbar.component';

describe('RbGraphsHbarComponent', () => {
  let component: RbGraphsHbarComponent;
  let fixture: ComponentFixture<RbGraphsHbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbGraphsHbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbGraphsHbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
