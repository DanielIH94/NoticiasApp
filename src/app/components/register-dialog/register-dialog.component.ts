import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterUserModel } from 'src/app/models/RegisterUserModel';
import { GraphqlService } from 'src/app/services/graphql.service';
import { MyErrorStateMatcher } from 'src/app/utils/MyErrorStateMatcher';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.sass']
})
export class RegisterDialogComponent implements OnInit {


  registerForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    key: new FormControl(''),
    photo: new FormControl(null, [Validators.required])
  })


  matcher = new MyErrorStateMatcher();

  constructor(private graphqlService: GraphqlService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  register() {
    this.getBase64(this.registerForm.value.photo, result => {
      let user: RegisterUserModel = {
        nombreUsuario: this.registerForm.value.user,
        contrasena: this.registerForm.value.password,
        foto: result.split(",")[1],
      }

      try{
        this.registerUser(user, this.registerForm.value.key)
      }catch(error){
        alert(error)
      }
    })
  }

  private registerUser(user: RegisterUserModel, idPersonal: number) {
    this.graphqlService.register(user, idPersonal).subscribe(({data, loading, errors})=>{
      if(errors){
        throw new Error("Ocurrio un error");
      }
      if(data){
        alert("El registro se realizo con exito")
        this.dialog.closeAll()
      }
    })
  }

  private getBase64(file: File, result: (str: string) => any) {
    let str = ""
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      result(reader.result as string)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

    return str
  }
}

