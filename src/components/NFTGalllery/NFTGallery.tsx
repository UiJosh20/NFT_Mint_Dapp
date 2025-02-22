import React from 'react'
import styles from "../../styles/Home.module.css";


const NFTGallery = () => {
  return (
    <>
      <section className={styles.gallery}>
        <h2>Your NFT Gallery</h2>
        <div className={styles.grid}>
          <div
            className={styles.nftCard}
            style={{ backgroundColor: "#ff99cc" }}
          >
            <h3>Cosmic Dreams #001</h3>
            <p>A journey through digital dimensions</p>
          </div>
          <div
            className={styles.nftCard}
            style={{ backgroundColor: "#ff3366" }}
          >
            <h3>Neo Genesis #002</h3>
            <p>Digital evolution manifested</p>
          </div>
          <div
            className={styles.nftCard}
            style={{ backgroundColor: "#6699ff" }}
          >
            <h3>Digital Horizon #003</h3>
            <p>Where reality meets digital art</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default NFTGallery
