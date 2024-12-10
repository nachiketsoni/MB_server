import httpStatus from "http-status";
import { successResponse, errorResponse } from "../helpers";
import {  taskService } from "../services";


export const getWithPagination = async (req, res) => {
  try {
    const { limit, currentPage, sort, } = req.query;
    
    const sortParams = sort ? sort : { updated_at: -1 };

    const data = await taskService.getWithPagination(
      req.query,
      { limit: parseInt(limit?? Number.MAX_SAFE_INTEGER), page: parseInt(currentPage ?? 1) },
      sortParams, 
      req.user
    );

    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(
      req,
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};



export const addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await taskService.addToCart(id , req.user);
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
export const getCart = async (req, res) => {
  try {
    let data = await taskService.getCart(req.user);
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
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await taskService.getById(id , req.user._id);
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

export const create = async (req, res) => {
  try {
    const data = await taskService.create(req.body,req.user);
    return successResponse(req, res, data);
  } catch (error) {
    console.log(error);
    return errorResponse(
      req,
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message,
      error
    );
  }
};

export const update = async (req, res) => {
  try {
    let { id } = req?.params;
    const updatedData = await taskService.update(id, req.body, req.user);
    return successResponse(req, res, updatedData);
  } catch (error) {
    return errorResponse(
      req,
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};


export const deleteByIds = async (req, res) => {
  try {
    let data = await taskService.deleteByIds(req.body.ids);
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
