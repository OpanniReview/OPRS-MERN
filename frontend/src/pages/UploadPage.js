import React, { useState } from "react";
import { Typography, TextField, Button, Container } from "@mui/material";
import Grid from '@mui/material/Grid';

function UploadPage() {
  const [filePath, setFilePath] = useState("");

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Typography variant="h1" gutterBottom style={{ textAlign: "center", textIndent: "20px" }}>
        Conference Details
      </Typography>
      <Typography variant="subtitle1" gutterBottom style={{ fontWeight: "bold" }}>
        Description:
      </Typography>
      <Typography variant="body2" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis commodo nunc vitae ex commodo, non sollicitudin eros ultrices. Fusce non mauris vel velit lobortis auctor.
      </Typography>
      <Typography variant="subtitle1" gutterBottom style={{ fontWeight: "bold" }}>
        Website:
      </Typography>
      <Typography variant="body2" gutterBottom>
        www.exampleconference.com
      </Typography>
      <Typography variant="subtitle1" gutterBottom style={{ fontWeight: "bold" }}>
        Editors-in-chief:
      </Typography>
      <Typography variant="body2" gutterBottom>
        John Doe, Jane Smith
      </Typography>
      <TextField
        id="abstract"
        label="Abstract"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        id="authors"
        label="Authors"
        helperText="Enter author names separated by commas"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
      >
        <input
          accept=".pdf,.docx"
          style={{ display: "none" }}
          id="upload-file"
          multiple
          type="file"
          onChange={(e) => setFilePath(e.target.value)}
        />
        <label htmlFor="upload-file">
          <Button variant="contained" component="span">
            Upload File
          </Button>
        </label>
        <Typography variant="caption">
          {filePath ? filePath.replace('C:\\fakepath\\', '') : ''}
        </Typography>
      </Grid>
    </Container>
  );
}

export default UploadPage;
