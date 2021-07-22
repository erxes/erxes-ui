import T from 'i18n-react';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import AlertStyled from './Alert';


const AlertContainer = styled.div`
  position: fixed;
  top:0;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  background: transparent;
  z-index: 5080;
  font-size: 14px;
`;

let key = 0;


const createContainer = () =>{
  if (!document.getElementById( `alert-container`)) {
    const container = document.createElement('div');
    container.setAttribute('id', `alert-container`);
    document.body.appendChild(container);
    ReactDOM.render(<AlertContainer />, container);
  }
}

const createAlert = (type: string, text: string, time?: number) => {
  key++;
  createContainer();

  const alert = document.createElement('div');
  alert.setAttribute('id', `alert-${key}`);

  const container = document.getElementById('alert-container');
  if(container){
    const lastChild = container.lastChild
    if(lastChild){
      lastChild.appendChild(alert);
      ReactDOM.render(
        <AlertStyled key={key} type={type} time={time}>
          {T.translate(text)}
        </AlertStyled>,
        alert
      );
    }
    
  }
};

const success = (text: string, time?: number) =>
  createAlert('success', text, time);
const error = (text: string, time?: number) =>
  createAlert('error', text.replace('GraphQL error:', ''), time);
const warning = (text: string, time?: number) =>
  createAlert('warning', text, time);
const info = (text: string, time?: number) => createAlert('info', text, time);

const Alert = {
  success,
  error,
  warning,
  info
};

export default Alert;
