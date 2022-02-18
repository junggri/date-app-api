import { BaseEntity } from "typeorm";
export declare abstract class Base extends BaseEntity {
    id: number;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
