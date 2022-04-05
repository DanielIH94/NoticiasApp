import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GraphqlService } from 'src/app/services/graphql.service';
import { SessionService } from 'src/app/services/session.service';
import { MyErrorStateMatcher } from 'src/app/utils/MyErrorStateMatcher';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  welcome = {
    nombre: "",
    foto: "../assets/profile.png"
  }


  userFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(private graphqlService: GraphqlService,
    private session: SessionService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  submitLogin(e: Event) {
    e.preventDefault()
    let u: string = this.userFormControl.value
    let p: string = this.passwordFormControl.value
    this.login(u, p)
  }

  login(username: string, password: string) {

    this.graphqlService.login(username, password).subscribe(({ data }) => {
      if (data.login) {
        let idUsuario = data.login.idUsuario
        this.graphqlService.isInterno(idUsuario).subscribe(({ data }) => {        
          this.session.setUser(idUsuario, data.isInterno)
          this.router.navigate(['/home'])
        })
      }
    })
  }

  changeEmail() {
    this.graphqlService.getUserByUsername(this.userFormControl.value).subscribe(({ data, error }) => {
      if (data) {
        if (data.usuarioByNombreUsuario) {
          if (data.usuarioByNombreUsuario.personal) {
            this.welcome = {
              nombre: data.usuarioByNombreUsuario.personal.nombre,
              foto: `data:image/png;base64,${data.usuarioByNombreUsuario.foto}`
            }
          }
        }
      } else {
        this.welcome = {
          nombre: "",
          foto: "../assets/profile.png"
        }
      }
    })
  }

  openRegister() {
    const dialogRef = this.dialog.open(RegisterDialogComponent);
  }

}
