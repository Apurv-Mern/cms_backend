import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "background.paper",
  boxShadow: 24,
  padding: 4,
};

const EditRoleModal = ({
  open,
  handleClose,
  roleName,
  setRoleName,
  handleUpdate,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Edit Role
        </Typography>
        <TextField
          label="Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          sx={{ mt: 2 }}
        >
          Update
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClose}
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default EditRoleModal;
