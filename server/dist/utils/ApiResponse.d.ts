export declare class ApiResponse extends Response {
    success: boolean;
    data: object;
    customstatus: string;
    message: string;
    statusCode: number;
    constructor(success: boolean | undefined, data: object | undefined, customstatus: string, message?: string, statusCode?: number);
}
