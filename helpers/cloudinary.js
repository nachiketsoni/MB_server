import cloudinary from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const uploadCloudinary = async (newFilePath, filePath) => {
    console.log(newFilePath)
    try {
        const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
            filePath,
            {
              folder: process.env.NODE_ENV+"/"+newFilePath,
              fetch_format: "webp",
              quality: "50",
            }
          );
      console.log('File uploaded successfully!');
      return secure_url;
    } catch (err) {
      console.error('Error uploading file:', err);
      throw err;
    }
}