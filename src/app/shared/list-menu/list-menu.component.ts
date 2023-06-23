import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToasterService } from 'src/app/shared/toastr/toaster.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss']
})
export class ListMenuComponent {
  @Input() menuType: string;
  public activeCard: String = '';
  public itemList: any = [];
  public title = '';
  public filterDropdownList = [];
  public grouByDropdownList = [];
  public formData: any = {};
  public crewName: any = '';
	@Output() clickCardEmitter = new EventEmitter();

  public dataList = [
    "a","b","c","d","e"
  ];
  constructor(private http: HttpClient, private toasterService: ToasterService, private sharedService: SharedService) { };

  async ngOnInit() {
    try {
      this.listData();
      if (this.menuType === 'voyages') {
        this.title = 'Voyages';
        this.filterDropdownList = [
          {
            label: "On Going",
            value: "ongoing"
          },
          {
            label: "Arriving Soon",
            value: "arriving soon"
          },
          {
            label: "Arriving Soon",
            value: "arriving soon"
          }];
      } else if (this.menuType === 'vessels')  {
        this.title = 'Vessels';
        this.filterDropdownList = [
          {
            label:"All vessels",
            value:"allvessels"
          },
          {
            label:"Name in Associate",
            value:"nameinassociate"
          }];
      } else if (this.menuType === 'crew') {
        this.title = 'Crew';
      }
    } catch (error) {
      console.log(error);
    }
  }
  // fetch data for list
  listData() {
    try {
      if (this.menuType) {
        this.http.get('assets/json/' + this.menuType + '.json').subscribe((res: any) => {
          if (res.status === 'OK') {
            this.itemList = res.data;
          } else {
            this.toasterService.toast('error', 'Error', res['message'] || 'Error while fetching data.');
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
  onCardClick(type: string, id: string) {
    try {
      this.activeCard = id;
      if(type === 'voyages'){
        this.sharedService.setClickedCardId(id);
        this.clickCardEmitter.emit(id);
      } else if (type === 'crew') {
        this.clickCardEmitter.emit(this.crewName);
      }
    } catch (error) {
      console.log(error);
    }
  }

  crewMember(object){
    try {
      this.crewName = object.name;
    } catch (error) {
      console.log(error);
    }
  }
}
