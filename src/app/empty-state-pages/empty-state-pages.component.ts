import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-empty-state-pages',
  templateUrl: './empty-state-pages.component.html',
  styleUrls: ['./empty-state-pages.component.scss']
})
export class EmptyStatePagesComponent implements OnInit {
  public type:any;
  public status:any = {
    empty_state  : '000',
    unauthorized : '401',
    pagenotfound : '404',
  }
  public emptystate: any=''
  public presentOrigin: any;

  constructor( private _activeRoute: ActivatedRoute, private router: Router) { 
    this.presentOrigin = window.location.origin;
    this._activeRoute.params.subscribe((params) => {
      this.type = params['type']
      const userDetails: any = {};
      if (this.type === '401' && (!userDetails || !userDetails?.user_id || !userDetails?.user_role_permissions || !(Object.keys(userDetails?.user_role_permissions || {})?.length))) {
        this.router.navigate(['login']);
      }
     });
  }

  ngOnInit(): void {
  }

  clear(e: any){
    e.preventDefault();
  }
}
