import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  public currentCardValue: string = "0";
  private readonly MIN_SCREEN_WIDTH: number = 768;
  private sizeSubject: Subject<number> = new Subject<number>();

  public isDesktopSize(width: number) {
    return width > this.MIN_SCREEN_WIDTH;
  }

  public getSize() {
    return this.sizeSubject.asObservable()
  }

  public setSize(value: number) {
    this.sizeSubject.next(value);
  }
}
