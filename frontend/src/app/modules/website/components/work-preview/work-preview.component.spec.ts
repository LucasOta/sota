import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWorkPreviewComponent } from './home-work-preview.component';

describe('HomeWorkPreviewComponent', () => {
  let component: HomeWorkPreviewComponent;
  let fixture: ComponentFixture<HomeWorkPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeWorkPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeWorkPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
