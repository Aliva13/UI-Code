import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Component, OnInit } from '@angular/core';
import { IParam } from '../interface';

@Component({
  selector: 'app-inputfield-renderer',
  templateUrl: './inputfield-renderer.component.html',
  styleUrls: ['./inputfield-renderer.component.scss']
})
export class InputfieldRendererComponent implements ICellRendererAngularComp {

  public params!: IParam;
  public hidden: boolean = false;
  public settings: any = {};

  agInit(params: IParam): void {
    this.params = params;
    this.settings = this.params.settings;

    if (params.hidden instanceof Function) {
      this.hidden = params.hidden({ data: params.node.data });
    }
  }
  
  refresh(params?: any): boolean {
    return true;
  }

}
