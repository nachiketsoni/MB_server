import express from "express";
import { validate } from "../../helpers/custom.validation";
import { isAuthorized } from "../../middleware/auth.middleware";
import { commonValidator, userValidator } from "../../validators";
import { userController } from "../../controllers";
const router = express.Router({ mergeParams: true });


// Signup Route
router.route("/signup")
  .post(validate(userValidator.createUser), userController.create);

// Login Route
router.route("/login")
  .post(validate(userValidator.loginUser), userController.login);

// Get All Users with Pagination
router.route("/")
  .get( validate(commonValidator.getWithPagination), userController.getWithPagination)
  .delete(isAuthorized, userController.deleteByIds);

// Routes for Operations on a Specific User by ID
router.route("/:id")
  .get(isAuthorized, validate(commonValidator.get), userController.getById)
  .put(isAuthorized, validate(userValidator.updateUser), userController.update)

router.route("/cart").post(isAuthorized , userController.getCart)
router.route("/checkout").post(isAuthorized , userController.checkout)
router.route("/user").post(isAuthorized , userController.getUser)
router.route("/orders").post(isAuthorized , userController.getOrders)


/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     tags:
 *       - Auth
 *       - User
 *     summary: Register a new user
 *     description: Register a new user by providing necessary details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *                 pattern: "^[0-9]{10}$"
 *               password:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: uri
 *               pincode:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               role:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags:
 *       - Auth
 *       - User
 *     summary: Login User
 *     description: Login User by providing credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 */

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     tags:
 *       - User
 *     summary: Update User
 *     description: Update user details by their unique ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *                 pattern: "^[0-9]{10}$"
 *               password:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: uri
 *               pincode:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               role:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get User by ID
 *     description: Retrieve a single user by their unique ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the user
 *     responses:
 *       200:
 *         description: User retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *                     phone:
 *                       type: string
 *                     avatar:
 *                       type: string
 *                       format: uri
 *                     pincode:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     role:
 *                       type: string
 *                     address:
 *                       type: string
 */

/**
 * @swagger
 * /api/user:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete Users Bulk
 *     description: Delete a user by their unique IDs.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags:
 *       - User
 *     summary: Retrieve a list of users
 *     description: Fetches a paginated list of users with optional dynamic sorting.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users to return per page.
 *       - in: query
 *         name: currentPage
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The current page number.
 *       - in: query
 *         name: sort
 *         required: false
 *         style: deepObject
 *         explode: true
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: number
 *               enum: [1, -1]
 *         description: >
 *           Sorting criteria in the format `{field : order}`. 
 *           - **field**: The field name to sort by (e.g., `_id`, `name`, `email`).
 *           - **order**: `1` for ascending or `-1` for descending.
 *           <br/><br/>
 *           **Examples**:
 *           - `{ "name" : 1 }` sorts by `name` in ascending order.
 *           - `{ "name" : -1 }` sorts by `name` in descending order.
 *     responses:
 *       200:
 *         description: A list of users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                         format: email
 *                       phone:
 *                         type: string
 *                       avatar:
 *                         type: string
 *                         format: uri
 *                       pincode:
 *                         type: string
 *                       city:
 *                         type: string
 *                       state:
 *                         type: string
 *                       role:
 *                         type: string
 *                       address:
 *                         type: string
 */



export default router;