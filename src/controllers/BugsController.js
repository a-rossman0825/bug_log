import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";


export class BugsController extends BaseController {
  constructor() {
    super('api/bugs'),
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createBug)
    .get('', this.getAllBugs)
    .get('/:bugId', this.getBugById)
    .put('/:bugId', this.updateBug);
  }


  /**
 * @param {import ("express").Request } req
 * @param {import("express").Response } res
 * @param {import("express").NextFunction} next
 */
  async createBug(req, res, next) {
    try {
      const userInfo = req.userInfo;
      const bugData = req.body;
      bugData.creatorId = userInfo.id;
      const bug = await bugsService.createBug(bugData);
      res.send(bug);
    } catch (error) {
      next(error);
    }
  }

/**
 * @param {import ("express").Request } req
 * @param {import("express").Response } res
 * @param {import("express").NextFunction} next
 */
  async getAllBugs(req, res, next) {
    try {
      const bugs = await bugsService.getAllBugs();
      res.send(bugs);
    } catch (error) {
      next(error)
    }
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
      res.send(bug);
    } catch (error) {
      next(error);
    }
  }

  async updateBug(req, res, next) {
    try {
      const bugId = req.params.bugId;
      const updateData = req.body;
      const userInfo = req.userInfo;
      const bug = await bugsService.updateBug(bugId, updateData, userInfo);
      res.send(bug);
    } catch (error) {
      next(error)
    }
  }

}