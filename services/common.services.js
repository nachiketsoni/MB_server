import * as AWS from '../helpers/aws'
import * as Cloundinary from '../helpers/cloudinary'
import {generateUniqueToken} from '../config'
import fs from 'fs'
import path from 'path';
import { GenerateAccessToken, jwtVerify } from '../config/authentication';
import { User } from '../models';
export const uploadS3 = async (file, folder_name) => {
    try {
      let uploadedFile;
      const filePath = file.path;
      let uniqueId = generateUniqueToken();
      let newFileName = `${folder_name}/${uniqueId}_${file.originalname.replace(
        / /g,
        "_"
      )}`;
      let fileName = `uploads/${newFileName}`;
      if (!fs.existsSync(`uploads/${folder_name}`)) {
        fs.mkdirSync(`uploads/${folder_name}`);
      }
  
      let fileStream = fs.readFileSync(path.join(__dirname, "../", filePath));
      uploadedFile = await AWS.uploadS3(newFileName, fileStream);
      fs.unlinkSync(filePath);

      return uploadedFile;
    } catch (error) {
      console.log("errorr uploadFile", error);
      throw error;
    }
  };
export const uploadCloudinary = async (file, folder_name) => {
    
    try {
      let uploadedFile;
      const filePath = file.path;
      let newFilePath = `${folder_name}`;
      uploadedFile = await Cloundinary.uploadCloudinary(newFilePath, filePath);

      fs.unlinkSync(filePath);

      return uploadedFile;
    } catch (error) {
      console.log("errorr uploadFile", error);
      throw error;
    }
  };

  export const revokeAccessToken = async (token) => {
    try {
       const payload = jwtVerify(token)
       if (!payload) {
        throw new Error("Token is Expired or Invalid");
       }
       const user = await User.findOne({ _id: payload._id });
       if (!user) {
        throw new Error("User not found");
       }
       const accessToken = GenerateAccessToken({email: user.email, _id: user._id});
        
      return accessToken;
    } catch (error) {
      console.log("error revokeAccessToken", error);
      throw error;
    }
  };