import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import FileItem from "../../../components/FileItem/FileItem";
import "./UploadFile.css";

const UploadFile = ({ files, handleUploadDocuments, setRemoveFile }) => {
  return (
    <>
      <div className="file-card">
        <div className="file-inputs">
          <label htmlFor="uploadFile">
            <input
              id="uploadFile"
              type="file"
              multiple
              onChange={handleUploadDocuments}
              hidden
            />
            <span>
              <AiFillPlusCircle className=" w-6 h-6 text-[#fff]" />
              Upload
            </span>
          </label>
        </div>

        <p className="main">Supported files</p>
        <p className="info">PDF, JPG, PNG</p>
      </div>
      <ul className="file-list">
        {files.length > 0 ?
          files.map((f, index) => (
            <FileItem key={index} file={f} deleteFile={setRemoveFile} />
          )) : <p>Chưa có tài liệu.</p>}
      </ul>
    </>
  );
};

export default UploadFile;
