import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotaInputModel } from 'src/app/models/NotaInputModel';
import { GraphqlService } from 'src/app/services/graphql.service';
import { SessionService } from 'src/app/services/session.service';
import { MyErrorStateMatcher } from 'src/app/utils/MyErrorStateMatcher';

@Component({
  selector: 'app-note-creator',
  templateUrl: './note-creator.component.html',
  styleUrls: ['./note-creator.component.sass']
})
export class NoteCreatorComponent implements OnInit {

  @Input() width!: string;

  current: any
  userInfo: any
  subscription!: Subscription
  loading: boolean
  userImg: string

  notaForm = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    contenido: new FormControl('', [Validators.required]),
  })

  matcher = new MyErrorStateMatcher();

  constructor(private session: SessionService, private graphql: GraphqlService) {
    this.current = JSON.parse(this.session.currentUser())
    this.loading = true
    this.userImg = ""
  }

  ngOnInit() {
    this.getUserData()
  }

  get hasPermission() {
    return this.current.internal
  }

  nuevaNota(nota: NotaInputModel, idUsuario: number) {
    this.graphql.newNote(nota, idUsuario).subscribe(({ data }) => {
      if (data) {
        alert("Se creo la nota con exito")
      }
    })
  }

  onSubmit(e: Event) {
    e.preventDefault()
    let date = new Date();
    let sqlDate = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' + 
        ('00' + date.getUTCHours()).slice(-2) + ':' + 
        ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
        ('00' + date.getUTCSeconds()).slice(-2);

    this.nuevaNota({
      titulo: this.notaForm.controls['titulo'].value,
      contenido: this.notaForm.controls['contenido'].value,
      fechaNota: sqlDate,
    }, this.current.id)

    this.notaForm.reset()
  }

  private getUserData() {
    this.subscription = this.graphql.getUserById(this.current.id).subscribe(({ data, loading }) => {
      this.loading = loading
      this.userInfo = data.usuario
    })
  }

  onDestroy() {
    this.subscription.unsubscribe()
  }

}
