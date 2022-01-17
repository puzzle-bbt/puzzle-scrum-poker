import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-kickplayer',
  templateUrl: './kickplayer.component.html',
  styleUrls: ['./kickplayer.component.scss']
})
export class KickplayerComponent {

  constructor(private router: Router) {
  }

  public navigateToHome() {
    this.router.navigate(['/onboarding/']);
  }

}
