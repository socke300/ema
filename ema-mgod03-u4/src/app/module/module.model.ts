export class Module {
    name: String;
    nr: String;
    crp: number;


    constructor(moduleNr?: String, moduleName?: String, crp?: number) {
        this.name = moduleName;
        this.nr = moduleNr;
        this.crp = crp;
    }
}