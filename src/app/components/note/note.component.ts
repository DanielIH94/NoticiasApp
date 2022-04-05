import { Component, Input, OnInit } from '@angular/core';
import { CommentModel } from 'src/app/models/CommentModel';
import { UserModel } from 'src/app/models/UserModel';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.sass']
})
export class NoteComponent implements OnInit {

  @Input() titulo!: string
  @Input() contenido!: string
  @Input() fecha!: string
  @Input() usuario!: UserModel
  @Input() comentarios!: CommentModel[]

  stateComments = true

  constructor() { }

  ngOnInit(): void {
  }

  toggleComments() {
    this.stateComments = !this.stateComments
  }

  submitComment(e: Event) {
    e.preventDefault()
  }
}
