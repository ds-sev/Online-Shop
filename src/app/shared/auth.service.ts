import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from '../../environments/environment'
import { tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) {
  }

  login(User: {}) {
    console.log(new Date())
    return this._http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, User)
    .pipe(
      tap(this._setToken)
    )

  }
  private _setToken (response: any) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token-exp', expDate.toString())
      localStorage.setItem('fb-token', response.idToken)
    } else {
      localStorage.clear()
    }
  }
  get token(): any {
    // const expDate = new Date(localStorage.getItem('fb-token-exp'))
    const expDate: any = localStorage.getItem('fb-token-exp')
    // const expDate = new Date()
    if (new Date > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }
  logout() {
    this._setToken(null)
  }
  isAuthenticated() {
    return !!this.token
  }
}
