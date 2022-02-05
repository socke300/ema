import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Record } from '../record.model';
import { IonSearchbar } from '@ionic/angular';
import { Statistic } from '../statistic.model';
import { RecordService } from '../record.service';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.page.html',
  styleUrls: ['./record-list.page.scss'],
})

export class RecordListPage {
  records: Record[] = [];
  recordsSearch: Record[] = [];
  searchbarVisible = false;
  private subRecords;

  ionViewWillEnter() {
    this.subRecords = this.recordService.findAllSync()
      .subscribe(records => this.records.splice(0, this.records.length, ...records));
  }

  ionViewDidLeave() {
    this.subRecords.unsubscribe();
  }

  #search: IonSearchbar;
  @ViewChild('search')
  set searchbar(sb: IonSearchbar) {
    if (sb) {
      sb.setFocus();
      this.#search = sb;
    }
  }

  constructor(private router: Router, private recordService: RecordService) {
    recordService.findAll().then(records => this.records.push(...records));
    this.sortRecords();
  }

  createRecord(): void {
    this.router.navigate(['record-detail']);
  }

  async showStats() {
    const Statistic1 = new Statistic(this.records);
    console.log(Statistic1.recordCount);
    console.log(Statistic1.hwCount);
    console.log(Statistic1.sumCrp);
    console.log(Statistic1.crpToEnd);
    console.log(Statistic1.averageGrade);

    const alert = document.createElement('ion-alert');
    alert.header = 'Statistik';
    alert.message = 'Anzahl Module:' + Statistic1.recordCount +
      "<br/>50% Leistungen: " + Statistic1.hwCount +
      "<br/>Summe Crp: " + Statistic1.sumCrp +
      "<br/>Crp bis Ziel: " + Statistic1.crpToEnd +
      "<br/>Durchschnitt: " + Statistic1.averageGrade;
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
    await alert.onDidDismiss();
  }

  averageGrade(){
    const Statistic1 = new Statistic(this.records);
    return Statistic1.averageGrade;
  }

  editRecord(record) {
    this.router.navigate(['record-detail', { id: record.id }]);
  }

  async deleteRecord(record) {
    console.log(record);

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
      this.recordService.delete(record.id)
    }
  }

  shareRecords() {
    let msgText = "Hallo, <br/>";

    Plugins.Share.share({
      title: "Meine Studienleistungen",
      text: msgText,
      dialogTitle: "Leistung teilen"
    }).then(() => console.log("Sharing supported")).catch(reason => console.log("Sharing is not supported"));
  }

  startsearch() {
    this.searchbarVisible = !this.searchbarVisible;
    Object.assign(this.recordsSearch, this.records);
  }

  doSearch(search) {
    this.recordsSearch = [];
    this.records.forEach(element => {
      if (element.moduleName.toLowerCase().includes(search.toLowerCase()) || element.moduleNr.includes(search.toLowerCase())) {
        this.recordsSearch.push(element);
      }
    });
  }

  cancelSearch() {
    this.searchbarVisible = false;
    this.recordsSearch = [];
  }

  sortRecords(){
    this.records.sort((a,b) => a.moduleName.localeCompare(b.moduleName));
  }
}