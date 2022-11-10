import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import Image from "next/image";
import noting from '../../assets/noty.png'
function Header() {
  return (
    <header>
      <h1>
        {" "}
        <Image src={noting} height={"40px"} width={"40px"}/>
        BITNotes
      </h1>
    </header>
  );
}

export default Header;
