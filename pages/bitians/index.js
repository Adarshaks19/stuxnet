import dbConnect from '../../lib/dbconnect';
import User from '../../models/User';
import ProfileList from '../../components/profile/profileList';
import { useState } from 'react';
import Dropdownbtn from '../../components/profile/dropdownbtn';
import Yogdrop from '../../components/profile/yogdrop';
import TextField from '@mui/material/TextField';

const profList = (userData, search) => {
  let el = userData.filter((el) => {
    return el.username.toLowerCase().includes(search.toLowerCase());
  });
  return el;
};

function BitPage(props) {
  const superData = props.userData;
  const [userData, setUserData] = useState(props.userData);
  const [search, setSearch] = useState('');
  console.log(userData);
  async function filterData(name) {
    setUserData(superData);
    const newData = await superData.filter((info) => {
      return info.branch === name;
    });
    setUserData(newData);
  }
  async function batchwise(name) {
    setUserData(superData);
    const newData = await superData.filter((info) => {
      return info.yearofgraduation === parseInt(name);
    });
    console.log(name);
    setUserData(newData);
  }
  return (
    <>
      <Dropdownbtn onSelect={filterData} />
      <Yogdrop onSelect={batchwise} />
      <div>
        <input
          type="text"
          placeholder="Search name"
          style={{
            position: 'absolute',
            height: '40px',
            zIndex: 100,
            top: 72,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          position: 'relative',
          top: 96,
        }}
      >
        {profList(userData, search).length === 0 ? (
          <div
            style={{
              position: 'relative',
              top: 96,
              fontSize: 32,
            }}
          >
            User not found
          </div>
        ) : (
          profList(userData, search).map((el) => {
            return <ProfileList data={el} />;
          })
        )}
      </div>
    </>
  );
}

export default BitPage;

export async function getStaticProps() {
  await dbConnect();
  const data = await User.find({});
  // const news = JSON.parse(JSON.stringify(data))
  return {
    props: {
      userData: data.map((info) => ({
        uid: info.uid,
        image: info.image,
        username: info.username,
        email: info.email,
        roll: info.roll,
        insta: info.insta,
        linkedIn: info.linkedIn,
        github: info.github,
        bio: info.bio,
        branch: info.branch,
        yearofgraduation: info.yearofgraduation,
        hostel: info.hostel,
        room: info.room,
        phone: info.phone,
      })),
    },
    revalidate: 60,
  };
}
