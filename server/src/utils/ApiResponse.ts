import { Response } from "express";
export class ApiResponse{
    success: boolean;
    data: object;
    status: string;
    message: string;
    statusCode: number;

    constructor(
        success:boolean = true,
        data: object = {},
        status: string = 'OK',
        message: string = 'success!',
        statusCode: number = 200
    ) {
        this.success = success;
        this.data = data;
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
    }
}