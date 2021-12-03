import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
    private _gamekey: string | null = null;

    private _id: number | null = null;

    private _isTablemaster: boolean | null = null;

    constructor() { }

    get gamekey(): string | null {
        return this._gamekey;
    }

    set gamekey(value: string | null) {
        this._gamekey = value;
    }

    get id(): number | null {
        return this._id;
    }

    set id(value: number | null) {
        this._id = value;
    }

    get isTablemaster(): boolean | null {
        return this._isTablemaster;
    }

    set isTablemaster(value: boolean | null) {
        this._isTablemaster = value;
    }

}
