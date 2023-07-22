import Head from "next/head";
import Image from "next/image";
import PIC from "../image/hengin-bird.png"

export default function Hengineer() {
  return (
    <>
      <Head>
        <title>Who is Hengineer?</title>
        <meta name="description" content="This is self-introduction page about hengineer!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="hero">
          <Image
            src={PIC}
            width={400}
            height={400}
            priority
          />
          <h1>Who is Hengineer?</h1>
          <p>
            Hi, I'm Hengineer<br />
            I belongs to NITAC(National Institute of Technology Akashi College) in Japan!<br />
            My favorite fish is shark🦈💦
          </p>
        </div>
      </main>
    </>
  )
}