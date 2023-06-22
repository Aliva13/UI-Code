import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  onListMenuCardClick = new Subject<any>();
  setClickedCardId(id: string) {
    this.onListMenuCardClick.next(id);
}

getClickedCardId(): Observable<any> {
    return this.onListMenuCardClick.asObservable();
}
  constructor() { }
}
