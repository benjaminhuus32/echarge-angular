import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationInfoBoxComponent } from './station-info-box.component';

describe('StationInfoBoxComponent', () => {
  let component: StationInfoBoxComponent;
  let fixture: ComponentFixture<StationInfoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationInfoBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationInfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
