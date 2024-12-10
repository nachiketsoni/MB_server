import {commonController} from '../controllers'
import express from "express";
import multer from "multer";

const router = express.Router({ mergeParams: true });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname.replace(/:/g, "-"));
    },
  });

const upload = multer({
    storage: storage, // Destination folder to store the uploaded files
  limits: {
    fileSize: 20 * 1024 * 1024, // Maximum file size in bytes (20MB in this example)
  },
});

router.post("/upload/S3", upload.single("file"), commonController.uploadS3);
router.post("/upload",  upload.single("file"),  commonController.uploadCloudinary);
router.route("/revoke").post(commonController.revokeAccessToken);
router.route("/success/:id").get(commonController.paymentSuccess);

/**
 * @swagger
 * /api/revoke:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Revoke Refresh Token
 *     description: Revoke a user's refresh token to invalidate it.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             required:
 *               - refreshToken
 *     responses:
 *       200:
 *         description: Refresh token revoked successfully.
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
 * /upload:
 *   post:
 *     tags:
 *       - Common
 *     summary: Upload a file
 *     description: Upload a file to a specified folder.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - folderName
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to be uploaded.
 *               folderName:
 *                 type: string
 *                 example: "user/avatar"
 *                 description: The destination folder path where the file will be stored.
 */

export default router;