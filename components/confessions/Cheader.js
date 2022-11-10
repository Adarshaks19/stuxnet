import { useState } from "react";
import Image from "next/image";
// import whisper from "./love-letterrr.png";
import whisper from "./feedback.webp"
// import secret from "./theek.png";
import secret from "./feedback.webp"
import { useRouter } from 'next/router';
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Cheader({ setConf }) {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [data] = useAuthState(auth);
  const handleClick = async () => {
    await fetch('/api/confessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: value, uid: data.uid
      })
    })
    const res = await fetch('/api/confessions')
    const { confessions } = await res.json()
    setConf(confessions)
  };
  return (
    <nav>
      <div className="icon"><span ><Image src={secret} height={48} width={48}></Image></span>Feedback</div>
      <div className="search_box">
        <form onSubmit={(e) => {
          e.preventDefault();
        }}>
          <textarea type="search" placeholder={`What's in your mind ${data.displayName} ?`} onChange={(e) => setValue(e.target.value)} />
          <button type="submit" class="wow" style={{
            backgroundImage: `url(${whisper})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
            onClick={handleClick}
          />

        </form>
      </div>

    </nav>
  );
}

export default Cheader;
