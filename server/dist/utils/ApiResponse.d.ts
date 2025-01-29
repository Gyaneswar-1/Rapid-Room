export declare class ApiResponse extends Response {
    success: boolean;
    data: object;
    customStatus: string;
    message: string;
    statusCode: number;
    constructor(success?: boolean, data?: object, customStatus?: string, message?: string, statusCode?: number);
}
