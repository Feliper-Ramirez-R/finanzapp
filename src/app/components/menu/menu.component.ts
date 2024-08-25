/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

interface Componente {
  icon: string,
  name: string,
  redirecTo: string,

}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  componentes: Componente[] = [
    {
      icon: 'card-outline',
      name: 'Mis pagos',
      redirecTo: '/pagos'
    },
  ]

  constructor() { }

  ngOnInit() {}

}
