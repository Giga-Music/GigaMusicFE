import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin.layout',
  templateUrl: './admin.layout.component.html',
  styleUrls: ['./admin.layout.component.scss']
})
export class AdminLayoutComponent implements OnInit{

  public items: any[] = [
    {
      label: 'Playlists',
      link: 'playlists'
    },
    {
      label: 'Tracks',
      link: 'tracks'
    },
  ]

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {

  }

}
