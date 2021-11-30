import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CardService} from "../../services/card.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

    @ViewChild('cardContainer')
    cardContainerDiv?: ElementRef<HTMLDivElement>;

    constructor(
        private cardService: CardService,
        private changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.addCards();
    }

    private addCards(svgFilename: string = 'card_front.svg') {
        this.cardService.getCardSvg(svgFilename).subscribe(
            (data: string) => {

                // TODO

            });
    }

    private stringToSvgElement(str: string): SVGElement {
        let ele = document.createElement("div");
        ele.innerHTML = str;
        return ele.firstElementChild as SVGElement;
    }

    private addSvgToContainer(svg: SVGElement, cardId: string, storyPoints: string): void {
        svg.setAttribute('id', cardId);
        svg.setAttribute('storyPoint', storyPoints);
        svg.querySelector('#cardText')!.innerHTML = storyPoints;

        this.cardContainerDiv!.nativeElement.append(svg);
        this.changeDetectorRef.markForCheck();
    }

    public setSelectedCard(cardId: string) {}

}
