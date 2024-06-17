import React, { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {
  const [settings, setSettings] = useState([]);
  const [newSetting, setNewSetting] = useState({
    name: "",
    type: "text",
    value: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get("http://localhost:4044/settings");
      setSettings(response.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const handleAddSetting = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4044/settings",
        newSetting
      );
      setSettings([...settings, response.data]);
      setNewSetting({ name: "", type: "text", value: "" });
    } catch (error) {
      console.error("Error adding setting:", error);
    }
  };

  const handleDeleteSetting = async (id) => {
    try {
      await axios.delete(`http://localhost:4044/settings/${id}`);
      setSettings(settings.filter((setting) => setting.id !== id));
    } catch (error) {
      console.error("Error deleting setting:", error);
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newSetting.name}
          onChange={(e) =>
            setNewSetting({ ...newSetting, name: e.target.value })
          }
        />
        <select
          value={newSetting.type}
          onChange={(e) =>
            setNewSetting({ ...newSetting, type: e.target.value })
          }
        >
          <option value="text">Text</option>
          <option value="checkbox">Checkbox</option>
          <option value="file">File</option>
          <option value="list">List</option>
          <option value="textarea">Text Area</option>
        </select>
        <select
          value={newSetting.value}
          onChange={(e) =>
            setNewSetting({ ...newSetting, value: e.target.value })
          }
        >
          <option value="">Select value</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <button onClick={handleAddSetting}>Add Setting</button>
      </div>
      <ul>
        {settings.map((setting) => (
          <li key={setting.id}>
            {setting.name} ({setting.type}): {setting.value}
            <button onClick={() => handleDeleteSetting(setting.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Settings;
