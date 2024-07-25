import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const TableStructureModal = ({ isOpen, onClose, tableFields }) => {
  console.log(tableFields);
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="table-structure-modal"
      aria-describedby="modal-to-view-table-structure"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Table Structure
        </Typography>

        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Null</th>
                <th>Key</th>
                <th>Default</th>
                <th>Extra</th>
              </tr>
            </thead>
            <tbody>
              {tableFields.map((field, index) => (
                <tr key={index}>
                  <td>{field.fieldName}</td>
                  <td>{field.type}</td>
                  <td>{field.notNull ? "false" : "true"}</td>
                  <td>{field.index}</td>
                  <td>{field.defaultValue ? field.defaultValue : "NULL"}</td>
                  <td>{field.autoIncrement ? "AUTO_INCREMENT" : ""} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default TableStructureModal;
