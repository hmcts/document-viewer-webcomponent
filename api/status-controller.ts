import { Request, Response } from "express";

/**
 * Handles requests for the /status endpoint
 */
export class StatusController {

  /**
   * GET /status
   */
  public getStatus(req: Request, res: Response): void {
    res.send({
      "api": "ok",
      "env": process.env
    });
  }

}
