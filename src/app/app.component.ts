import {Component} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CrowdGachon';
  alertClose = false;
  alertType: string;
  alertMessage: string;
  alertContent = new Subject<string>();

  constructor() {
    setTimeout(() => this.alertClose = true, 20000);
    this.alertContent.subscribe((message) => this.alertMessage = message);
    this.alertContent.pipe(
      debounceTime(5000)
    ).subscribe(() => this.alertMessage = null);
    library.add(fab);
  }

  displayAlert(type) {
    if (type === 'signin') {
      this.alertType = 'warning';
      this.alertContent.next('로그인해주세요!!');
    }
  }
}
