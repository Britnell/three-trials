import Link from "next/link"

import styles from '../styles/Home.module.css'
import examples from './examples.js'

export default function Sidebar(){

    return (
        <div className={styles.sidebar}>
          {examples.map((name,i)=>(
            <Link key={i} href={`/${name}`} passHref>
              <div className={styles.sidebaritem}>{name}</div>
            </Link>
          ) )}
        </div>
    )
}