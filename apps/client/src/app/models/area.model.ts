export class Area {
    id!: number;
    title!: string;
    color!: string;
    quantity!: number;

    constructor(data: Partial<Area> = {}) {
        Object.assign(this, data);
    }
}