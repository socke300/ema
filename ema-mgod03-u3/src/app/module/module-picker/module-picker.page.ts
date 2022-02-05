import { Component, ViewChild } from '@angular/core';
import { Module } from '../module.model';
import { IonSearchbar, ModalController, NavController } from '@ionic/angular';
import { ModuleService } from '../module.service';

@Component({
  selector: 'app-module-picker',
  templateUrl: './module-picker.page.html',
  styleUrls: ['./module-picker.page.scss'],
})
export class ModulePickerPage {
  modules: Module[] = [];
  filteredModules: Module[] = [];
  searchbarVisible = false;

  #searchbar: IonSearchbar;
  @ViewChild(IonSearchbar)
  set searchbar(sb: IonSearchbar) {
    if (sb) {
      sb.setFocus();
      this.#searchbar = sb;
    }
  }

  constructor(private modalController: ModalController, private moduleService: ModuleService, private navController: NavController) {
    this.modules = moduleService.findAll();
    this.filteredModules = this.modules;
    const timeJSON = localStorage.getItem('time');

    if (timeJSON) {
      if((new Date().getTime() - JSON.parse(timeJSON)) > 86400000){
      localStorage.setItem('time', JSON.stringify(new Date().getTime()));
      this.moduleService.load();
      }
    }else{
      localStorage.setItem('time', JSON.stringify(new Date().getTime()));
      this.moduleService.load();
    }
  }

  startsearch() {
    this.searchbarVisible = !this.searchbarVisible;
  }

  doSearch(search) {
    console.log(this.modules);
    this.filteredModules = [];
    this.modules.forEach(element => {
      if (element.name.toLowerCase().includes(search.toLowerCase())) {
        this.filteredModules.push(element);
      }
    });
  }

  cancelSearch() {
    this.searchbarVisible = false;
    this.filteredModules = [];
  }
}
