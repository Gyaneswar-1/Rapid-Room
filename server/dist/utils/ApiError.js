export class ApiError {
    success;
    data;
    status;
    message;
    statusCode;
    constructor(success = false, data = {}, status = "Error", message = "error occured", statusCode = 500) {
        this.success = false;
        this.data = data;
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
    }
}
