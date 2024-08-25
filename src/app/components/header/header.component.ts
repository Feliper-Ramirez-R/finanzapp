/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {

  @Input() tittle: string = '';


}
