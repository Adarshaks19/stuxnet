import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWindowSize } from "react-use";
//All the svg files
import logo from "../../assets/bold.png";
import Home from "../../assets/home-solid.svg";
import Team from "../../assets/social.svg";
import Calender from "../../assets/sceduled.svg";
import Projects from "../../assets/starred.svg";
import White from '../../assets/white-board.png'
import Documents from "../../assets/draft.svg";
import Bitian from '../../assets/marketing.png'
import PowerOff from "../../assets/power-off-solid.svg";
import downhil from "../../assets/downhil.gif";
import News from "../../assets/news.png"
import Hamburger from '../../assets/righty.png'
import Hamburgery from '../../assets/lefty.png'
import styled from "styled-components";
import { auth, signOutFromGoogle } from '../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Router } from "next/router";
import { useRouter } from "next/router";
const Container = styled.div`
  position: fixed;
  .active {
    border-right: 4px solid var(--white);

    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
  z-index: 1000;
`;

const Button = styled.button`
  background-color:var(--black);
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 0 0 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  &::before,
  &::after {
    content: "";
    background-color: var(--white);
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }

  &::before {
    top: ${(props) => (props.clicked ? "1.5" : "1rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }

  &::after {
    top: ${(props) => (props.clicked ? "1.2" : "1.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;

const SidebarContainer = styled.div`
  background-color: var(--black);
  width: 3.5rem;
  height: 80vh;
  margin-top: 1rem;
  border-radius: 0 30px 30px 0;
  padding: 1rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Logo = styled.div`
  width: 2rem;
  img {
    width: 100%;
    height: auto;
  }
`;

const SlickBar = styled.ul`
  color: var(--white);
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--black);
  z-index: 100;
  margin: 3rem 0 auto 0;

  /* top: 3rem; */
  left: 0;
  position: absolute;
  width: ${(props) => (props.clicked ? "11rem" : "3.5rem")};
  transition: all 0.5s ease;
  border-radius: 0 30px 30px 0;
`;

const Item = styled.div`
  text-decoration: none;
  color: var(--white);
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;

  display: flex;
  padding-left: 1rem;

  &:hover {
    border-right: 4px solid var(--white);

    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }

  img {
    width: 1.2rem;
    height: auto;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%);
  }
`;

const Text = styled.span`
  width: ${(props) => (props.clicked ? "100%" : "0")};
  overflow: hidden;
  margin-left: ${(props) => (props.clicked ? "1.5rem" : "0")};
  transition: all 0.3s ease;
`;

const Profile = styled.div`
  width: ${(props) => (props.clicked ? "14rem" : "3rem")};
  height: 3rem;

  padding: 0.5rem 1rem;
  /* border: 2px solid var(--white); */
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${(props) => (props.clicked ? "9rem" : "0")};

  background-color: var(--black);
  color: var(--white);

  transition: all 0.3s ease;

  img {
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;

    &:hover {
      border: 2px solid var(--grey);
      padding: 2px;
    }
  }
  /* z-index: 1000; */
`;

