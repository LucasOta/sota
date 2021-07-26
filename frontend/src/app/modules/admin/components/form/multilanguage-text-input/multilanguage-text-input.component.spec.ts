import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilanguageTextInputComponent } from './multilanguage-text-input.component';

describe('MultilanguageTextInputComponent', () => {
  let component: MultilanguageTextInputComponent;
  let fixture: ComponentFixture<MultilanguageTextInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultilanguageTextInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultilanguageTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
