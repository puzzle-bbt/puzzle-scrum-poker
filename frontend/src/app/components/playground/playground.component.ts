import { Component, OnInit } from '@angular/core';
import {CacheService} from "../../services/cache.service";

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  constructor(private cacheService: CacheService) { }

  ngOnInit(): void {
      console.log(this.cacheService.isTablemaster);
      if (!this.cacheService.isTablemaster) {
          const element = <HTMLElement> document.getElementsByClassName('middleButton')[0];
          element.style.display = 'none';
      }
  }

}
