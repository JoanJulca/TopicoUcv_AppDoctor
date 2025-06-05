//REPORTE DE CITAS (SEMANAL - PENDIENTES)

import { Component, OnInit, inject } from '@angular/core';
import { orderBy,where} from 'firebase/firestore';
import { Cita } from 'src/app/models/cita.model';
import { collectionGroup, getFirestore, query, onSnapshot } from 'firebase/firestore';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateCitaComponent } from 'src/app/shared/components/add-update-cita/add-update-cita.component';
import { ElementRef, ViewChild } from '@angular/core';
//importamos para el uso de pdfmake
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-CP',
  templateUrl: './CP.page.html',
  styleUrls: ['./CP.page.scss'],
})
export class HomePage implements OnInit {
  

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

 
  getCitasPendientes() {
    const now = new Date();
    return this.citas.filter(cita => {
      const fechaCita = new Date(`${cita.fecha}T${cita.hora}:00`);
      return fechaCita >= now; // Filtra solo las citas pendientes o en el futuro
    });
  }
  
  ngOnInit() {
  }
  //this.getProducts();


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
  

//generar pdf
  private getProducts() {
    this.loading = true;
    const user = this.utilsSvc.getFromLocalStorage('user');

    const citasQuery = query(
      collectionGroup(getFirestore(), 'cita'),
      where('doctor', '==', user.name),
      orderBy('fecha', 'desc')
    );

    onSnapshot(citasQuery, (querySnapshot) => {
      const citas = [];
      querySnapshot.forEach((doc) => {
        citas.push(doc.data());
      });
      console.log(citas);
      this.citas = citas;
      this.loading = false;
    }, (error) => {
      console.error('Error obteniendo citas:', error);
      this.loading = false; // Manejo básico de errores
    });
  }

// Obtiene todas las citas pendientes para la próxima semana
  getCitasPendientesSemanales(): Cita[] {
    const now = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(now.getDate() + 7);

    return this.citas.filter(cita => {
      const fechaCita = new Date(`${cita.fecha}T${cita.hora}:00`);
      return fechaCita >= now && fechaCita <= oneWeekLater;
    });
  }

  // Genera el reporte en formato PDF
  generarReporteCitasPendientesSemanales() {
    const citasPendientesSemanales = this.getCitasPendientesSemanales();

    // Crear el contenido del PDF usando pdfMake
    const pdfDefinition = {
      content: [
        { text: 'Reporte de Citas Pendientes Semanales', style: 'header' },
        { text: '\n' }, // Espacio en blanco

        // Iterar sobre cada cita pendiente y crear un bloque de información
        ...citasPendientesSemanales.map(cita => [
          { text: 'Fecha: ' + cita.fecha, style: 'subheader' },
          { text: 'Hora: ' + cita.hora },
          { text: 'DNI: ' + cita.dni },
          { text: 'Nombre Paciente: ' + cita.name },
          { text: 'Estado: ' + this.citaEstado(cita) },
          { text: '\n' } // Espacio en blanco entre cada cita
        ])
      ],
      styles: {
        header: { fontSize: 18, bold: true },
        subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] }
      }
    };

    // Generar el PDF usando pdfMake
    pdfMake.createPdf(pdfDefinition).open();
  }



}