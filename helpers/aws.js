import AWS from "aws-sdk";
const timeoutMs = 240000; 
AWS.config.update({
  accessKeyId:"######",
  secretAccessKey: "#####",
  region: "us-east-1",
  httpOptions: {
    timeout: timeoutMs // Set the timeout for HTTP requests
  }
});

const bucketName = 'chat'; //double check the bucket name and its existance
const s3 = new AWS.S3();


export const uploadS3 = async (filePath, fileStream) => {
    try {
      const folderPath = filePath.substring(0, filePath.lastIndexOf('/'));
      const folderParams = {
        Bucket: bucketName,
        Prefix: folderPath
      };
      console.log("folderExists", filePath, bucketName, folderPath)
      const folderExists = await s3.listObjectsV2(folderParams).promise();
      console.log("folderExists", folderExists)
      if (!folderExists.Contents.length) {
        const folderParams = {
          Bucket: bucketName,
          Key: folderPath + '/'
        };
        await s3.putObject(folderParams).promise();
      }
      const uploadParams = {
        Bucket: bucketName,
        Key: filePath,
        Body: fileStream,
        ACL:'public-read'
      };
      let data = await s3.upload(uploadParams).promise();
  
      console.log('File uploaded successfully!');
      return data?.Location;
    } catch (err) {
      console.error('Error uploading file:', err);
      throw err;
    }
}
  
  