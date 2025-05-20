export class CreateEmployeeDto {
    name: string;
    lastName?: string;
    email?: string;
    identity_document?: number;
    birth_date?: Date;
    is_developer?: boolean;
    description?: string;
    area_id?: string;
    deleted?: boolean;
}
