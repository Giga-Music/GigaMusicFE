import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksEditCreateComponent } from './tracks-edit-create.component';

describe('TracksEditCreateComponent', () => {
  let component: TracksEditCreateComponent;
  let fixture: ComponentFixture<TracksEditCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TracksEditCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracksEditCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
