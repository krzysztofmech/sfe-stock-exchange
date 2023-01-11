import React from "react";
import { createPortal } from "react-dom";
import "../styles/alert.css";
interface AlertProps {
  show: boolean;
  danger?: boolean;
  text: string;
}

export const Alert: React.FC<AlertProps> = ({ show, danger, text }) => {
  const alertElement = document.getElementById("alert");

  return !show
    ? null
    : createPortal(
        <div className="alert-container">
          <div className={"alert"}>{text}</div>
        </div>,
        alertElement!
      );
};
