export class CreateEmployeeDto {
    name: string;
    lastName?: string;
    email?: string;
    identityDocument?: number;
    birthDate?: Date;
    isDeveloper?: boolean;
    description?: string;
    areaId?: string;
    deleted?: boolean;
}
