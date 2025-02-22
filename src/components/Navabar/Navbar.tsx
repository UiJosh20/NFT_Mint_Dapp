import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Image from "next/image";
import Cookies from "js-cookie";
import logo from "../../assets/logo.png";
import { FaWallet } from "react-icons/fa";
import styles from "../../styles/Home.module.css";
import { useEffect } from "react";

const Navbar = () => {
  const { address, isConnected } = useAccount();

  // Save address to a cookie when user connects
  useEffect(() => {
    if (isConnected && address) {
      Cookies.set("walletAddress", address, { expires: 7 }); // Save address for 7 days
    }
  }, [isConnected, address]);

  return (
    <nav className={styles.navbar}>
      <Image src={logo} alt="logo" width={25} height={25} />
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
        }) => {
          const isConnected =
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");

          return (
            <button
              className={styles.connectButton}
              onClick={isConnected ? openAccountModal : openConnectModal}
            >
              <FaWallet size={18} />
              {isConnected ? account.displayName : "Connect Wallet"}
            </button>
          );
        }}
      </ConnectButton.Custom>
    </nav>
  );
};

export default Navbar;
