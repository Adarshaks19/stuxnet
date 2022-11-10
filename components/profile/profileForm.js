import { useState } from 'react'
import Classes from './profileForm.module.css'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import {useRouter} from 'next/router'
function profileForm(props) {
    const [user] = useAuthState(auth);
    const router=useRouter()
    const [formData, setFormData] = useState({
        uid: user.uid,
        username:user.displayName,
        email:user.email,
        image:"",
        roll: "",
        image: "",
        github: "",
        linkedIn: "",
        insta: "",
        bio: "",
        branch: "",
        yearofgraduation: "",
        hostel: "",
        room: "",
        phone: ""
    });
    function updateFormData(event) {
        const { name, value }= event.target;
        setFormData((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }
     async function submitHandler(event){
        props.onAdd(formData)
        setFormData({
            uid: user.uid,
            username: user.displayName,
            email: user.email,
            image:"",
            roll: "",
            image: "",
            github: "",
            linkedIn: "",
            insta: "",
            bio: "",
            branch: "",
            yearofgraduation: "",
            hostel: "",
            room: "",
            phone: ""
        })
        event.preventDefault();

        await router.push('/dashboard')
        router.reload('/dashboard')
    }

    return (
        <div className={Classes.prWrap}>
            <h3>Try to Fill all the Data</h3>
            <form className={Classes.prForm}>

                <input
                    className={Classes.prInput}
                    value={formData.roll}
                    onChange={e => updateFormData(e)}
                    placeholder="Roll no i.e BTECH/xxxxx/xx"
                    type="email"
                    name="roll"
                    required
                />
                <input
                    className={Classes.prInput}
                    value={formData.image}
                    onChange={e => updateFormData(e)}
                    placeholder="image"
                    type="url"
                    name="image"
                    required
                />
                <input
                    className={Classes.prInput}
                    value={formData.github}
                    onChange={e => updateFormData(e)}
                    placeholder="Github Profile Link"
                    type="url"
                    name="github"
                    required
                />
                <input
                    className={Classes.prInput}
                    value={formData.linkedIn}
                    onChange={e => updateFormData(e)}
                    placeholder="linkedIn Profile Link"
                    type="url"
                    name="linkedIn"
                    required
                />
                <input
                    className={Classes.prInput}
                    value={formData.insta}
                    onChange={e => updateFormData(e)}
                    placeholder="Insta Profile Link"
                    type="url"
                    name="insta"
                    required
                />

                <textarea
                    className={Classes.prInputt}
                    value={formData.bio}
                    onChange={e => updateFormData(e)}
                    placeholder="Say something about yourself..."
                    type="url"
                    name="bio"
                    required
                />

                <input
                    className={Classes.prInput}
                    value={formData.branch}
                    onChange={e => updateFormData(e)}
                    placeholder="Branch"
                    type="text"
                    name="branch"
                    required
                />
                <input
                    className={Classes.prInput}
                    value={formData.yearofgraduation}
                    onChange={e => updateFormData(e)}
                    placeholder="Year Of Graduation"
                    type="number"
                    name="yearofgraduation"
                    required
                />
                <input
                    className={Classes.prInput}
                    value={formData.hostel}
                    onChange={e => updateFormData(e)}
                    placeholder="Hostel Number"
                    type="number"
                    name="hostel"
                    required
                />
                <input
                    className={Classes.prInput}
                    value={formData.room}
                    onChange={e => updateFormData(e)}
                    placeholder="Room Number"
                    type="number"
                    name="room"
                    required
                />
                <input
                    className={Classes.prInput}
                    value={formData.phone}
                    onChange={e => updateFormData(e)}
                    placeholder="Phone Number"
                    type="tel" name="phone"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    required
                />
                <button className={Classes.prButton} onClick={submitHandler}>Submit</button>
            </form>
        </div>

    );
}

export default profileForm;