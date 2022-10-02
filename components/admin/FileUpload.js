import { Alert, Button } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";

const FileUpload = forwardRef(({ _ref }) => {
    let [image, setImage] = useState(null);
    useImperativeHandle(_ref, () => ({
        getImage: () => image
    }));

    return (
        !image ? (
            <Button
                variant="contained"
                component="label"
                sx={{ marginBottom: 2 }}
                fullWidth
            >
                Upload image
                <input
                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                    hidden
                />
            </Button>
        ) : <Button variant="contained" color="error" onClick={() => setImage(null)}>delete image</Button>
    );
})

export default FileUpload;