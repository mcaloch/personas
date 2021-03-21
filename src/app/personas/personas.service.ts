import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Persona } from './persona';

@Injectable({
  providedIn: 'root'
})

export class PersonasService {
	private personasUrl = 'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole';  // URL to web api

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

  constructor(private http: HttpClient) { }	


  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.personasUrl)
      .pipe(
        tap(_ => this.log('fetched personas')),
        catchError(this.handleError<Persona[]>('getPersonas', []))
      );
  }

  addPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.personasUrl, persona, this.httpOptions).pipe(
      tap((newPersona: Persona) => this.log(`added persona w/ id=${newPersona.first}`)),
      catchError(this.handleError<Persona>('addPersona'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PersonaService message with console */
  private log(message: string) {
    console.log(`PersonaService: ${message}`);
  }


}
