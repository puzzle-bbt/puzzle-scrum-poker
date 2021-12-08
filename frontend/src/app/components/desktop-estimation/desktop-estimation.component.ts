import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PokerGameService} from "../../services/poker-game.service";

@Component({
  selector: 'app-desktop-estimation',
  templateUrl: './desktop-estimation.component.html',
  styleUrls: ['./desktop-estimation.component.scss']
})
export class DesktopEstimationComponent implements OnInit {

    @ViewChild('cardContainer')
    cardContainerDiv?: ElementRef<HTMLDivElement>;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private pokerService: PokerGameService
        ) {}

    ngOnInit(): void {
        this.addCards();
    }

    private addCards(svgFilename: string = 'card_front.svg') {
        this.pokerService.getCardSvg(svgFilename).subscribe(
            (data: string) => {
                this.addSvgToContainer(this.stringToSvgElement(data), 'card-1', '1')
                this.addSvgToContainer(this.stringToSvgElement(data), 'card-2', '2')
                this.addSvgToContainer(this.stringToSvgElement(data), 'card-3', '3')
                this.addSvgToContainer(this.stringToSvgElement(data), 'card-4', '5')
                this.addSvgToContainer(this.stringToSvgElement(data), 'card-5', '8')
                this.addSvgToContainer(this.stringToSvgElement(data), 'card-6', '13')
                this.addSvgToContainer(this.stringToSvgElement(data), 'card-7', '21')
                this.addSvgToContainer(this.stringToSvgElement(data), 'card-8', '?')
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
        svg.classList.add("card");

        svg.addEventListener('click', (event)=>{
            this.resetCards();
            if (!svg.classList.contains("selectedcard")) {
                svg.classList.add("selectedcard");
                this.pokerService.setSelectedCard(this.pokerService.gamekey!, this.pokerService.id!, storyPoints).subscribe();
            }
        })

        this.cardContainerDiv!.nativeElement.append(svg);
        this.changeDetectorRef.markForCheck();
    }

    public resetCards() {
        let cardCollection = this.cardContainerDiv!.nativeElement.querySelectorAll(".card");
        cardCollection.forEach(card => card.classList.remove("selectedcard"));
    }

}
