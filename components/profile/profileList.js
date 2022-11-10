import ProfileCard from './profileCard';
function ProfileList({ data }) {
  return (
    <>
      <div
        style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        <ProfileCard key={data.uid} info={data} />;
      </div>
    </>
  );
}

export default ProfileList;
