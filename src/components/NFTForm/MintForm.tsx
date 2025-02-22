import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/Home.module.css";
import { FaPlayCircle, FaRocket } from "react-icons/fa";
import Cookies from "js-cookie";
import Image from "next/image";

interface NFTData {
  NFT_name: string;
  NFT_description: string;
  NFT_Logo_Url: string;
  NFT_ID: string;
}

const MintForm: React.FC = () => {
  const [nftData, setNftData] = useState({
    NFT_name: "",
    NFT_description: "",
    NFT_Logo_Url: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [mintedNFT, setMintedNFT] = useState<NFTData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNftData({ ...nftData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const User_Wallet_Address = Cookies.get("walletAddress");

    if (!User_Wallet_Address) {
      setError("Wallet not connected! Please connect your wallet first.");
      setIsLoading(false);
      return;
    }

    try {
      const NFT_ID = Date.now().toString(); // Generate unique NFT ID
      await axios.post("http://localhost:5500/api/storenftdata", {
        ...nftData,
        NFT_ID,
        User_Wallet_Address,
      });

      // Fetch the minted NFT details
      const response = await axios.get<NFTData>(
        `http://localhost:5500/api/getnftdatabyid/${NFT_ID}`
      );

      setMintedNFT(response.data);
    } catch (error) {
      console.error("Error minting NFT:", error);
      setError("Failed to mint NFT. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (mintedNFT) {
    return (
      <section className={styles.successContainer}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✅</div>
          <h2>NFT Minted Successfully!</h2>
          <p>Your NFT has been created and added to your collection.</p>
          <div className={styles.nftPreview}>
            <Image src={mintedNFT.NFT_Logo_Url} alt="Minted NFT" />
          </div>
          <div className={styles.nftDetails}>
            <p>
              <strong>NFT Name:</strong> {mintedNFT.NFT_name}
            </p>
            <p>
              <strong>Description:</strong> {mintedNFT.NFT_description}
            </p>
            <p>
              <strong>NFT ID:</strong>{" "}
              <span className={styles.nftId}>{mintedNFT.NFT_ID}</span>
            </p>
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.shareButton}>🔗 Share</button>
            <button
              className={styles.mintAgainButton}
              onClick={() => setMintedNFT(null)}
            >
              🔄 Mint Another
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <h1 className={styles.title}>
        Discover & Collect <br /> Extraordinary NFTs
      </h1>
      <p className={styles.description}>
        Enter the world of digital art and collectibles. Explore unique NFTs
        created by artists worldwide.
      </p>
      <div className={styles.buttonGroup}>
        <button className={`${styles.button} ${styles.primaryButton}`}>
          <FaRocket size={18} /> Start Creating
        </button>
        <button className={styles.button}>
          <FaPlayCircle size={18} /> Watch Demo
        </button>
      </div>

      <section className={styles.mintSection}>
        <h2>Mint Your NFT</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            name="NFT_name"
            placeholder="Enter NFT name"
            value={nftData.NFT_name}
            onChange={handleChange}
          />
          <textarea
            className={styles.input}
            name="NFT_description"
            placeholder="Describe your NFT"
            value={nftData.NFT_description}
            onChange={handleChange}
          />
          <input
            className={styles.input}
            name="NFT_Logo_Url"
            placeholder="Enter image URL"
            value={nftData.NFT_Logo_Url}
            onChange={handleChange}
          />
          <button
            className={styles.mintButton}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <span className={styles.loader}></span> : "Mint NFT"}
          </button>
        </form>
      </section>
    </>
  );
};

export default MintForm;
