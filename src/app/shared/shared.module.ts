import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AgGridModule } from '@ag-grid-community/angular';
import { ToasterService } from './toastr/toaster.service';
import { HeaderComponent } from './header/header.component';
import { AgGridTableComponent } from './ag-grid-table/ag-grid-table.component';
import { BtnCellRendererComponent } from './btn-cell-renderer/btn-cell-renderer.component';
import { SwitchInputBtnCellRendererComponent } from './switch-input-btn-cell-renderer/switch-input-btn-cell-renderer.component';
import { SelectRendererComponent } from './select-renderer/select-renderer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputfieldRendererComponent } from './inputfield-renderer/inputfield-renderer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import { SidebarNavComponent } from './sidebar/sidebar-nav/sidebar-nav.component';
import { ListMenuComponent } from './list-menu/list-menu.component';
import { MenuDataComponent } from './menu-data/menu-data.component';
import { MenuRecordComponent } from './menu-record/menu-record.component';
@NgModule({
  declarations: [
    HeaderComponent,
    AgGridTableComponent,
    BtnCellRendererComponent,
    SelectRendererComponent,
    SwitchInputBtnCellRendererComponent,
    InputfieldRendererComponent,
    SidebarNavComponent,
    ListMenuComponent,
    MenuDataComponent,
    MenuRecordComponent
  ],
  imports: [
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    CommonModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule,
    InfiniteScrollModule
  ],
  exports: [
    HeaderComponent,
    AgGridTableComponent,
    SidebarNavComponent,
    ListMenuComponent
  ],
  providers: [ToastrService, ToasterService],
})
export class SharedModule {
  constructor() {
    const modules = [
      ClientSideRowModelModule,
      InfiniteRowModelModule
    ];
    ModuleRegistry.registerModules(modules);
  }
}
