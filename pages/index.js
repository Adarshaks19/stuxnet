import MotionHoc from "../components/animation/Motionhoc";
import TypeIt from "typeit-react";
import React from 'react'
import dynamic from 'next/dynamic'
import dbConnect from '../lib/dbconnect'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, signInWithGoogle } from '../firebase/firebase'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const Footer = dynamic(() => import('../components/footer/footer'), { ssr: false })

const HomeComponent = () => {
    const [user] = useAuthState(auth)
    const router = useRouter()
    let href = router.pathname;
    useEffect(() => {
        const check = async () => {
            if (user) {
                const res = await fetch(`/api/profile/${user.uid}`)
                const { users } = await res.json();
                if (!users) router.push('/dashboard/userprofile')
                else if(href==='/'){
                    router.push('/dashboard')
                } 
                else{
                    router.push(href)
                }
            }
        }
        check();
    },[user])
    return (
        <>
            <div className="clear">
                <h1>
                    <TypeIt
                        options={{
                            strings: ["Stuxnet"],
                            waitUntilVisible: true,
                            cursorChar: " "
                        }}
                    />

                </h1>
                {/* <h1>
                    <TypeIt
                        getBeforeInit={(instance) => {
                            instance.pause(1000).type("Making Bit Fantastic").pause(750).delete(9).pause(500).type("Sarcastic").pause(750).delete(9).pause(500).type("Romantic").pause(750).delete(8).type('Enthusiastic').pause(750).delete(12).pause(500).type('Bombastic');
                            return instance;
                        }}
                        options={{
                            loop: true,
                        }}
                    />
                </h1> */}

            </div>

            <div style={{ height: "", bottom: "0", display: "flex", overflow: "clip" }}>
                {/* <Footer /> */}

            </div>
        </>

    )
}

export default HomeComponent


