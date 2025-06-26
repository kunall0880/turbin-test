// @ts-ignore: no types for prompt-sync
import promptSync from "prompt-sync";
// @ts-ignore: no types for bs58
import bs58 from "bs58";
import fs from "fs";
import { Keypair } from "@solana/web3.js";

const prompt = promptSync();

const input = prompt("Enter your secret key: ");
const keyArray = bs58.decode(input);
// Optional: print public key to verify
const keypair = Keypair.fromSecretKey(keyArray);
console.log("✅ Your public key is:");
console.log(keypair.publicKey.toBase58());

console.log("\n📝 Paste this into Turbin3-wallet.json:");
console.log(`[${keyArray.toString()}]`);

fs.writeFileSync("Turbin3-wallet.json", `[${keyArray.toString()}]`);
