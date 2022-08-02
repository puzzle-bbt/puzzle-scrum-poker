import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  currentCardValue: string = "0";
  private sizeSubject: Subject<number> = new Subject<number>();

  public isDesktopSize(width:number) {
    return width > 768;
  }

  public getSize() {
    return this.sizeSubject.asObservable()
  }

  public setSize(value: number) {
    console.log(value)
    this.sizeSubject.next(value);
  }
}
