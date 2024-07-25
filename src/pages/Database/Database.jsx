import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDatabase,
  createDatabase,
  deleteDatabase,
} from "../../redux/Slices/DatabaseSlice";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import TableViewIcon from "@mui/icons-material/TableView";
import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog";
import TableStructureModal from "../../components/TableModalStructure";
import { toast } from "react-toastify";

const Database = () => {
  const dispatch = useDispatch();
  const database = useSelector((state) => state.database.database);
  console.log("dbbbb h yee", database);
  const [isLoad, setIsLoad] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDatabaseTableName, setSelectedDatabaseTableName] =
    useState(null);
  const navigate = useNavigate();

  const handleViewDatabase = (fields) => {
    setSelectedFields(fields);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  //deleteee

  const handleOpenDialog = (tableName) => {
    setSelectedDatabaseTableName(tableName);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDatabaseTableName(null);
  };
  const handleConfirmDelete = () => {
    dispatch(deleteDatabase(selectedDatabaseTableName))
      .then(() => {
        toast.success("Database deleted successfully");
        setIsLoad(true); // Assuming setIsLoad is used to refresh data, adjust as needed
        handleCloseDialog();
      })
      .catch(() => {
        toast.error("Failed to delete database");
        handleCloseDialog();
      });
  };
  const handleClearSearch = () => {
    setFilterTerm("");
  };
  const filteredDatabase = database?.filter((db) => {
    const tableName = db.tableName || "";
    return tableName.toLowerCase().includes(filterTerm.toLowerCase());
  });

  useEffect(() => {
    dispatch(fetchDatabase());
    setIsLoad(true); // Assuming setIsLoad is used to refresh data, adjust as needed
  }, [dispatch]);

  return (
    <>
      {" "}
      <div className="row">
        <div className="col-auto">
          <h3 class="card-header">Existing tables</h3>
        </div>
        <div className="col ms-auto text-end">
          <button
            className="btn btn-dark waves-effect waves-light"
            onClick={() => navigate("/database/create")}
          >
            Create New table
          </button>
        </div>
      </div>
      <div className="filter-box my-3">
        <div className="row g-2 align-items-center">
          <div className="col">
            <div className="form-grp">
              <label>Table Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Filter tables"
                value={filterTerm}
                onChange={(e) => setFilterTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-auto">
            <button
              className="btn btn-dark waves-effect waves-light"
              onClick={handleClearSearch}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>Table Name</th>
              {<th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredDatabase.map((database) => (
              <tr key={database.databaseId}>
                <td>{database.tableName}</td>
                <td>
                  <IconButton
                    aria-label="View table structure"
                    title="View table"
                    onClick={() => handleViewDatabase(database.fields)}
                  >
                    <TableViewIcon style={{ color: "#e3bd3a" }} />
                  </IconButton>

                  <IconButton
                    aria-label="Delete user"
                    title="Delete User"
                    onClick={() => handleOpenDialog(database.tableName)}
                  >
                    <DeleteIcon style={{ color: "#aa1313" }} />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ConfirmDeleteDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          handleConfirm={handleConfirmDelete}
        />

        <TableStructureModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          tableFields={selectedFields}
        />
      </div>
    </>
  );
};

export default Database;
