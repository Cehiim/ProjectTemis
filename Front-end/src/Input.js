import React, { useState } from 'react';
import './index.css';
import Clips from './assets/Attach.png';
import Microphone from './assets/Microphone.png'
import Paper_Plane from './assets/Paper_Plane.png'

function Input({ onToggleText }) {
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
        width: '52px',
        height: '52px',
        marginLeft: '1vw',
        marginRight: '2vw',
        marginTop: '0'

    };

    const InputStyle = {
        backgroundColor: '#2F2F2F',
        width: '70vw',
        height: '81px',
        borderStyle: 'none',
        fontSize: '30px',
    };

    const MicrophoneStyle = {
        backgroundColor: '#2F2F2F',
        width: '55px',
        height: '55px',
        marginLeft: '1.5vw',
        marginRight: '2vw',
        marginTop: '0',
    };

    const PaperPlaneStyle = {
        backgroundColor: '#2F2F2F',
        width: '55px',
        height: '55px',
        marginTop: '0',
        marginLeft: '0vw',
    };

    const ImageStyle = {
        backgroundColor: '#2F2F2F'
    }

  return (
    <div style ={DivStyle}>
        <button style={ClipsStyle}>
            <img src={Clips} style={ImageStyle}/>
        </button>

        <input style={InputStyle}></input>

        <button style={MicrophoneStyle}>
            <img src={Microphone} style={ImageStyle}/>
        </button>

        <button style={PaperPlaneStyle} onClick={onToggleText}>
            <img src={Paper_Plane} style={ImageStyle}/>
        </button>
    </div>
  );
    
}
export default Input;