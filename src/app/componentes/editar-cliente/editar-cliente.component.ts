import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../modelo/cliente.model';
import { ClienteServicio } from '../../servicios/cliente.service';
import { AlertMessagesService } from 'jjwins-angular-alert-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  id: string;

  constructor(private clientesServicio: ClienteServicio,
    private alertMessageService: AlertMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.clientesServicio.getCliente(this.id).subscribe(
      cliente => {
        this.cliente = cliente;
      }
    );
  }

  guardar(clienteForm: NgForm) {
    if (!clienteForm.valid) {
      this.alertMessageService.show('Por favor llena el formulario correctamente', { cssClass: 'alert alert-danger', timeOut: 4000 });
    }
    else {
      //Agregar contenido cliente
      clienteForm.value.id = this.id;
      //modificar el cliente
      this.clientesServicio.modificarCliente(clienteForm.value);
      this.router.navigate(['/']);
    }
  }

  eliminar() {
    if(confirm(`Seguro que desea eliminar el cliente`)){
      this.clientesServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }

}
