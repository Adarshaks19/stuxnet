import ProfileCard from './profileCard';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { useState, useEffect } from 'react'
import Image from 'next/image';
function profilePage() {
    const [user] = useAuthState(auth);
    const [info, setInfo] = useState({})
    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                const userData = await fetch(`/api/profile/${user.uid}`);
                const data = await userData.json();
                setInfo(data.users);
            };
            fetchData();
        }
    }, [user]);
    return (
        <div>
            <ProfileCard info={info} />
        </div>
    )
}

export default profilePage;