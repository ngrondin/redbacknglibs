import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbGraphsTilesComponent } from './rb-graphs-tiles.component';

describe('RbGraphsTilesComponent', () => {
  let component: RbGraphsTilesComponent;
  let fixture: ComponentFixture<RbGraphsTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbGraphsTilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbGraphsTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
