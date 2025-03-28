import { Response } from "express";

export class ApiResponse extends Response {
    success: boolean;
    data: object;
    customstatus: string;
    message: string;
    statusCode: number;

    constructor(
        success: boolean = true,
        data: object = {},
        customstatus: string,
        message: string = 'success!',
        statusCode: number = 200
    ) {
        super(); // Call the parent class constructor
        this.success = success;
        this.data = data;
        this.customstatus = customstatus;
        this.message = message;
        this.statusCode = statusCode;
    }
}