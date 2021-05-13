import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbGraphsTileComponent } from './rb-graphs-tile.component';

describe('RbGraphsTileComponent', () => {
  let component: RbGraphsTileComponent;
  let fixture: ComponentFixture<RbGraphsTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbGraphsTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbGraphsTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
