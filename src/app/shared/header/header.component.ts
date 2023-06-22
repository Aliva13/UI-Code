import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '../toastr/toaster.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public fullScreenActive: any = false;
  public elem: any;
  public themes: any = {
    'default-skin': {
      theme: 'default-skin',
      tableClass: 'ag-theme-alphine',
      label: 'Light Theme'
    },
    'dark-theme': {
      theme: 'dark-theme',
      tableClass: 'ag-theme-dark',
      label: 'Dark Theme'
    }
  };
  public selectedTheme: any = {
    theme: 'default-skin',
    tableClass: 'ag-theme-alphine',
    label: 'Light Theme'
  };

  @HostListener('window:fullscreenchange', ['$event'])
  fullscreenChange($event: any) {
    this.fullScreenActive = this.document.fullscreen;
  }

  constructor(@Inject(DOCUMENT) private document: any, private toasterService: ToasterService, private router: Router) {
  }
  ngOnInit(): void {
    // if (this.router.url) {
    //   for (let eachTab of this.tabs) {
    //     if (this.router.url.includes(eachTab?.route)) {
    //       this.choosenTab = eachTab?.value;
    //     }
    //   }
    // }
    this.elem = document.documentElement;
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.selectedTheme = JSON.parse(theme);
    }
  }
  toggleFullscreen(event: any) {
    try {
      if (!this.fullScreenActive) {
        if (this.elem.requestFullscreen) {
          this.elem.requestFullscreen();
        } else if (this.elem.mozRequestFullScreen) {
          /* Firefox */
          this.elem.mozRequestFullScreen();
        } else if (this.elem.webkitRequestFullscreen) {
          /* Chrome, Safari and Opera */
          this.elem.webkitRequestFullscreen();
        } else if (this.elem.msRequestFullscreen) {
          /* IE/Edge */
          this.elem.msRequestFullscreen();
        }
      } else {
        if (this.document.exitFullscreen) {
          this.document.exitFullscreen();
        } else if (this.document.mozCancelFullScreen) {
          this.document.mozCancelFullScreen();
        } else if (this.document.webkitExitFullscreen) {
          this.document.webkitExitFullscreen();
        } else if (this.document.msExitFullscreen) {
          this.document.msExitFullscreen();
        }
      }

    } catch (error) {
      console.error(error);
    }
  }


  switchTheme(eachTheme: any) {
    document.body.classList.add(eachTheme);
    document.body.classList.remove(this.selectedTheme?.theme);
    this.selectedTheme.theme = eachTheme;

    let themeStyle: any = this.themes['default-skin'];

    if (eachTheme === 'dark-theme') {
      themeStyle = this.themes['dark-theme'];
    }
    localStorage.setItem('theme', JSON.stringify(themeStyle));
  }
  logOut() {
    localStorage.clear()
  }
  ngOnDestroy() {
  }

}

