export class ApiError {
    success: boolean;
    data?: object;
    status?: string;
    message?: string;
    statusCode?: number;
    constructor(
        success: boolean = false,
        data: object = {},
        status: string = "Error",
        message: string = "error occured",
        statusCode: number = 500,
    ) {
        this.success = success;
        this.data = data;
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
    }
}
