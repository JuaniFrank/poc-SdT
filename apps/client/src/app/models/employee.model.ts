export class Employee {
    id!: string;
    name!: string;
    lastName!: string;
    email!: string;
    identityDocument!: string;
    birthDate!: Date;
    isDeveloper!: boolean;
    description!: string;
    areaId!: string;
    createdAt!: Date;
    updatedAt!: Date;
    deleted!: boolean;

    constructor(data: Partial<Employee> = {}) {
        Object.assign(this, data);
    }
}
