import Classes from './dropdownbtn.module.css'
import { useState } from 'react'
function dropdownbtn({ onSelect }) {
    const [bts, setBts] = useState({ display: "none" })
    function clickHandler(event) {
        onSelect(event.target.name)
    }
    function dropClick() {
        if (bts.display === "none") {
            setBts({ display: "block" })
        }
        else {
            setBts({ display: "none" })
        }
    }
    return (
        <div className={Classes.dropdown} style={{ position: "fixed", top: "0", right: "0",zIndex:"100" }}>
            <button className={Classes.dropbtn} onClick={dropClick}>Filter by Branch</button>
            <div id="myDropdown" className={Classes.dropdownContent} style={bts}>
                <a onClick={clickHandler} name="CSE">CSE</a>
                <a onClick={clickHandler} name="IT">IT</a>
                <a onClick={clickHandler} name="ECE">ECE</a>
                <a onClick={clickHandler} name="EEE">EEE</a>
                <a onClick={clickHandler} name="MECH">MECH</a>
                <a onClick={clickHandler} name="CIVIL">CIVIL</a>
                <a onClick={clickHandler} name="CHEM">CHEM</a>
                <a onClick={clickHandler} name="IMSC/MNC">IMSC/MNC</a>
                <a onClick={clickHandler} name="PROD">PROD</a>
         
            </div>
        </div>
    )
}

export default dropdownbtn;