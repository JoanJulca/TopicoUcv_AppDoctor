//HISTORIAL DE CITAS (DESDE 2020)

import { Component, OnInit, inject } from '@angular/core';
import { orderBy,where} from 'firebase/firestore';
import { Cita } from 'src/app/models/cita.model';
import { collectionGroup, getFirestore, query, onSnapshot } from 'firebase/firestore';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateCitaComponent } from 'src/app/shared/components/add-update-cita/add-update-cita.component';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  
  //cerrar sesion
singOut(){
  this.firebaseSvc.sigOut();
}

  citas: Cita[] = [];
  loading: boolean = false;

  citaEstado(cita): string {
    const fechaCita = new Date(`${cita.fecha}T${cita.hora}:00`);
    const now = new Date();
    return fechaCita < now ? 'Cita Concluida' : 'Cita Pendiente';
  }

  citaEstadoColor(cita): string {
    const fechaCita = new Date(`${cita.fecha}T${cita.hora}:00`);
    const now = new Date();
    return fechaCita < now ? 'danger' : 'success';
  }

  ngOnInit() {
  }
  user(): user {
    return this.utilsSvc.getFromLocalStorage('user');
  }
  ionViewWillEnter() {
    this.getProducts();
  }
   doRefresh(event) {
    setTimeout(() => {
      this.getProducts
      event.target.complete();
    }, 1000);
   }
  //====Obtener citas de hoy=============
  getCitasHoy(){
    let hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // establece la hora a medianoche para la comparación
  
    return this.citas.filter(cita => {
      let fechaCita = new Date(cita.fecha);
      fechaCita.setHours(0, 0, 0, 0); // establece la hora a medianoche para la comparación
  
      return fechaCita.getTime() === hoy.getTime();
    });
  }
  

  //====Obtener las citas=============
  
  getProducts() {
    this.loading = true;
    let user = this.utilsSvc.getFromLocalStorage('user'); // Obtén el usuario actual
  
    // Utilizamos una consulta de grupo de colecciones para obtener todas las citas
    let citasQuery = query(
      collectionGroup(getFirestore(), 'cita'),
      where('doctor', '==', user.name), // Filtra solo las citas del doctor con el mismo nombre del usuario
      orderBy('fecha', 'desc')
    );
  
    let sub = onSnapshot(citasQuery, (querySnapshot) => {
      let citas = [];
      querySnapshot.forEach((doc) => {
        citas.push(doc.data());
      });
      console.log(citas);
      this.citas = citas;
      this.loading = false;
      // No es necesario desuscribirse de onSnapshot
    }, (error) => {
       
    });
  }
  
}

