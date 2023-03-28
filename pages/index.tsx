import CreatePostForm from '@/components/CreatePostForm'
import Footer from '@/components/Footer'
import PostScheduledAlert from '@/components/PostScheduledAlert'
import styles from '@/styles/Home.module.css'
import { Row } from '@nextui-org/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useState } from 'react'
import { useAccount } from 'wagmi'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [postScheduled, setPostScheduled] = useState<string | null>(null)
  const { isConnected } = useAccount()

  return (
    <>
      <Head>
        <title>LensPlanner.xyz - Schedule Lens Posts</title>
        <meta name="description" content="Schedule posts on Lens Protocol" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} px-4 py-0 md:px-24 md:pb-24 md:pt-12`}>
        <div className={`${styles.description} block md:flex`}>
          <div>
            <p>
              Schedule Lens Posts with&nbsp;
              <code className={styles.code}>LensPlanner</code>&nbsp;🌿
            </p>
          </div>
          <div>
            <Row justify="center" align="center" className="mt-6 md:mt-0">
              <ConnectButton chainStatus="none" />
            </Row>
          </div>
        </div>

        <div className={`${styles.center} w-full`}>
          {postScheduled ? (
            <PostScheduledAlert workflowId={postScheduled} onDismiss={() => setPostScheduled(null)} />
          ) : (
            <CreatePostForm onPostScheduled={setPostScheduled} />
          )}
        </div>

        <Footer />
      </main>
    </>
  )
}
