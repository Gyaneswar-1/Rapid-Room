export class ApiResponse {
    success;
    data;
    status;
    message;
    statusCode;
    constructor(success = true, data = {}, status = 'OK', message = 'success!', statusCode = 200) {
        this.success = success;
        this.data = data;
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
    }
}
