import Link from 'next/link';
import ContentfulImage from '../components/ContentfulImage';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <div>
        <ContentfulImage
          src={`//images.ctfassets.net/y5ykcn2kalx0/2zXWRcVC2xISPXduyRRARi/b4759e9c63765c2cad539e605646a2ee/photo-1639569263958-cedab9df5fae`}
          width={800}
          height={600}
          alt=""
        />
      </div>

      <br />
      <br />
      <br />

      <a href="https://github.com/jbsmith731/next-image-ctf">Github Repository</a>
      <p>
        <Link href="/about">
          About
        </Link>
      </p>
    </div>
  )
}
