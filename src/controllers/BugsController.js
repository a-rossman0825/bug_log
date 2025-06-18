import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";


export class BugsController extends BaseController {
  constructor() {
    super('api/bugs'),
    this.router
    .get('', this.getBugById)
  }


  /**
 * @param {import ("express").Request } req
 * @param {import("express").Response } res
 * @param {import("express").NextFunction} next
 */
  async getBugById(req, res, next) {
    try {
      const bugId = req.params.bugId;
      const bug = await bugsService.getBugById(bugId);
    } catch (error) {
      new (error)
    }
  }
}