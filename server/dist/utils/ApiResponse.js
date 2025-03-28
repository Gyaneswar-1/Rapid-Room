export class ApiResponse extends Response {
    success;
    data;
    customstatus;
    message;
    statusCode;
    constructor(success = true, data = {}, customstatus, message = 'success!', statusCode = 200) {
        super(); // Call the parent class constructor
        this.success = success;
        this.data = data;
        this.customstatus = customstatus;
        this.message = message;
        this.statusCode = statusCode;
    }
}
