import httpStatus from "http-status";
import { errorResponse, successResponse } from "../helpers";
import { commonService } from "../services";
import { User } from "../models";

export const uploadS3 = async (req, res) => {
    try {
      let data = await commonService.uploadS3(req.file, req.body.folderName);
      return successResponse(req, res, data);
    } catch (error) {
      console.log("err", error);
      return errorResponse(
        req,
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        error.message
      );
    }
  };
export const uploadCloudinary = async (req, res) => {
    try {
      let data = await commonService.uploadCloudinary(req.file,req.body.folderName);
      return successResponse(req, res, data);
    } catch (error) {
      console.log("err", error);
      return errorResponse(
        req,
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        error.message
      );
    }
  };
  
  export const revokeAccessToken = async (req, res) => {
    try {
      let data = await commonService.revokeAccessToken(req.body.refreshToken);
      return successResponse(req, res, data);
    } catch (error) {
      console.log("err", error);
      return errorResponse(
        req,
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        error.message
      );
    }
  };
  
  
  export const paymentSuccess = async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      if (!user || user.cart <= 0) {
        return errorResponse(req, res, httpStatus.NOT_FOUND, "Invalid user");
      }
      user.orders = user.orders.concat(user.cart);
      user.cart = [];
      await user.save();
      res.redirect("http://localhost:5174/success")
    } catch (error) {
      console.log("err", error);
      return errorResponse(
        req,
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        error.message
      );
    }
  };
  
  