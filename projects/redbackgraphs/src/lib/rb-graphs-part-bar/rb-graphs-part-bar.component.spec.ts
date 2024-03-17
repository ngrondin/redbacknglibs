import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbGraphsPartBarComponent } from './rb-graphs-part-bar.component';

describe('RbGraphsPartBarComponent', () => {
  let component: RbGraphsPartBarComponent;
  let fixture: ComponentFixture<RbGraphsPartBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbGraphsPartBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbGraphsPartBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
