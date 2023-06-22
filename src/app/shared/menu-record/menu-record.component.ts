import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-record',
  templateUrl: './menu-record.component.html',
  styleUrls: ['./menu-record.component.scss']
})
export class MenuRecordComponent {
  @Output() menuDataEmitter = new EventEmitter();

  closeRecord() {
    this.menuDataEmitter.emit({type:"closeMenuData"});
  }
}
