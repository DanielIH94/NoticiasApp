import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/UserModel';
import { GraphqlService } from 'src/app/services/graphql.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.sass']
})
export class ResponseComponent implements OnInit {
  @Input() contenido!: string
  @Input() fecha!: string
  @Input() usuario!: UserModel

  interno!: boolean

  constructor(private graphql: GraphqlService) { }

  ngOnInit(): void {
    this.getStatus()
  }

  private getStatus() {
    this.graphql.isInterno(this.usuario.idUsuario).subscribe(({ data }) => {
      
      this.interno = data.isInterno
    })
  }

}
