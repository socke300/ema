import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInput, ModalController, NavController } from '@ionic/angular';
import { RecordService } from '../record.service';
import { Record } from '../record.model';
import {ModulePickerPage} from '../../module/module-picker/module-picker.page'

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.page.html',
  styleUrls: ['./record-detail.page.scss'],
})
export class RecordDetailPage {
  isEditMode = false;
  pageTitle: string;
  record = new Record(0, "", "", 0, 0, false, false, 0);
  years: number[] = [];

  errors: Map<string, string> = new Map<string, string>();

  @ViewChild('moduleNr')
  private moduleNrRef: IonInput;

  constructor(private route: ActivatedRoute, private recordService: RecordService, private navCtrl: NavController, private modalController: ModalController) {
    const recordId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (recordId) {
      this.isEditMode = true;
      Object.assign(this.record, this.recordService.findById(recordId));
      this.pageTitle = 'Leistung bearbeiten';
    } else {
      this.record.year = new Date().getFullYear();
      this.pageTitle = 'Leistung erstellen';
      this.selectModule();
    }
    this.initYears();
  }

  save() {
    this.errors.clear();
    if (!this.record.moduleNr) {
      this.errors.set('moduleNr', 'Modulnummer darf nicht leer sein!');
    }
    if (!this.record.moduleName) {
      this.errors.set('name', 'Name darf nicht leer sein!');
    }
    if (!this.record.crp) {
      this.errors.set('creditpoints', 'Creditpoints darf nicht leer sein!');
    }

    if (this.errors.size === 0) {
      if (this.isEditMode) {
        this.recordService.update(this.record);
      } else {
        this.recordService.persist(this.record);
      } this.navCtrl.pop();
    }
  }

  async deleteRecord() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Achtung!';
    alert.message = "Möchtest du wirklich <br/>die Leistung Löschen?"
    alert.buttons = [
      {
        text: 'Nein',

        role: "Nein"
      },
      {
        text: 'Ja',
        role: 'Ja'
      }];

    document.body.appendChild(alert);
    await alert.present();

    const { role } = await alert.onDidDismiss();

    if (role == "Ja") {
      this.recordService.delete(parseInt(this.route.snapshot.paramMap.get('id'), 10))
      this.navCtrl.pop();
    }
  }

  ionViewDidEnter() {
    if (!this.isEditMode) {
      this.moduleNrRef.setFocus();
    }
  }

  initYears() {
    const currentYear = new Date().getFullYear();
    for (var i = currentYear - 10; i <= currentYear + 10; i++) {
      this.years.push(i);
    }
  }


  async selectModule() { 
    const modal = await this.modalController.create({ 
      component: ModulePickerPage 
    }); 
    await modal.present(); 
    const result = await modal.onDidDismiss(); 
    if (result.data){
    this.record.moduleName = result.data.name;
    this.record.crp = result.data.crp;
    this.record.moduleNr = result.data.nr;
    }
  }
}
