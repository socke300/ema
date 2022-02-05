import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Record } from '../record.model';
import { Statistic } from '../statistic.model';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.page.html',
  styleUrls: ['./record-list.page.scss'],
})

export class RecordListPage {
  records: Record[] = [];

  constructor(private router: Router, private recordService: RecordService) {
    this.records = this.recordService.findAll();
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
}