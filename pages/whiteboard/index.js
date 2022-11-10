import * as React from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import background from '../../assets/background.jpg'


function WhiteBoard(){
    return(
        <ReactSketchCanvas
            style={styles}
            width="100%"
            height="100%"
            strokeWidth={4}
            strokeColor="black"
            backgroundImage={background}
        />
    )
}
const styles = {
    border: '0.0625rem solid #9c9c9c',
    borderRadius: '0.25rem',
    // zIndex:2
    position:"fixed",
    top: 0,

};


export default WhiteBoard;