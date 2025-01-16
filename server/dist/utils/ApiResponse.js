export class ApiResponse {
    data;
    status;
    message;
    statusCode;
    constructor(data = {}, status = 'OK', message = 'success!', statusCode = 200) {
        this.data = data;
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
    }
}
