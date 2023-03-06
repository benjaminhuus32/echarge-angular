import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSignupComponent } from './home-signup.component';

describe('HomeSignupComponent', () => {
  let component: HomeSignupComponent;
  let fixture: ComponentFixture<HomeSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
