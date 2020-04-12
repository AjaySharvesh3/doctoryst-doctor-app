import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    @Inject(LOCAL_STORAGE) private storageService: StorageService) {
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