const Details = styled.div`
  display: ${(props) => (props.clicked ? "flex" : "none")};
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div`
  padding: 0 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h4 {
    display: inline-block;
  }

  a {
    font-size: 0.8rem;
    text-decoration: none;
    color: var(--grey);

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Logout = styled.button`
  border: none;
  width: 2rem;
  height: 2rem;
  background-color: transparent;

  img {
    width: 100%;
    height: auto;
    filter: invert(15%) sepia(70%) saturate(6573%) hue-rotate(2deg)
      brightness(100%) contrast(126%);
    transition: all 0.3s ease;
    &:hover {
      border: none;
      padding: 0;
      opacity: 0.5;
    }
  }
`;

const Sidebar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [profileClick, setprofileClick] = useState(false);
  const handleProfileClick = () => setprofileClick(!profileClick);
  const [windowWidth, setWindowWidth] = useState();
  const [sidenav, setSideNav] = useState(true)
  const [btn, setBtn] = useState(false)
  const router = useRouter();
  async function signOut() {
    await signOutFromGoogle();
    router.push('/')
  }
  const [user] = useAuthState(auth)
  // console.log(user)
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    if (window.innerWidth < 768) {
      handleResize()
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    }

  }, []);

  useEffect(() => {
    if (windowWidth < 768) {
      setSideNav(false);
      setBtn(true);
    } else {
      setSideNav(true);
      setBtn(false);
    }
  }, [windowWidth]);

  function showSideNav() {
    setSideNav(!sidenav);
    if (!sidenav) {
      setTogi({
        position: "fixed",
        bottom: "50%",
        zIndex: "100",
        left: "20%",
        backgroundColor: "black",
        borderRadius: "0 50% 50% 0",
        padding: "0.3rem",
        opacity: "0.7"

      })
    }
    else {
      setTogi({
        position: "fixed",
        bottom: "50%",
        zIndex: "100",
        left: "0%",
        backgroundColor: "black",
        borderRadius: "0 50% 50% 0",
        padding: "0.3rem",
        opacity: "0.7"

      })
    }

  }

  const [togi, setTogi] = useState({
    position: "fixed",
    bottom: "50%",
    zIndex: "100",
    left: "0%",
    backgroundColor: "black",
    borderRadius: "0 50% 50% 0",
    padding: "0.5rem",
    opacity: "0.7"
  })
  const size = 20;
  return (
    <>
      <div className="togi" style={togi}>
        {btn ? <div>
          <Image
            src={Hamburger}
            height={36}
            width={36}
            onClick={showSideNav}
          />
        </div> : null}
      </div>
      {sidenav ?
        <Container>
          <Button clicked={click} onClick={() => handleClick()}>
            Click
          </Button>
          <SidebarContainer>
            <Logo>
              <Image height={size} width={size} src={logo} alt="logo" />
            </Logo>
            <SlickBar clicked={click}>
              <Link href="/dashboard">
                <Item
                  onClick={() => setClick(false)}
                  exact
                  activeClassName="active"
                  to="/dashboard"
                >
                  <Image height={size} width={size} src={Home} alt="Home" />
                  <Text clicked={click}>Dashboard</Text>
                </Item>
              </Link>
              <Link href="/bitians">
                <Item
                  onClick={() => setClick(false)}
                  exact
                  activeClassName="active"
                  to="/bitians"
                >
                  <Image height={size} width={size} src={Bitian} alt="Bitians" />
                  <Text clicked={click}>BITians</Text>
                </Item>
              </Link>
              <Link href="/confessions">
                <Item
                  onClick={() => setClick(false)}
                  activeClassName="active"
                  to="/confessions"
                >
                  <Image height={size} width={size} src={Team} alt="Team" />
                  <Text clicked={click}>Feedback</Text>
                </Item>
              </Link>
              <Link href="https://hatch-from-scratch.vercel.app/placement">
                <Item
                  onClick={() => setClick(false)}
                  activeClassName="active"
                  to="/newsroom"
                >
                  <Image
                    height={size}
                    width={size}
                    src={News}
                    alt="Newsroom"
                  />
                  <Text clicked={click}>Oppurtunities</Text>
                </Item>
              </Link>
              <Link href="/calender">
                <Item
                  onClick={() => setClick(false)}
                  activeClassName="active"
                  to="/calender"
                >
                  <Image
                    height={size}
                    width={size}
                    src={Calender}
                    alt="Calender"
                  />
                  <Text clicked={click}>Calendar</Text>
                </Item>
              </Link>
              <Link href="https://hatch-from-scratch.vercel.app/erp">
                <Item
                  onClick={() => setClick(false)}
                  activeClassName="active"
                  to="/todolist"
                >
                  <Image
                    height={size}
                    width={size}
                    src={Documents}
                    alt="Documents"
                  />
                  <Text clicked={click}>ERP</Text>
                </Item>
              </Link>
              <Link href="https://hatch-from-scratch.vercel.app/epistle">
                <Item
                  onClick={() => setClick(false)}
                  activeClassName="active"
                  to="/whiteboard"
                >
                  <Image
                    height={size}
                    width={size}
                    src={White}
                    alt="Whiteboard"
                  />
                  <Text clicked={click}>Epistle</Text>
                </Item>
              </Link>

              {/* <Link href="https://hatch-from-scratch.vercel.app/placement">
                <Item
                  onClick={() => setClick(false)}
                  activeClassName="active"
                  to="/whiteboard"
                >
                  <Image
                    height={20}
                    width={25}
                    src={White}
                    alt="Whiteboard"
                  />
                  <Text clicked={click}>Off campus oppurtunities</Text>
                </Item>
              </Link> */}

            </SlickBar>

            <Profile clicked={profileClick}>
              <Image
                height={size}
                width={size}
                onClick={() => handleProfileClick()}
                src={logo}
                alt="Profile"
              />
              <Details clicked={profileClick}>
                <Name>
                  {/* <h4>Jhon&nbsp;Doe</h4> */}
                  <h5 style={{ display: "inline" }}>{user&&user.displayName}</h5>
                  <Link href="/dashboard">view&nbsp;dashboard</Link>
                </Name>

                <Logout onClick={signOut} >
                  <Image height={size} width={size} src={PowerOff} alt="logout" />
                </Logout>
              </Details>
            </Profile>
          </SidebarContainer>
        </Container> : null}
    </>
  );
};

export default Sidebar;
