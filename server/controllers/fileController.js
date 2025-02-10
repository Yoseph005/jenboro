import asyncHandler from "express-async-handler";


const uploadFile = asyncHandler(async (req, res) => {

    console.log(req)
    try {
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      // Extract file details
      const { filename, mimetype, size, path } = req.file;
  
      res.json({
        message: "File uploaded successfully",
        file: {
          filename,
          mimetype,
          size,
          path,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "File upload failed", error });
    }
  });
  

  export {
    uploadFile
  }