import httpStatus from 'http-status';
import { jwtVerify } from '../config/authentication';
import { userService } from '../services';
import { errorResponse } from '../helpers';

export const isAuthorized = async (req, res, next) => {
	try {
        let {headers:{authorization}} = req;
		if (authorization) {
            const token = jwtVerify(authorization.replace("Bearer ",''))
            if (!token) {
                return errorResponse( req, res, httpStatus.UNAUTHORIZED, 'Token Expired or Invalid');
            }
            const user= await userService.getById(token._id);
        
			if (!user) {
				return errorResponse( req, res, httpStatus.UNAUTHORIZED, 'User is not found in system');
			}
			req.user = user;
			return next();
		}
		return errorResponse( req, res, httpStatus.UNAUTHORIZED, 'Incorrect token is provided, try re-login');
	} catch (error) {
		return errorResponse( req, res, httpStatus.UNAUTHORIZED, 'Incorrect token is provided, try re-login');
	}
};

export const isAdminAuth = async (req, res, next) => {
	try {
        let {headers:{authorization}} = req;
		if (authorization) {
            const token = jwtVerify(authorization.replace("Bearer ",''))
            if (!token) {
                return errorResponse( req, res, httpStatus.UNAUTHORIZED, 'Token Expired or Invalid');
            }
            const user= await userService.getById(token._id);
			if (!user || (user && !["Admin"].includes(user.role))) {
                if( !["Admin"].includes(user.role))  return errorResponse( req, res, httpStatus.UNAUTHORIZED, 'Only Admin can access this route');
				return errorResponse( req, res, httpStatus.UNAUTHORIZED, 'User is not found in system');
			}
			req.user = user;
			return next();
		}
		return errorResponse( req, res, httpStatus.UNAUTHORIZED, 'Incorrect token is provided, try re-login');
	} catch (error) {
		return errorResponse( req, res, httpStatus.UNAUTHORIZED, 'Incorrect token is provided, try re-login');
	}
};