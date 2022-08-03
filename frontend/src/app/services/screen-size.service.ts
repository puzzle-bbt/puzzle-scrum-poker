import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private readonly MIN_SCREEN_WIDTH: number = 768;
  private _currentCardValue: string = "";

  get currentCardValue(): string {
    console.log("get: " + this._currentCardValue)
    return this._currentCardValue;
  }

  set currentCardValue(value: string) {
    console.log("set: " + value)
    this._currentCardValue = value;
  }

  public isDesktopSize(width: number) {
    return width > this.MIN_SCREEN_WIDTH;
  }
}
