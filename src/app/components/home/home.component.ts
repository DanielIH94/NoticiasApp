import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GraphqlService } from 'src/app/services/graphql.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  private serviceSubscription!: Subscription

  notas: any
  loading: boolean

  constructor(private graphqlService: GraphqlService) {
    this.loading = true
  }

  ngOnInit() {
    this.getNotes()
  }

  getNotes() {
    this.serviceSubscription = this.graphqlService.getNotes().subscribe(({ data, loading, error }) => {

      this.loading = loading
      this.notas = data.notas
    })
  }

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe()
  }

}
