import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {
  private history: string[] = [];

  constructor() { }

  addToHistory(query: string): void {
    this.history.unshift(query);
  }

  getHistory(): string[] {
    return this.history;
  }
}
