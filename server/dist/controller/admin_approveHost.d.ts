import { Request, Response } from "express";
/**
 * Approve a user account by ID
 * @route PUT /api/admin/users/:userId/approve
 * @access Admin only
 */
export declare const admin_approveHost: (req: Request | any, res: Response | any) => Promise<any>;
