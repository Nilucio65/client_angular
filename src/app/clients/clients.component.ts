import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
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
  formGroupClient: FormGroup;

  constructor(private clientService: ClientService, private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
    });
  }

  ngOnInit(): void {
    this.getClient();
  }

  getClient(){
    this.clientService.getClient().subscribe({
      next: (data) => {
        this.clients = data;
        console.log(this.clients);
      },
      error: ()=> console.log("Error to call endpoint")

    });
  }

  save(){
    this.clientService.save(this.formGroupClient.value).subscribe({
      next: data => {
        this.clients.push(data);
        this.formGroupClient.reset();
        console.log(this.clients);
      }
    })


  }
}
