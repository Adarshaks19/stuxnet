import ProfilePage from '../../components/profile/profilePage'
import pencil from '../../assets/pen.png'
import Image from 'next/image';
import Link from 'next/link';
const HomeComponent = () => {

    return (
        <>
            <div>
                <Link href='/dashboard/userprofile'>
                     <div>
                    <button className='tri'><Image src={pencil} height={36} width={36} /><span>Edit Profile</span></button>
                    </div>
                </Link>
                <ProfilePage />
            </div>
        </>

    )
};


export default HomeComponent;
