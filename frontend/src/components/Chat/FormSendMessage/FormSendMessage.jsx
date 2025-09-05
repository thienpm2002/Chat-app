import { useState, useRef } from "react";
import './ChatForm.css'

const FormSendMessage = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]); // lưu file chọn
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message && files.length === 0) return;

    const formData = new FormData();
    formData.append("text", message);
    files.forEach((file) => formData.append("attachments", file));

    onSend(formData);

    // reset form
    setMessage("");
    setFiles([]);
    fileInputRef.current.value = "";
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="chat-form-wrapper">
      {/* preview file */}
      {files.length > 0 && (
        <div className="preview-wrapper">
          {files.map((file, idx) => (
            <div key={idx} className="preview-item">
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="preview-img"
                />
              ) : (
                <div className="preview-file">
                  📄 {file.name}
                </div>
              )}
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeFile(idx)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* form */}
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          multiple
          onChange={handleFileChange}
        />

        <div
          onClick={() => fileInputRef.current.click()}
          className="file-btn"
        >
          <i className="fa-solid fa-image icon_file"></i>
        </div>

        <button type="submit" className="send-btn">
          <i className="fa-solid fa-paper-plane send_icon"></i>
        </button>
      </form>
    </div>
  );
};

export default FormSendMessage;
