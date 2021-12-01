import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CardService} from "../../services/card.service";
import {Element} from "@angular/compiler";

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
                //TODO: add backend call to set card
            }
        })

        this.cardContainerDiv!.nativeElement.append(svg);
        this.changeDetectorRef.markForCheck();
    }

    public resetCards() {
        let cardCollection = this.cardContainerDiv!.nativeElement.querySelectorAll(".card");
        cardCollection.forEach(card => card.classList.remove("selectedcard"));
    }

    public setSelectedCard(selectedValue:string) {

    }
}
