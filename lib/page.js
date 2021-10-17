import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'
import Sidebar from './sidebar'


export default function Page({children}){

    return (
        <>
      <Head>
        <title>Next Tutorials Project</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Sidebar />
        <div className={styles.center}>
            {children} 
        </div>
      </main>

      {/* <footer className={styles.footer}>      </footer> */}
    </>
    )
}