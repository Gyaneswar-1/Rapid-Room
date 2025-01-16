export class ApiResponse {
    data: object;
    status: string;
    message: string;
    statusCode: number;

    constructor(
        data: object = {},
        status: string = 'OK',
        message: string = 'success!',
        statusCode: number = 200
    ) {
        this.data = data;
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
    }
}