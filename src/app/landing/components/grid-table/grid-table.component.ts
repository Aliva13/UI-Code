import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.scss']
})
export class GridTableComponent {
  public agGridOptions: any = {}
 public loader: any ={table: false};
  public destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient) { }
  aggridEmitter(event: any) {
    try {
      if (!event || !event?.action?.type) {
        return;
      }
      if (event && event?.action?.type) {
        console.log(event);

        switch (event.action.type) {
          case 'addnew':
            break
          case 'edit':
            break;
          case 'delete':
            break;
        }
      }
    } catch (aggridErr) {
      console.error(aggridErr);
    }
  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    try {
      this.loader.table = true;
      this.http.get('assets/json/assetData.json').subscribe((respData: any) => {
        if (respData && respData['status'] === 'success') {
          this.agGridOptions = respData.data;
          this.loader.table = false;
        } else {
          this.loader.table = false;
        }
      }, (error) => {
        this.loader.table = false;
        console.error(error);
      });
    } catch (table_error) {
      this.loader.table = false;
      console.error(table_error)
    }
  }

}
