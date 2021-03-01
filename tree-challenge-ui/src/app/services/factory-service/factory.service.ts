import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenerationInstructions } from '../../models/generation-instructions-model';
import { stringify } from '@angular/compiler/src/util';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'TreeChallengeApiKey': 'nXuYPVaxYpaDoaLDxsb1yWQhKki9SzWz'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FactoryService {
  baseUrl: string;

  constructor(
    private httpClient: HttpClient
  ) { 
    this.baseUrl = "https://treechallengeapi-04.azurewebsites.net/Factory/";
  }

  getFactories() : Observable<any> {
    return this.httpClient.get(this.baseUrl, httpOptions).pipe(catchError(err => throwError(err)));
  }

  deleteFactory(id: number){
    return this.httpClient.delete(this.baseUrl + id, httpOptions).pipe(catchError(err => throwError(err)));
  }

  deleteChildNode(id: number){
    return this.httpClient.delete(this.baseUrl + "child/" + id, httpOptions).pipe(catchError(err => throwError(err)));
  }

  addFactory(name: string){
    return this.httpClient.post(this.baseUrl, JSON.stringify(name), httpOptions).pipe(catchError(err => throwError(err)));
  }

  editFactory(id: number, newName: string){
    return this.httpClient.put(this.baseUrl + id, JSON.stringify(newName), httpOptions).pipe(catchError(err => throwError(err)));
  }

  generateChildren(id: number, instructions: GenerationInstructions){
    return this.httpClient.post(this.baseUrl + id + "/generateNodes", JSON.stringify(instructions), httpOptions).pipe(catchError(err => throwError(err)));
  }
}
