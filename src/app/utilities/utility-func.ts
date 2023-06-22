import { Injectable } from '@angular/core';

@Injectable()
export class UtilityFunctions {

  constructor() { }

  findNearest(arr: any[], val: any, key?: any) {
    try {
      if (!arr?.length) {
        return;
      }
      // key argument is needed for array of dictionaries.
      let keyCondition = false;
      keyCondition = this.onlyNumbersAndAlphabets(key) || false;
      const nearest = arr?.reduce((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
        return Math.abs((keyCondition ? b[key] : b) - val) < Math.abs((keyCondition ? a[key] : a) - val) ? b : a;
      });
      if (keyCondition) { 
        return nearest?.[key]
      } 
      return nearest;
    } catch (findErr) {
      console.error(findErr);
    }
  }

  onlyNumbersAndAlphabets(val: any) {
    try {
      return (val || !isNaN(val)) && ![null, undefined, false]?.includes(val) || false;
    } catch (valErr) {
      console.error(valErr);
      return false;
    }
  }
}
