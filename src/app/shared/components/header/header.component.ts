import { Component, Input, OnInit, inject } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

 @Input() isModal!:boolean;
 @Input() showMenu!:boolean;
 @Input() title!:string;
 @Input() backButton!: string;
 //== parametro para que se muestre el boton

 utilSvc = inject(UtilsService);

  

  ngOnInit() {}

  dismissModal(){
    this.utilSvc.dismissModal();
  }

}
