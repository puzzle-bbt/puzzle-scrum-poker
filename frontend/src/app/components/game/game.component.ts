import { Component, OnInit } from '@angular/core';
import {Player} from "../../player";
import {HttpService} from "../../http.service";
import {WebsocketService} from "../../websocket.service";
import {asap} from "rxjs";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

    tableName?: string;
    tablemasterId?: string;
    newPlayerId?: number;
    players?: Player[];
    average?: number;

    constructor(
        private httpService: HttpService,
        private websocketService: WebsocketService) { }


    ngOnInit(): void {
        this.websocketService.openWSConnection(
            () => {}
        );
    }

    ngOnDestroy(): void {
        this.websocketService.closeWSConnection();
    }

    public setSelectedCard(playerId: string, selectedCard: string) {
        this.httpService.setSelectedCard(this.tableName!, +playerId, selectedCard).subscribe(
            (selectedCard) => {}
        );
    }

    public setSelectedCardDesktop(playerId: string, selectedCard: string, event: MouseEvent) {
        var currentElement = event.target;
        console.log(currentElement);
        this.httpService.setSelectedCard(this.tableName!, +playerId, selectedCard).subscribe(
            (selectedCard) => {}
        );
    }

    public addSvgToContainer(playerId: string, selectedCard: string) {
        const cardFront = document.createElement("svg")
        cardFront.textContent = '';
    }

    public cardListener() {
        this.addSvgToContainer("2", "2")
        this.addSvgToContainer("2", "2")
        this.addSvgToContainer("2", "2")
        this.addSvgToContainer("2", "2")
        this.addSvgToContainer("2", "2")
        this.addSvgToContainer("2", "2")
        this.addSvgToContainer("2", "2")
    }

    public sendWSMessage(msg: string) {
        this.websocketService.sendWSMessage(msg);
    }

    /**public showSvgCards(values: number) {
        const svg = jQuery(data).find('svg').clone();
        svg.attr('id', cardId);
        svg.attr('storyPoint', storyPoint);
        $('#cardText', $svg).text(storyPoint);
        $cardContainer.append($svg);
    }
     **/
}
