const Messagerlogin = ({ messager }) => {

  // cài đặt component tin nhắn qua props messager
  return (
    <>
      <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
        {messager}
      </p>
    </>
  );
};

export default Messagerlogin;
