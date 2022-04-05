import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommentModel } from 'src/app/models/CommentModel';
import { ResponseModel } from 'src/app/models/ResponseModel';
import { RespuestaInputModel } from 'src/app/models/RespuestaInputModel';
import { UserModel } from 'src/app/models/UserModel';
import { GraphqlService } from 'src/app/services/graphql.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass']
})
export class CommentComponent implements OnInit {

  @Input() contenido!: string
  @Input() fecha!: string
  @Input() respuestas!: ResponseModel[]
  @Input() usuario!: UserModel
  @Input() comentario!: CommentModel

  stateComments = false

  respuestaForm = new FormGroup({
    respuesta: new FormControl('')
  })

  interno!: boolean

  constructor(private session: SessionService, private graphql: GraphqlService) { }

  ngOnInit(): void {
    this.getStatus()
  }

  toggleComments() {
    this.stateComments = !this.stateComments
  }

  submitResponse(e: Event) {
    e.preventDefault()
    let contenido: string = this.respuestaForm.controls['respuesta'].value
    if (contenido.length == 0) {
      alert("El comentario no puede estar vacío")
      return
    }
    let date = new Date();
    let sqlDate = date.getUTCFullYear() + '-' +
      ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
      ('00' + date.getUTCDate()).slice(-2)
    this.nuevaRespuesta({
      contenido,
      fechaRespuesta: sqlDate
    })

    this.respuestaForm.reset()
  }

  private getStatus(){
    this.graphql.isInterno(this.usuario.idUsuario).subscribe(({data})=>{
      this.interno = data.isInterno
    })
  }

  private nuevaRespuesta(respuesta: RespuestaInputModel) {
    let iu = JSON.parse(this.session.currentUser()).id

    this.graphql.newRespuesta(respuesta, this.comentario.idComentario, iu).subscribe(({data})=>{
      console.log(data);
      
    })
  }
}
