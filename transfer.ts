import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import wallet from "./Turbin3-wallet.json";

const from = Keypair.fromSecretKey(new Uint8Array(wallet));
const to = new PublicKey("87eaezi5Nou5d5MFH2DStENzWZ6iHNroDHZSbSca4RDu"); // Turbin3 wallet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
  try {
    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: LAMPORTS_PER_SOL, // 0.1 SOL
      })
    );

    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    tx.feePayer = from.publicKey;

    const sig = await sendAndConfirmTransaction(connection, tx, [from]);

    console.log(`✅ Transfer success!
https://explorer.solana.com/tx/${sig}?cluster=devnet`);
  } catch (e) {
    console.error("❌ Transfer failed:", e);
  }
})();
