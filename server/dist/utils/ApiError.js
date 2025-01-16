export class ApiError {
    data;
    status;
    message;
    statusCode;
    constructor(data = {}, status = 'Error', message = 'error occured', statusCode = 500) {
        this.data = data;
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
    }
}
