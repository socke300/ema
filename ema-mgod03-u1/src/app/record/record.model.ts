export class Record {
    private id: number;
    private moduleNr: string;
    private moduleName: string;
    private crp: number;
    private grade: number;
    private halfWeighted: boolean;
    private summerTerm: boolean;
    private year: number;


	constructor($id: number, $moduleNr: string, $moduleName: string, $crp: number, $grade: number, $halfWeighted: boolean, $summerTerm: boolean, $year: number) {
		this.id = $id;
		this.moduleNr = $moduleNr;
		this.moduleName = $moduleName;
		this.crp = $crp;
		this.grade = $grade;
		this.halfWeighted = $halfWeighted;
		this.summerTerm = $summerTerm;
		this.year = $year;
	}


    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Getter $moduleNr
     * @return {string}
     */
	public get $moduleNr(): string {
		return this.moduleNr;
	}

    /**
     * Getter $moduleName
     * @return {string}
     */
	public get $moduleName(): string {
		return this.moduleName;
	}

    /**
     * Getter $crp
     * @return {number}
     */
	public get $crp(): number {
		return this.crp;
	}

    /**
     * Getter $grade
     * @return {number}
     */
	public get $grade(): number {
		return this.grade;
	}

    /**
     * Getter $halfWeighted
     * @return {boolean}
     */
	public get $halfWeighted(): boolean {
		return this.halfWeighted;
	}

    /**
     * Getter $summerTerm
     * @return {boolean}
     */
	public get $summerTerm(): boolean {
		return this.summerTerm;
	}

    /**
     * Getter $year
     * @return {number}
     */
	public get $year(): number {
		return this.year;
	}

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Setter $moduleNr
     * @param {string} value
     */
	public set $moduleNr(value: string) {
		this.moduleNr = value;
	}

    /**
     * Setter $moduleName
     * @param {string} value
     */
	public set $moduleName(value: string) {
		this.moduleName = value;
	}

    /**
     * Setter $crp
     * @param {number} value
     */
	public set $crp(value: number) {
		this.crp = value;
	}

    /**
     * Setter $grade
     * @param {number} value
     */
	public set $grade(value: number) {
		this.grade = value;
	}

    /**
     * Setter $halfWeighted
     * @param {boolean} value
     */
	public set $halfWeighted(value: boolean) {
		this.halfWeighted = value;
	}

    /**
     * Setter $summerTerm
     * @param {boolean} value
     */
	public set $summerTerm(value: boolean) {
		this.summerTerm = value;
	}

    /**
     * Setter $year
     * @param {number} value
     */
	public set $year(value: number) {
		this.year = value;
	}

}