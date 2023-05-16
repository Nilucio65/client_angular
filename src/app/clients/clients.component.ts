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
  isEditing: boolean = false;
  currentClient: Client = {} as Client;

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
    if(this.isEditing){
      this.clientService.edit(this.formGroupClient.value).subscribe({
        next: data => {
          let index = this.clients.indexOf(this.currentClient);
          this.clients[index] = data;
        }
      })
      this.isEditing = false;
    }
    else{
      this.clientService.save(this.formGroupClient.value).subscribe({
        next: data => {
          this.clients.push(data);
          console.log(this.clients);
        }
      })
    }
    this.formGroupClient.reset();
  }

  remove(client: Client){
    this.clientService.remove(client).subscribe({
      next: () => {
        let index = this.clients.indexOf(client);
        this.clients.splice(index, 1);
      }
    });
  }

  edit(client: Client){
    this.formGroupClient.setValue(client)
    this.currentClient = client;
    this.isEditing = true
  }
}
