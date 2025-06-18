import { dbContext } from "../db/DbContext.js";


class BugsService {
  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData);
    await bug.populate('creator');
    return bug;
  }

  async getAllBugs() {
    const bugs = await dbContext.Bugs.find();
    return bugs;
  }

}

export const bugsService = new BugsService();