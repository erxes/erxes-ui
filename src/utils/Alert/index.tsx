import T from "i18n-react";
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import AlertStyled from "./Alert";

const AlertsWrapper = styled.div.attrs({
  id: 'alerts-wrapper'
})`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  background: transparent;
  z-index: 5080;
  font-size: 14px;
`;

let key = 0;
let timeout;
let alertcount = 0

const createAlert = (type: string, text: string, time?: number) => {
  if (!document.getElementById(`alerts-wrapper`)) {
    ReactDOM.render(<AlertsWrapper />,  document.getElementById("root"));
  }

  const alertsWrapper = document.getElementById(`alerts-wrapper`);
  alertcount = alertsWrapper ? alertsWrapper.childElementCount : 0;
  key = alertcount+1;


  if (!document.getElementById(`alert-container-${key}`)) {
    const alertContainer = document.createElement('div');
    if(alertContainer && alertsWrapper){
      alertsWrapper.appendChild(alertContainer);
    }
    alertContainer.setAttribute('id', `alert-container-${key}`);
    ReactDOM.render(
      <AlertStyled key={key} type={type} timeout={timeout}>
        {T.translate(text)}
      </AlertStyled>,
      alertContainer
    );
    alertcount++;
  }

  timeout = setTimeout(() => {
    if (document.getElementById(`alert-container-${key}`)) {
      const container = document.getElementById(`alert-container-${key}`);
      if(container){
          container.remove();
      }
      alertcount--;
    }
  }, time || 3500);
  
};

const success = (text: string, time?: number) =>
  createAlert("success", text, time);
const error = (text: string, time?: number) =>
  createAlert("error", text.replace("GraphQL error:", ""), time);
const warning = (text: string, time?: number) =>
  createAlert("warning", text, time);
const info = (text: string, time?: number) => createAlert("info", text, time);

const Alert = {
  success,
  error,
  warning,
  info,
};

export default Alert;
