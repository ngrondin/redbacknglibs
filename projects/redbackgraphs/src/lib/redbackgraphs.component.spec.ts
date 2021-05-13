import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedbackgraphsComponent } from './redbackgraphs.component';

describe('RedbackgraphsComponent', () => {
  let component: RedbackgraphsComponent;
  let fixture: ComponentFixture<RedbackgraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedbackgraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedbackgraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
