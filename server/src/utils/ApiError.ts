export class ApiError {
    data?: object;
    status?: string;
    message?: string;
    statusCode?: number;
    constructor(
         data: object = {},
         status: string = 'Error',
         message: string = 'error occured',
         statusCode: number = 500,
    ) {
         this.data = data;
         this.status = status;
         this.message = message;
         this.statusCode = statusCode;
    }
}
