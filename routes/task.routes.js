import express from "express";
import { validate } from "../helpers/custom.validation";
import { isAuthorized } from "../middleware/auth.middleware";
import { commonValidator, taskValidator } from "../validators";
import { taskController } from "../controllers";
const router = express.Router({ mergeParams: true });




// Get All tasks with Pagination
router.route("/")
.post(isAuthorized,validate(taskValidator.createTask), taskController.create)
.get(isAuthorized, validate(commonValidator.getWithPagination), taskController.getWithPagination)
.delete(isAuthorized, taskController.deleteByIds)

// Routes for Operations on a Specific task by ID
router.route("/:id")
  .get(isAuthorized, validate(commonValidator.get), taskController.getById)
  .put(isAuthorized, validate(taskValidator.updateTask), taskController.update)
  .post(isAuthorized,  taskController.addToCart)

router.route("/cart").get(isAuthorized , taskController.getCart)


export default router;