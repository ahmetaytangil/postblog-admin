import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapsGeneralComponent } from './google-maps-general.component';

describe('GoogleMapsGeneralComponent', () => {
  let component: GoogleMapsGeneralComponent;
  let fixture: ComponentFixture<GoogleMapsGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleMapsGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleMapsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
