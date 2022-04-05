import { Component, OnInit } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { GraphqlService } from 'src/app/services/graphql.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.sass']
})
export class SideNavComponent implements OnInit {

  menuItems = [
    { icon: 'home', text: 'Inicio' },
  ];

  loading!: boolean
  usuario!:UserModel

  fullName!:string

  constructor(private session: SessionService, private router: Router, private graphql: GraphqlService) {
    this.loading = true
  }

  ngOnInit(): void {
    this.getUserInfo()
  }

  getUserInfo(){
    let iu = JSON.parse(this.session.currentUser()).id
    this.graphql.getUserById(iu).subscribe(({data, loading})=>{
      this.loading = loading
      this.usuario = data.usuario
      if(data.usuario.personal)
        this.fullName = `${data.usuario.personal.nombre} ${data.usuario.personal.apellidoPaterno}`
    })
  }

  logout() {
    this.session.logout()
    this.router.navigate(['login'])
  }

}
