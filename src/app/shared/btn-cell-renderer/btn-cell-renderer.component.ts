import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { IParam } from '../interface';

@Component({
  selector: 'app-btn-cell-renderer',
  templateUrl: './btn-cell-renderer.component.html',
  styleUrls: ['./btn-cell-renderer.component.scss']
})
export class BtnCellRendererComponent implements ICellRendererAngularComp {

  public params!: IParam;
  public actions!: any;
  public hidden: boolean = false;
  agInit(params: IParam): void {
    this.params = params;
    this.actions = this.params.actions;
    if (params.hidden instanceof Function) {
      this.hidden = params.hidden({ data: params.node.data });
    }
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick(action: any) {
    if (this.params.onClick instanceof Function) {
      const params = {
        action: action,
        data: this.params.node.data,
        rowIndex: this.params.rowIndex,
      };
      this.params.onClick(params);
    }
  }
}
