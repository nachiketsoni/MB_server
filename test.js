const { uploadS3 } = require('./helpers/aws');

const filePath = 'example.txt';
const fileStream = 'Hello, S3!'; 


uploadS3(filePath, fileStream)
    .then(location => {
        console.log('Upload successful. File location:', location);
    })
    .catch(error => {
        console.error('Upload failed. Error:', error);
    });
