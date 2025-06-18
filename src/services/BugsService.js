import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";


class BugsService {

  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId).populate('creator', 'name picture');
    if (bug == null) {
      throw new BadRequest(`No bug found at Id of: ${bugId}`);
    }
    return bug;
  }
  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData);
    await bug.populate('creator');
    return bug;
  }

  async getAllBugs() {
    const bugs = await dbContext.Bugs.find()
    return bugs;
  }
  

}

export const bugsService = new BugsService();