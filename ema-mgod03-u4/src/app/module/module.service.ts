import { Injectable } from '@angular/core';
import { Module } from './module.model';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ModuleService {
  modules: Module[];

  static CORS_PROXY  = 'https://cors-anywhere.herokuapp.com/';
  static MODULES_URL = ModuleService.CORS_PROXY + 'https://ema-data.firebaseio.com/modules.json';

  constructor(private http: HttpClient) {
    const modulesJSON = localStorage.getItem('modules');
    if (modulesJSON) {
      this.modules = JSON.parse(modulesJSON);
    } else {
      this.modules = [];
      this.modules.push(new Module('CS1019', 'Compilerbau', 6));
      this.save();
    }
  }

  load() {
    const modulesETag = localStorage.getItem('modulesETag');
    this.http.get<Module[]>(ModuleService.MODULES_URL, {
      observe: 'response',
      headers: modulesETag ? { 'If-None-Match': modulesETag } : {}
    }).toPromise().then(
      (response: HttpResponse<Module[]>) => {
        const newModules = response.body;
        this.modules.splice(0, this.modules.length, ...newModules);
        localStorage.setItem('modulesETag', response.headers.get('etag'));
        this.save();
      }
      ,
      (error: HttpErrorResponse) => {
        // error.status == 0   No network, SOP, etc.         
        // error.status == 304 modules.json not modified 
      });
  }

  findAll(): Module[] {
    return this.modules;
  }

  private save(): void {
    localStorage.setItem('modules', JSON.stringify(this.modules));
  }
}
