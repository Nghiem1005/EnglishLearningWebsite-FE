import React from "react";
import { AiOutlineFileText } from "react-icons/ai";
import { ImSpinner6 } from "react-icons/im";
import { BsTrash } from "react-icons/bs";
import "./FileItem.css";

const FileItem = ({ file, deleteFile }) => {
  return (
    <>
      <li className="file-item" key={file.name}>
        <AiOutlineFileText className="fa-spin"/>
        <p>{file.name}</p>
        <div className="actions">
          <div className="loading"></div>
          {file.isUploading && (
            <span className="fa-spin" onClick={() => deleteFile(file.name)}>
              <ImSpinner6 className="fa-spin" />
            </span>
          )}
          {!file.isUploading && (
            <span  onClick={() => deleteFile(file.name)}>
              <BsTrash className="fa-spin"/>
            </span>
          )}
        </div>
      </li>
    </>
  );
};

export default FileItem;
