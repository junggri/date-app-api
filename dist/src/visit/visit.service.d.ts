import { Visit } from "@src/entities/visit";
import { Repository } from "typeorm";
import { Response } from 'express';
import { DateService } from "@src/date/date.service";
import { DashBoardInput } from "@src/hit/input/hit.input";
import { ExternalService } from "@src/externalApi/external.service";
import { VisitInput } from "@src/visit/input/visit.input";
export declare class VisitService {
    private visitRepository;
    private readonly dateService;
    private readonly externalService;
    constructor(visitRepository: Repository<Visit>, dateService: DateService, externalService: ExternalService);
    getVisitDashboard(data: DashBoardInput): Promise<Visit[]>;
    createVisit(res: Response, data: VisitInput): Promise<any>;
    onApplicationBootstrap(): Promise<void>;
}
