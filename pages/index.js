import React from "react"

import styles from '../styles/Home.module.css'

import Page from "../lib/page"
import examples from "../lib/examples"

export default function Home() {
  
  return (
    <Page>
      <div className={styles.center}></div>
    </Page>
  )
}

// export async function getServerSideProps(context) {
//   return {
//     redirect: {
//       destination: examples[0],
//       permanent: false,
//     },
//   }
// }