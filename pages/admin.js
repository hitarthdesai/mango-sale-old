import Head from 'next/head';
import Signin from '../components/Signin';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Rudra Developers - Mango Sale</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Signin />
    </div>
  )
}
