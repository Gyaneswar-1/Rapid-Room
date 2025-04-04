import { NextFunction, Request, Response } from "express";
export declare const authMiddleware: (req: Request | any, res: Response | any, next: NextFunction) => Promise<any>;
