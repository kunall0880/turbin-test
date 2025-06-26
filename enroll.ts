import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";

import {IDL} from "./Turbin3_prereq";
import walletData from "./Turbin3-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(walletData));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed",
});
const programId = new PublicKey("TRBZyQHB3m68FGeVsqTK39Wm4xejadjVhP5MAZaKWDM");
const program = new Program(IDL as any, programId, provider);

const mintCollection = new PublicKey(
  "5ebsp5RChCGK7ssRZMVMufgVZhd2kFbNaotcZ5UvytN2"
);
const MPL_CORE_PROGRAM_ID = new PublicKey(
  "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
);
const mintTs = Keypair.generate();

const [accountKey] = PublicKey.findProgramAddressSync(
  [Buffer.from("prereqs"), keypair.publicKey.toBuffer()],
  program.programId
);

(async () => {
  try {
    const txhash = await program.methods
      .initialize("kunall0880")
      .accounts({
        user: keypair.publicKey,
        account: accountKey,
        system_program: SystemProgram.programId,
      })
      .signers([keypair])
      .rpc();
    console.log(
      `Success! Check out your TX here: https://explorer.solana.com/tx/${ txhash}?cluster=devnet`
    );
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();

(async () => {
  try {
    const txhash  = await program.methods
      .submitTs()
      .accounts({
        user: keypair.publicKey,
        account: accountKey,
        mint: mintTs.publicKey,
        collection: mintCollection,
        authority: keypair.publicKey,
        mplCoreProgram: MPL_CORE_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([keypair, mintTs])
      .rpc();

    console.log(
      `✅ NFT Mint TX: https://explorer.solana.com/tx/${ txhash }?cluster=devnet`
    );
  } catch (e) {
    console.error("❌ Failed to mint NFT:", e);
  }
})();
