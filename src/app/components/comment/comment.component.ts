import { Component, Input, OnInit } from '@angular/core';
import { ResponseModel } from 'src/app/models/ResponseModel';
import { UserModel } from 'src/app/models/UserModel';

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

  stateComments = false

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleComments() {
    this.stateComments = !this.stateComments
  }

  submitResponse(e: Event){
    
  }

}
