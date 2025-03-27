import { Response } from "express";

export class ApiResponse extends Response {
    success: boolean;
    data: object;
    customstatus: "APPROVED" | "PENDING" | "REJECTED";
    message: string;
    statusCode: number;

    constructor(
        success: boolean = true,
        data: object = {},
        customstatus: "APPROVED" | "PENDING" | "REJECTED" = 'OK',
        message: string = 'success!',
        statusCode: number = 200
    ) {
        super(); // Call the parent class constructor
        this.success = success;
        this.data = data;
        this.customStatus = customStatus;
        this.message = message;
        this.statusCode = statusCode;
    }
}