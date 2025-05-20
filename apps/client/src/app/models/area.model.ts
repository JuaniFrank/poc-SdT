export class Area {
    id!: number;
    title!: string;
    color!: string;

    constructor(data: Partial<Area> = {}) {
        Object.assign(this, data);
    }
}

export class AreaQ extends Area {
    quantity: number = 0;

    constructor(data: Partial<AreaQ> = {}) {
        super(data);
        Object.assign(this, data);
    }
}

export interface AreaIn {
    id: number;
    title: string;
    color: string;
}