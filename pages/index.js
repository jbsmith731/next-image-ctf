import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const myLoader = ({ src, width, quality }) => {
  return `https:${src}?w=${width}&q=${quality || 75}`;
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Image
          src="//images.ctfassets.net/y5ykcn2kalx0/2zXWRcVC2xISPXduyRRARi/b4759e9c63765c2cad539e605646a2ee/photo-1639569263958-cedab9df5fae"
          width={400}
          height={300}
          alt=""
          loader={myLoader}
        />
      </div>

      <br />
      <br />
      <br />

      <a href="https://github.com/jbsmith731/next-image-ctf">Github Repository</a>
    </div>
  )
}
