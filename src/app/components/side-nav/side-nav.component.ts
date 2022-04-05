import { Component, OnInit } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.sass']
})
export class SideNavComponent implements OnInit {

  menuItems = [
    { icon: 'home', text: 'Inicio' },
    { icon: 'note_alt', text: 'Mis notas' }
  ];

  constructor(private session: SessionService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.session.logout()
    this.router.navigate(['login'])
  }

}
