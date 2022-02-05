import { Record } from './record.model';

export class Statistic {
    private record: Record[];
    public recordCount: number; 
    public hwCount: number;
    public sumCrp: number;
    public crpToEnd: number;
    public averageGrade:number;

    constructor($record: Record[]) {
        this.record = $record;
        this.recordCount = this.recordCount1(); 
        this.hwCount = this.hwCount1();
        this.sumCrp = this.sumCrp1();
        this.crpToEnd = this.crpToEnd1();
        this.averageGrade = this.averageGrade1();
    }

    public recordCount1() {
        return this.record.length;
    }

    public hwCount1() {
        var count = 0;
        this.record.forEach(element => {
            if (element.$halfWeighted)
                count++;
        });
        return count;
    }

    public sumCrp1() {
        var count = 0;
        this.record.forEach(element => {
            count += element.$crp;
        });
        return count;
    }

    public crpToEnd1() {
        return 180 - this.sumCrp1();
    }

    public averageGrade1() {
        var count = 0;
        var grade = 0;

        this.record.forEach(element => {
            if (element.$halfWeighted) {
                grade += element.$grade*0.5*element.$crp;
                count += 1*0.5*element.$crp;
            } else {
                grade += element.$grade*element.$crp;
                count += 1*element.$crp;
            }
        });

        return count == 0 ? 0 : Math.round(grade/count);
    }

}