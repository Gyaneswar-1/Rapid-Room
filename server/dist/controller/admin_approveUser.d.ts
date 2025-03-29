import { Request, Response } from "express";
/**
 * Approve a user account by ID
 * @route PUT /api/admin/users/:userId/approve
 * @access Admin only
 */
export declare const admin_approveUser: (req: Request | any, res: Response | any) => Promise<any>;
export default admin_approveUser;
