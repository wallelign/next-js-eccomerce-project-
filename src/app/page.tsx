import Image from "next/image";
import { Button } from "@/components/ui/button";
import Head from "next/head";
export default function Home() {
  return (
    <>
    <Head>
      <title>Home Page</title>
      <meta name="description" content="home page" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <div>
       <button>submit</button>
    </div>
  </>
  );
}
