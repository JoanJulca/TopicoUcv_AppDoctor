import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-main-p',
  templateUrl: './main-p.page.html',
  styleUrls: ['./main-p.page.scss'],
})
export class MainPPage implements OnInit {

  pages =[
    {title:'CITAS PENDIENTES',url:'/main-p/CitasPendientes',icon: 'medical-outline' },
    {title: 'CITAS CONCLUIDAS', url: '/main-p/CitasConcluidas', icon: 'medical-outline'},
    {title:'PERFIL',url:'/main-p/profile',icon:'person-outline'},
    {title:'HISTORIAL',url:'/main-p/reportes',icon:'medical-outline'},

]

 router = inject(Router);
 firebaseSvc = inject(FirebaseService);
 utilsSvc = inject(UtilsService);


 currentPath: string ='';


  ngOnInit() {
    this.router.events.subscribe((event: any)=>{
      if(event?.url) this.currentPath = event.url;
    })
  }


  user(): user {
    return this.utilsSvc.getFromLocalStorage('users');
  }


//cerrar sesion
  singOut(){
    this.firebaseSvc.sigOut();
  }

  constructor() { }



}
