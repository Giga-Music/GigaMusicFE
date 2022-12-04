import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTrackComponent } from './open-track.component';

describe('OpenTrackComponent', () => {
  let component: OpenTrackComponent;
  let fixture: ComponentFixture<OpenTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
