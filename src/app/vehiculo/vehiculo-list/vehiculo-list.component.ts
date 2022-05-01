import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';

@Component({
  selector: 'app-vehiculo-list',
  templateUrl: './vehiculo-list.component.html',
  styleUrls: ['./vehiculo-list.component.css']
})
export class VehiculoListComponent implements OnInit {

  vehiculos: Array<Vehiculo> = [];
  public sumaVehiculos = new Map<String, Number>();

  constructor(private vehiculoService: VehiculoService) { }

  getVehiculos(): void {
    this.vehiculoService.getVehiculos().subscribe((vehiculos) => {
      this.vehiculos = vehiculos;
    });
  }

  getSumaVehiculos(): void {
    this.vehiculoService.getVehiculos().subscribe((vehiculos) => {
      this.vehiculos = vehiculos;
      this.vehiculos.forEach((v) => {

        if(this.sumaVehiculos.has(v.marca)){
          var obtenerSuma = Number(this.sumaVehiculos.get(v.marca));
          this.sumaVehiculos.set(v.marca, obtenerSuma+1 );
        }else{
          this.sumaVehiculos.set(v.marca, 1)
        }
      })
    });
  }

  ngOnInit() {
    this.getVehiculos();
    this.getSumaVehiculos();
  }

}
