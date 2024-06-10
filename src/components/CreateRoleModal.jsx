import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const CreateRoleModal = ({ open, handleClose, handleCreate }) => {
  const [roleName, setRoleName] = useState("");

  const handleSubmit = () => {
    handleCreate(roleName);
    setRoleName("");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          backgroundColor: "background.paper",
          boxShadow: 24,
          padding: 4,
        }}
      >
        <h2>Create New Role</h2>
        <TextField
          fullWidth
          label="Role Name"
          variant="outlined"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create Role
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateRoleModal;
