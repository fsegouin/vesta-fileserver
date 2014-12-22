# vesta-fileserver

Node.js fileserver with Express and Multer.

Used in our Vesta project to host images.

# API

#### Usage

POST /api/photo with encoding type "multipart/form-data".

The API will reply with "Error" if file is not a jpg or too big (> 4MB).
Otherwise, it will give you the full URL of the uploaded file.
