import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import {
  faPaperPlane,
  faSmile,
  faLink,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./ChatBox.module.css";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatBodyRef = useRef(null);

  //thay đổi trạng thái đóng mở cửa sổ chatlive

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };
  //nhập dữ liệu
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  //thêm tin nhắn vào cửa sổ trò chuyện

  const sendMessage = () => {
    if (message.trim() !== "") {
      setChatHistory([...chatHistory, { sender: "user", message }]);
      setMessage("");
    }
  };
  // xử dụng nút enter để gửi tin nhắn
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    // Cuộn tự động xuống cuối khi có tin nhắn mới
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);
  <FontAwesomeIcon icon="fa-solid fa-paper-plane" />;
  return (
    <div
      className={`${styles["chat-box"]} ${
        isOpen ? styles["open"] : styles["closed"]
      }`}
    >
      <div
        className={styles[`chat-header${isOpen ? "" : "hide"}`]}
        onClick={toggleChatBox}
      >
        {!isOpen ? (
          <FontAwesomeIcon icon={faFacebookMessenger} />
        ) : (
          "CUSTOMER SUPPORT"
        )}
      </div>
      <div
        ref={chatBodyRef}
        className={styles[`chat-body${isOpen ? "" : "-hide"}`]}
      >
        {isOpen && (
          <div>
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={
                  styles[
                    chat.sender === "user" ? "user-message" : "admin-message"
                  ]
                }
              >
                <strong>
                  {chat.sender === "user" ? "Bạn:" : "Chăm sóc khách hàng:"}
                </strong>{" "}
                {chat.message}
              </div>
            ))}
          </div>
        )}
      </div>
      {isOpen && (
        <div className={styles["input-group"]}>
          <FontAwesomeIcon
            icon={faPerson}
            style={{ marginTop: "10px", fontSize: "20px" }}
          />
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter Messager"
          />

          <div
            style={{
              display: "flex",
              gap: "5px",
              margin: "10px 0 0 10px",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={faLink} />
            <FontAwesomeIcon icon={faSmile} />
            <FontAwesomeIcon
              icon={faPaperPlane}
              onClick={sendMessage}
              style={{ color: "blue" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
