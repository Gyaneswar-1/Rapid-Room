import { Request, Response } from "express";
/**
 * Reject a user account by ID
 * @route PUT /api/admin/users/:userId/reject
 * @access Admin only
 */
export declare const admin_rejectHost: (req: Request | any, res: Response | any) => Promise<any>;
