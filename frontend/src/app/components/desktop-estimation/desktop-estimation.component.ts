import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PokerGameService} from '../../services/poker-game.service';
import {BackendMessengerService} from '../../services/backend-messenger.service';
import {BehaviorSubject} from "rxjs";
import {Game} from "../../models/model";
import {ScreenSizeService} from "../../services/screen-size.service";

@Component({
  selector: 'app-desktop-estimation',
  templateUrl: './desktop-estimation.component.html',
  styleUrls: ['./desktop-estimation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopEstimationComponent implements OnInit {

  @ViewChild('cardContainerFront')
  cardFrontContainerDiv?: ElementRef<HTMLDivElement>;
  public roundName?: string;
  public isGameRunning?: boolean;
  game$: BehaviorSubject<Game> = this.pokerService.game$;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public pokerService: PokerGameService,
    private messenger: BackendMessengerService,
    private _screenSizeService: ScreenSizeService
  ) {

  }

  private static stringToSvgElement(str: string): SVGElement {
    let ele = document.createElement('div');
    ele.innerHTML = str;
    return ele.firstElementChild as SVGElement;
  }


  ngOnInit(): void {
    console.log("tasdfasdfa ")
    let frontCards = document.getElementById('cardContainerFront');
    let backCards = document.getElementById('cardContainerBack');
    if (this.pokerService.game$.value.isGameRunning) {
      frontCards!.classList.add("visible");
      frontCards!.classList.remove("hidden");
      backCards!.classList.add("hidden");
      backCards!.classList.remove("visible");
    } else {
      frontCards!.classList.add("hidden");
      frontCards!.classList.remove("visible");
      backCards!.classList.add("visible");
      backCards!.classList.remove("hidden");
    }

    this.messenger.subscribe((message) => {
      if (message.includes('gameStart') || message.includes('gameOver')) {
        this.isGameRunning = this.pokerService.game$.value.isGameRunning;
        this.turnCards();
        this.refresh();
      }
    });
    this.messenger.subscribe((message) => {
      if (message.includes('RefreshPlayer')) {
        this.refresh();
      }
    });

    this.refresh();
    this.addCards();
  }

  public resetCards() {
    let cardCollection = this.cardFrontContainerDiv!.nativeElement.querySelectorAll('.card');
    cardCollection.forEach(card => card.classList.remove('selectedcard'));
  }


  public turnCards() {
    let frontCards = document.getElementById('cardContainerFront');
    let backCards = document.getElementById('cardContainerBack');

    if (!this.pokerService.game$.value.isGameRunning) {
      backCards!.classList.add('visible');
      backCards!.classList.remove('hidden');
      frontCards!.classList.add('hidden');
      frontCards!.classList.remove('visible');
    } else {
      this.resetCards();
      backCards!.classList.add('hidden');
      backCards!.classList.remove('visible');
      frontCards!.classList.add('visible');
      frontCards!.classList.remove('hidden');
    }
  }

  public refresh() {
    let frontCards = document.getElementById('cardContainerFront');
    let backCards = document.getElementById('cardContainerBack');

    if (!this.game$.value.me?.playing) {
      frontCards!.classList.add('hidden');
      frontCards!.classList.remove('visible');
      backCards!.classList.add('hidden');
      backCards!.classList.remove('visible');
    } else {
      if (this.game$.value.isGameRunning) {
        frontCards!.classList.add('visible');
        frontCards!.classList.remove('hidden');
      } else {
        backCards!.classList.add('visible');
        backCards!.classList.remove('hidden');
      }
    }
  }

  public addCards(svgFilename: string = 'card_front.svg') {
    this.pokerService.getCardSvg(svgFilename).subscribe(
      (data: string) => {
        for (let i in this.pokerService.selectableValues) {
          let id = Number(i) + 1;
          let prefix = 'card-';
          let fullId = prefix + id;
          this.addSvgToContainer(DesktopEstimationComponent.stringToSvgElement(data), fullId, this.pokerService.selectableValues[i].toString())
        }
        this.addSvgToContainer(DesktopEstimationComponent.stringToSvgElement(data), 'card-' + this.pokerService.selectableValues.length + 1, '?')
        this.selectCardByValue(this._screenSizeService.currentCardValue);
      });
  }

  public addSvgToContainer(svg: SVGElement, cardId: string, storyPoints: string): void {
    svg.setAttribute('id', cardId);
    svg.setAttribute('storyPoint', storyPoints);
    svg.querySelector('#cardText')!.innerHTML = storyPoints;
    svg.querySelector('#cardText')!.setAttribute('style', 'font-size: 30px');
    svg.classList.add('card');

    svg.addEventListener('click', () => {
      this.selectCard(svg, storyPoints)
    })

    this.cardFrontContainerDiv!.nativeElement.append(svg);
    this.changeDetectorRef.markForCheck();
  }

  public getAverage() {
    this.pokerService.getAverage(this.pokerService.game$.value.gameKey).subscribe();
  }

  private selectCardByValue(selectionValue: string) {
    if (selectionValue != "") {
      let id = "card-";
      if (selectionValue == "?") {
        id += this.pokerService.selectableValues.length
      } else {
        id += this.pokerService.selectableValues.indexOf(Number(selectionValue)) + 1
      }
      let targetCard = document.getElementById(id) as unknown as SVGElement;
      console.log("id: \"" + id + "\"")
      this.resetCards();
      if (!targetCard.classList.contains('selectedcard')) {
        targetCard.classList.add('selectedcard');
      }
    }
  }

  private selectCard(svg: SVGElement, storyPoints: string) {
    this.resetCards();
    if (!svg.classList.contains('selectedcard')) {
      svg.classList.add('selectedcard');
      this.pokerService.setSelectedCard(this.pokerService.game$.value.gameKey, this.pokerService.game$.value.me!.id, storyPoints).subscribe();
      this._screenSizeService.currentCardValue = storyPoints;
    }
  }
}
