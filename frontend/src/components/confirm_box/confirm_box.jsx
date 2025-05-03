import "./confirm_box.scss";

function ConfirmBox({
  title = "",
  handleOnOK = () => {},
  display = false,
  setDisplay = () => {},
}) {
  const handleCancel = (e) => {
    e.stopPropagation();
    setDisplay(false);
  };

  const handleAfterOK = (e) => {
    e.stopPropagation();
    console.log("run");

    setDisplay(false);
    handleOnOK(e);
  };

  return (
    display && (
      <div className="confirm-background" onClick={handleCancel}>
        <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
          <h1 children="Xác nhận hành động" />
          <p children={title} />
          <div className="confirm-box__buttons">
            <button children="Hủy" onClick={handleCancel} />
            <button className="btn-ok" children="OK" onClick={handleAfterOK} />
          </div>
        </div>
      </div>
    )
  );
}

export default ConfirmBox;
