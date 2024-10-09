import React, { useState } from 'react';
import styled from 'styled-components';
import './index.css';
import Clips from './assets/Attach.png';
import Microphone from './assets/Microphone.png'
import Paper_Plane from './assets/Paper_Plane.png'
import registerServiceWorker from './registerServiceWorker';

function Input() {
    const DivStyle = {
        backgroundColor: '#2F2F2F',
        width: '90vw',
        height: '81px',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
    };

    const ClipsStyle = {
        backgroundColor: '#2F2F2F',
        width: '55px',
        height: '55px',
        marginLeft: '1vw',
        marginRight: '2vw',


    };

    const InputStyle = {
        backgroundColor: '#2F2F2F',
        width: '55px',
        height: '81px',
        borderStyle: 'none',
    };

    const MicrophoneStyle = {
        backgroundColor: '#2F2F2F',
        width: '55px',
        height: '55px',
    };

    const PaperPlaneStyle = {
        backgroundColor: '#2F2F2F',
        width: '55px',
        height: '55px',
    };

  return (
    <div style ={DivStyle}>
      <img src={Clips} style={ClipsStyle}/>
      <input style={InputStyle}></input>
      <img src={Microphone} style={MicrophoneStyle}/>
        <img src={Paper_Plane} style={PaperPlaneStyle}/>
    </div>
  );
    
}
export default Input;