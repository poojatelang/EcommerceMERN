import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Button, Box } from "@mui/material";

const ImageUploadField = ({ control, name, currentImage, setValue }) => {
  useEffect(() => {
    if (currentImage) {
      setValue("image", currentImage);
    }
  }, [currentImage, setValue, name]);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Box>
          {currentImage && (
            <Box sx={{ mb: 2 }}>
              <img
                src={`http://localhost:5000/${currentImage}`}
                alt="Current"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </Box>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files[0];
              onChange(file);
            }}
            style={{ display: "none" }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span" color="primary">
              Upload Image
            </Button>
          </label>
          {value && (
            <div>
              <p>Selected File: {value.name}</p>
            </div>
          )}
        </Box>
      )}
    />
  );
};

export default ImageUploadField;
