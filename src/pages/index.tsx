import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import logo from "../assets/logo.png";
import Image from "next/image";
import { FaPlayCircle, FaRocket, FaWallet } from "react-icons/fa"; // Import Wallet Icon
import Navbar from "../components/Navabar/Navbar";
import MintForm from "../components/NFTForm/MintForm";
import NFTGallery from "../components/NFTGalllery/NFTGallery";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mint Your NFT</title>
        <meta
          content="Mint and collect extraordinary NFTs"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <Navbar/>

      <main className={styles.main}>
        <MintForm/>
        <NFTGallery/>
     
      </main>
    </div>
  );
};

export default Home;
