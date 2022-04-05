import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/UserModel';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.sass']
})
export class ResponseComponent implements OnInit {
  @Input() contenido!: string
  @Input() fecha!: string
  @Input() usuario!: UserModel
  constructor() { }

  ngOnInit(): void {
  }

}
