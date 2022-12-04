import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsEditCreateComponent } from './playlists-edit-create.component';

describe('PlaylistsEditCreateComponent', () => {
  let component: PlaylistsEditCreateComponent;
  let fixture: ComponentFixture<PlaylistsEditCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistsEditCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistsEditCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
