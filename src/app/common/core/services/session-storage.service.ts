import {Inject, Injectable} from '@angular/core';
import {SESSION_STORAGE, StorageService} from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(
    @Inject(SESSION_STORAGE) private storageService: StorageService) {
  }

  getValue(key) {
    return this.storageService.get(key);
  }

  setValue(key, value) {
    this.storageService.set(key, value);
  }

  removeKey(key) {
    this.storageService.remove(key);
  }

  hasKey(key) {
    return this.storageService.has(key);
  }

}
