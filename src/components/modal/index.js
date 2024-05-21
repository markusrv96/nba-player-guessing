import React from "react";

const Modal = ({ show, setShow, title, children, containerClassName }) => {
  return (
    <div
      className="modal-container"
      style={!show ? { display: "none" } : { display: "block" }}
    >
      <div className={containerClassName}>
        <div className="header modal-header">
          <h2 className={!title ? "title clear" : "title"}> {title} </h2>
          <button
            className="modal-close"
            onClick={() => {
              setShow(false);
            }}
          >
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDE1TDggOE04IDhMMSAxNU04IDhMMSAxTTggOEwxNSAxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="
              alt="Close icon"
            />
            <span className="sr"> Close Modal </span>
          </button>
        </div>
        <div>{children}</div>
      </div>
      <div
        className="scrim"
        onClick={() => {
          setShow(false);
        }}
      />
    </div>
  );
};

export default Modal;
