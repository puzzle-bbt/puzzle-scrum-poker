import { Component, OnInit } from '@angular/core';
import {CacheService} from "../../services/cache.service";

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

    displayButton: boolean | null = this.cacheService.isTablemaster;

  constructor(private cacheService: CacheService) { }

  ngOnInit(): void {
  }

}
