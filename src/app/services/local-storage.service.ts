import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  get(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  set(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // TODO: Nice to have for checkout or just clearing if possible
  clear(): void {
    localStorage.clear();
  }
}
