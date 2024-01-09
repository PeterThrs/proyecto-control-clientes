import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteServicio } from '../../servicios/cliente.service';
import { Cliente } from '../../modelo/cliente.model';
import { NgForm } from '@angular/forms';
import { AlertMessagesService } from 'jjwins-angular-alert-messages';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit{

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '', 
    email: '', 
    saldo: 0
  }

  @ViewChild("clienteForm") clienteForm: NgForm
  @ViewChild('botonCerrar') botonCerrar: ElementRef;

  constructor(private clientesServicio: ClienteServicio,
      private alertMessageService : AlertMessagesService
    ) {

  }
  ngOnInit(): void {
    this.clientesServicio.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    );
  }

  getSaldoTotal(){
    let saldoTotal: number = 0;
    if(this.clientes){
      this.clientes.forEach( cliente => {
        saldoTotal += cliente.saldo || 0;
      })
      
    }
    return saldoTotal;
  }


  agregar(clienteForm: NgForm) {
    if (!clienteForm.valid) {
          this.alertMessageService.show('Por favor llena el formulario correctamente',  {cssClass:'alert alert-warning', timeOut: 4000});
        }
        else {
          //Agregar contenido cliente
          this.clientesServicio.agregarCliente(this.cliente);
          this.clienteForm.resetForm();
          this.cerrarModal();
        }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }


}
