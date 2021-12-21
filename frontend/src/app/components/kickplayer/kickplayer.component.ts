import { Component, OnInit } from '@angular/core';
import {BackendMessengerService} from "../../services/backend-messenger.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-kickplayer',
  templateUrl: './kickplayer.component.html',
  styleUrls: ['./kickplayer.component.scss']
})
export class KickplayerComponent implements OnInit {

  constructor(private messenger: BackendMessengerService,
              private router: Router) {
  }

  ngOnInit() {
    this.messenger.subscribe((message) => {
      if (message.includes('YouGotKicked')) {
        console.log("You got kicked");
        this.router.navigate(['/kickplayer']);
      }
    });
  }
  public navigateToHome() {
    window.location.href = window.location.host + '/onboarding/';
  }

}
