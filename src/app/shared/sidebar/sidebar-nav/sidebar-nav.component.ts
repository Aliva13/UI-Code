import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent {
  public sidebarData: any;
  public activeMenu = 'voyages';
  public menuCollapse: boolean = false;
  public showMenuInfo: boolean = false;
  public showMenuRecord: boolean = false;
  constructor(private http: HttpClient, public _router: Router) { };

  ngOnInit() {
    this.http.get('assets/json/sidebar.json').subscribe(response => {
      this.sidebarData = response['sidebarData'];
      console.log("Data", response);
    });

  }
  /**
   * 
   * @param item  clicked item
   */
  itemClick(item) {
    try {

    } catch (error) {
      console.log(error)
    }
  }
  //click function for the toggle button
  toggleClick() {
    try {
      let elem = document.getElementById("col-1");
      let sidebar = document.getElementById("sidebar");
      if (elem.classList.contains('shrink')) {
        elem.classList.remove("shrink");
      }
      else {
        elem.classList.add("shrink");
        setTimeout(() => {
          var testDivs = document.querySelectorAll('.menu-label');  // for handling the shrink functionality on sidebar
          testDivs.forEach(function (div) {
            div.classList.add('d-block-text');
          });
        }, 300);
      }
    } catch (error) {
      console.log(error)
    }
  }
  //to show the active tab
  checkActiveRoute(route) {
    try {
      if (this._router.url == route) {
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      console.log(error)
    }
  }
  routeToPage(route: string) {
    try {
      this.activeMenu = route;
      this._router.navigate(["/app/" + route]);
    } catch (error) {
      console.log(error)
    }
  }
  onCardClick(id: string) {
    try {
      this.showMenuInfo = true;
    } catch (error) {
      console.log(error)
    }
  }
  menuDataEmitter(event: any) {
    if (event.type === 'closeMenuData') {
      this.showMenuInfo = false;
    } else if (event.type === 'closeMenuRecord') {
      this.showMenuRecord = false;
    } else if (event.type === 'showMenuRecord') {
      this.showMenuRecord = true;
    }
  }
}
