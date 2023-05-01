import { Injectable } from '@angular/core';
// import { Alert } from 'shared';
import { Alert } from 'projects/shared/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  alerts: Alert[] = [];

  newAlert(alert: Alert) {
    this.alerts.push(alert);
  }

  dismissAlert(index: number) {
    this.alerts.splice(index, 1);
  }
}
