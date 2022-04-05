import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComentarioInputModel } from 'src/app/models/ComentarioInputModel';
import { CommentModel } from 'src/app/models/CommentModel';
import { UserModel } from 'src/app/models/UserModel';
import { GraphqlService } from 'src/app/services/graphql.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.sass']
})
export class NoteComponent implements OnInit {

  @Input() idNota!: number
  @Input() titulo!: string
  @Input() contenido!: string
  @Input() fecha!: string
  @Input() usuario!: UserModel
  @Input() comentarios!: CommentModel[]

  comentarioForm = new FormGroup({
    comentario: new FormControl('')
  })

  stateComments = true

  constructor(private graphql: GraphqlService, private session: SessionService) { }

  ngOnInit(): void {
  }

  toggleComments() {
    this.stateComments = !this.stateComments
  }

  submitComment(e: Event) {
    e.preventDefault()
    let contenido:string = this.comentarioForm.controls['comentario'].value
    if(contenido.length == 0){
      alert("El comentario no puede estar vacío")
      return 
    }
    let date = new Date();
    let sqlDate = date.getUTCFullYear() + '-' +
      ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
      ('00' + date.getUTCDate()).slice(-2)
    this.nuevoComentario({
      contenido,
      fechaComentario: sqlDate
    }, this.idNota, this.usuario.idUsuario)

    this.comentarioForm.reset()
  }

  private nuevoComentario(comentario: ComentarioInputModel, idUsuario: number, idNota: number) {
    let iu = JSON.parse(this.session.currentUser()).id
    
    this.graphql.newComentario(comentario, this.idNota, iu).subscribe(({ data }) => {
      console.log(data);

    })
  }
}
