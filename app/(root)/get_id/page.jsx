'use client'
import { updateExistingData } from "@/lib/actions/register";
import { useState } from "react";

const page = () => {
  const [driveLink, setDriveLink] = useState("");
  const [fileId, setFileId] = useState("");

  // Function to extract the file ID from the Google Drive link
  const extractFileId = (url) => {
    const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Function to handle the input change
  const handleInputChange = (event) => {
    setDriveLink(event.target.value);
  };

  const handleUpdate = async () => {
    await updateExistingData()
  }

  // Function to handle the extract button click
  const handleExtractClick = () => {
    const id = extractFileId(driveLink);
    if (id) {
      setFileId(id); // Update the file ID state
    } else {
      setFileId(""); // If no valid ID is found, clear the fileId state
      alert("Invalid Google Drive link");
    }
  };

  // Function to copy the file ID to clipboard
  const handleCopyClick = () => {
    if (fileId) {
      navigator.clipboard.writeText(fileId);
      alert("File ID copied to clipboard!");
      setFileId("")
    } else {
      alert("No File ID to copy");
    }
  };
  return (
    <div className="container">
      <h1 className="text-2xl mb-4">Google Drive Link to File ID</h1>

      {/* Input for Google Drive link */}
      <input
        type="text"
        value={driveLink}
        onChange={handleInputChange}
        placeholder="Enter Google Drive link"
        className="p-2 mb-2 border border-gray-300 rounded"
        style={{ width: "80%" }}
      />

      {/* Button to extract the file ID */}
      <button
        onClick={handleExtractClick}
        className="bg-blue-500 text-white p-2 rounded ml-2"
      >
        Extract ID
      </button>
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white p-2 rounded ml-2"
      >
        Update User
      </button>

      {/* Display extracted file ID */}
      {fileId && (
        <div className="mt-4">
          <p className="text-xl">File ID: <span className="font-semibold">{fileId}</span></p>

          {/* Button to copy the file ID */}
          <button
            onClick={handleCopyClick}
            className="bg-green-500 text-white p-2 rounded mt-2"
          >
            Copy ID
          </button>
        </div>
      )}
    </div>
  )
}

export default page
