import ProfileForm from '../../../components/profile/profileForm'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebase"
function UserProfile() {
    const [user] = useAuthState(auth);

    async function addData(data) {
        await fetch(`/api/profile/${user.uid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        
    }
    return (
        <div>
            <ProfileForm onAdd={addData} />
        </div>
    )
}

export default UserProfile;