import CreatePostForm from '@/components/CreatePostForm'
import Footer from '@/components/Footer'
import styles from '@/styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>LensPlanner.xyz - Schedule Lens Posts</title>
        <meta name="description" content="Schedule posts on Lens Protocol" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Schedule Lens Posts with&nbsp;
            <code className={styles.code}>LensPlanner</code>&nbsp;🌿
          </p>
          <div>
            <ConnectButton />
          </div>
        </div>

        <div className={`${styles.center} w-full`}>
          <CreatePostForm />
        </div>

        <Footer />
      </main>
    </>
  )
}
