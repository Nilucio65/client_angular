import { ClientService } from './../client.service';
import { Client } from '../client';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit{

  clients: Client[]  = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getClient();
  }

  getClient(){
    this.clientService.getClient(1).subscribe({
      next: (data) => {
        this.clients = data;
        console.log(this.clients);
      },
      error: ()=> console.log("Error to call endpoint")

    });
  }



}
