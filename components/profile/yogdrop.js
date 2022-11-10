import Classes from './yogdrop.module.css'
import { useState } from 'react'
function yogdrop({ onSelect }) {
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
        <div className={Classes.dropdown} style={{ position: "fixed", top: "0", right: "9.5rem", zIndex: "100" ,borderRight:"1px solid white"}}>
            <button className={Classes.dropbtn} onClick={dropClick}>Filter by Grad year</button>
            <div id="myDropdown" className={Classes.dropdownContent} style={bts}>
                <a onClick={clickHandler} name="2020">2020</a>
                <a onClick={clickHandler} name="2021">2021</a>
                <a onClick={clickHandler} name="2022">2022</a>
                <a onClick={clickHandler} name="2023">2023</a>
                <a onClick={clickHandler} name="2024">2024</a>
                <a onClick={clickHandler} name="2025">2025</a>
               

            </div>
        </div>
    )
}

export default yogdrop;