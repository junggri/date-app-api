import { VisitService } from "@src/visit/visit.service";
import { Response } from "express";
import { Visit } from "@src/entities/visit";
import { DashBoardInput } from "@src/hit/input/hit.input";
import { VisitInput } from "@src/visit/input/visit.input";
export declare class VisitResolver {
    private readonly visitService;
    constructor(visitService: VisitService);
    getVisitDashboard(data: DashBoardInput): Promise<Visit[]>;
    createVisit(response: Response, data: VisitInput): Promise<any>;
}
