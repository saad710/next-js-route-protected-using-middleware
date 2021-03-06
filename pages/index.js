import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router";
import { signOut } from "next-auth/react"
import { getSession, useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { status,data:session } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/login");
    },
  });
  console.log(session)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <h1> hello logged in</h1>
          <button onClick={() => 
                {
                  try {
                    signOut()
                  }
                  catch(err){
                    console.log(err)
                  }
                }
                  }>Sign out</button>
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}
export async function getServerSideProps(context) {
  // Check if the user is authenticated on the server...
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
}
