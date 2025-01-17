export declare class ApiResponse {
    success: boolean;
    data: object;
    status: string;
    message: string;
    statusCode: number;
    constructor(success?: boolean, data?: object, status?: string, message?: string, statusCode?: number);
}
