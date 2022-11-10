import { useState, useEffect } from 'react'
import '../styles/globals.css'
import '../components/notes/styles.css'
// import '../components/calender/styles.css'
import '../components/confessions/ConfessionItem.css'
import '../components/confessions/Cheader.css'
import '../components/confessions/ConfessionList'
import doodle from '../assets/doodle.jpg'
import Image from 'next/image'
import Layout from '../components/layout/Layout'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, signInWithGoogle } from '../firebase/firebase'
import { useRouter } from 'next/router'
import Home from '.'
import Land from '../components/layout/Land'
import Head from 'next/head'
import Bold from '../assets/news.png'
function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth)
  const router = useRouter()
  let href = router.pathname;
  // useEffect(() => {
  //   if (href === '/') {
  //     if (user) router.push('/dashboard')
  //   }
  //   else {
  //     if (user) router.push({ href })

  //   }
  // }, [user])

  return (

    <>
    <div className='bgmain'> <Image src={doodle} layout='fill' objectFit='cover'/>   </div>
      <Head>
        <link rel="icon" href='/bold.png' type="image/x-icon" />

      </Head>
      {user ?
        <Layout>
          <Component {...pageProps} />
        </Layout>
        :
        <Land>
          
          <div>
            <Home />
          </div>
          <button className='button' onClick={async () => {
            await signInWithGoogle();
          }}><span>Sign In/Up</span></button>
        </Land>

      }
    </>

  )


}

export default MyApp



