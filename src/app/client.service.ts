import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Client} from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = "http://localhost:8080/clients";

  constructor(private http: HttpClient) { }

  getClient(): Observable <Client[]>{

    return this.http.get<Client[]>(this.url);
  }

  save(client: Client): Observable <Client>{
    return this.http.post<Client>(this.url, client);
  }

  remove(client: Client): Observable <void>{
    return this.http.delete<void>(this.url + "/" + client.id);
  }

  edit(client: Client): Observable <Client>{
    return this.http.put<Client>(this.url + "/" + client.id, client);
  }
}
