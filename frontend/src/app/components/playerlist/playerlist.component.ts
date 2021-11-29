import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Player} from "../../player";
import {PokerService} from "../../poker.service";

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.scss']
})


export class PlayerListComponent implements OnInit {

     players: Player[] = [];
     splitarray: string[] = [];
     gamekey?: string;
     playerid?: number;
     playerMode?: Object;
     average?: number;


    constructor(private pokerservice: PokerService) { }

    createTablemaster() {
        this.pokerservice.createTablemaster("test", "testg").subscribe((text) => {this.gamekey = text});
    }
    createPlayer() {
        this.splitarray = this.gamekey!.split(",");

        this.pokerservice.createPlayer(this.splitarray[0], "name").subscribe((text) => {this.playerid = text});
    }
    setSelectedCard() {
        this.splitarray = this.gamekey!.split(",");

        this.pokerservice.setSelectedCard(this.splitarray[0], this.playerid!, "3");
    }
    setPlayerMode() {
        this.splitarray = this.gamekey!.split(",");

        this.pokerservice.setPlayerMode(this.splitarray[0], this.playerid!, false);
    }
    getPlayerMode() {
        this.splitarray = this.gamekey!.split(",");

        this.pokerservice.getPlayerMode(this.splitarray[0], this.playerid!).subscribe((text) => {this.playerMode = text});
    }
    getAvergae() {
        this.splitarray = this.gamekey!.split(",");

        this.pokerservice.getAverage(this.splitarray[0]).subscribe((text) => {this.average = text});
    }
    offboarding() {
        this.splitarray = this.gamekey!.split(",");

        this.pokerservice.offboarding(this.splitarray[0], this.playerid!, this.playerMode!);
    }
    kickplayer() {
        this.splitarray = this.gamekey!.split(",");

        this.pokerservice.kickplayer(this.splitarray[0], this.playerid!);
    }

    getplayerscall() {
        this.splitarray = this.gamekey!.split(",");

        this.pokerservice.getPlayers(this.splitarray[0]).subscribe((text) => {this.players = text});
    }

    ngOnInit(): void {
    }
}
