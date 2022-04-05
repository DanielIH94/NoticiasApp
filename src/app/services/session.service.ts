import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from '../models/UserModel';
import { GraphqlService } from './graphql.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private user: UserModel | undefined = undefined

  constructor(private graphql: GraphqlService, private cookie: CookieService) { }

  currentUser() {
    return this.cookie.get(`user-token`)
  }

  setUser(userId: number | undefined, type: boolean) {
    if (userId) {
      this.cookie.set(`user-token`, JSON.stringify({
        id: userId.toString(),
        internal: type
      }))
    }
  }

  logout() {
    this.cookie.delete('user-token')
  }
}
