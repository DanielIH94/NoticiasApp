import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/UserModel';
import { GraphqlService } from 'src/app/services/graphql.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-note-creator',
  templateUrl: './note-creator.component.html',
  styleUrls: ['./note-creator.component.sass']
})
export class NoteCreatorComponent implements OnInit {

  @Input() width!: string;

  current: any

  constructor(private session: SessionService, private graphql: GraphqlService) {
    this.current = JSON.parse(this.session.currentUser())    
  }

  ngOnInit(): void {
    this.userData()
  }

  hasPermission() {
    return this.current.internal
  }

  userData() {
    this.graphql.getUserById(this.current.id).subscribe
  }

}
