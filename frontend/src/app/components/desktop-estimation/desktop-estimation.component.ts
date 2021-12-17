import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PokerGameService } from '../../services/poker-game.service';
import { BackendMessengerService } from '../../services/backend-messenger.service';

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
  public isNotFirstTime?: boolean;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public pokerService: PokerGameService,
    private messenger: BackendMessengerService
  ) {
  }

  private static stringToSvgElement(str: string): SVGElement {
    let ele = document.createElement('div');
    ele.innerHTML = str;
    return ele.firstElementChild as SVGElement;
  }

  ngOnInit(): void {

    this.messenger.subscribe((message) => {
      if (message.includes('gameStart') || message.includes('gameOver')) {
        this.refresh();
        this.isNotFirstTime = true;
      }
    });
    this.isNotFirstTime = false;
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
    this.isGameRunning = this.pokerService.game$.value.isGameRunning;
    this.turnCards();
  }

  private addCards(svgFilename: string = 'card_front.svg') {
    this.pokerService.getCardSvg(svgFilename).subscribe(
      (data: string) => {
        this.addSvgToContainer(DesktopEstimationComponent.stringToSvgElement(data), 'card-1', '1')
        this.addSvgToContainer(DesktopEstimationComponent.stringToSvgElement(data), 'card-2', '2')
        this.addSvgToContainer(DesktopEstimationComponent.stringToSvgElement(data), 'card-3', '3')
        this.addSvgToContainer(DesktopEstimationComponent.stringToSvgElement(data), 'card-4', '5')
        this.addSvgToContainer(DesktopEstimationComponent.stringToSvgElement(data), 'card-5', '8')
        this.addSvgToContainer(DesktopEstimationComponent.stringToSvgElement(data), 'card-6', '13')
        this.addSvgToContainer(DesktopEstimationComponent.stringToSvgElement(data), 'card-7', '21')
        this.addSvgToContainer(DesktopEstimationComponent.stringToSvgElement(data), 'card-8', '?')
      });
  }

  private addSvgToContainer(svg: SVGElement, cardId: string, storyPoints: string): void {
    svg.setAttribute('id', cardId);
    svg.setAttribute('storyPoint', storyPoints);
    svg.querySelector('#cardText')!.innerHTML = storyPoints;
    svg.querySelector('#cardText')!.setAttribute('style', 'font-size: 30px');
    svg.classList.add('card');

    svg.addEventListener('click', () => {
      this.resetCards();
      if (!svg.classList.contains('selectedcard')) {
        svg.classList.add('selectedcard');
        this.pokerService.setSelectedCard(this.pokerService.game$.value.gameKey, this.pokerService.game$.value.me!.id, storyPoints).subscribe();
      }
    })

    this.cardFrontContainerDiv!.nativeElement.append(svg);
    this.changeDetectorRef.markForCheck();
  }

}
