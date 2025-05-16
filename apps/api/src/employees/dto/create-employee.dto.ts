export class CreateEmployeeDto {
    id: string;
    name: string;
    lastName: string;
    email: string;
    identityDocument: string;
    birthDate: Date;
    isDeveloper: boolean;
    description?: string;
    areaId: string;
    deleted: boolean;
}
