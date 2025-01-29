export class ApiResponse extends Response {
    success;
    data;
    customStatus;
    message;
    statusCode;
    constructor(success = true, data = {}, customStatus = 'OK', message = 'success!', statusCode = 200) {
        super(); // Call the parent class constructor
        this.success = success;
        this.data = data;
        this.customStatus = customStatus;
        this.message = message;
        this.statusCode = statusCode;
    }
}
