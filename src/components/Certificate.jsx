import { AptosClient, AptosAccount, TxnBuilderTypes, BCS } from "aptos";
import jsPDF from "jspdf";

// ✅ Aptos Setup
const NODE_URL = "https://fullnode.testnet.aptoslabs.com"; // Testnet URL
const client = new AptosClient(NODE_URL);

// ⚠ Replace with a securely stored private key
const senderPrivateKey = "YOUR_PRIVATE_KEY";  
const senderAccount = new AptosAccount(Uint8Array.from(Buffer.from(senderPrivateKey, "hex")));

const generateCertificate = async (userName, userWallet) => {
  const doc = new jsPDF("landscape");

  // ✅ Add Certificate Details
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.setTextColor(0, 0, 0);
  doc.text("Certificate of Completion", 80, 40);
  doc.setFontSize(22);
  doc.text(userName, 120, 80);
  doc.save(Certificate.pdf);

  // ✅ Send APT Reward
  try {
    const recipient = userWallet; // ✅ User's wallet address
    const amount = 1000000; // ✅ 1 APT = 1,000,000 Octas

    // ✅ Define Transaction Payload
    const payload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
      TxnBuilderTypes.EntryFunction.natural(
        "0x1::coin", 
        "transfer", 
        [new TxnBuilderTypes.TypeTagStruct(TxnBuilderTypes.StructTag.fromString("0x1::aptos_coin::AptosCoin"))], 
        [BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex(recipient)), BCS.bcsSerializeUint64(amount)]
      )
    );

    // ✅ Fetch Sender Account Details
    const senderAddress = senderAccount.address();
    const accountInfo = await client.getAccount(senderAddress);
    const txnBuilder = new TxnBuilderTypes.RawTransaction(
      TxnBuilderTypes.AccountAddress.fromHex(senderAddress),
      BigInt(accountInfo.sequence_number),
      payload,
      BigInt(1000), // Max gas amount
      BigInt(1), // Gas price per unit
      BigInt(Math.floor(Date.now() / 1000) + 10), // Expiration timestamp
      new TxnBuilderTypes.ChainId(2) // Testnet chain ID
    );

    // ✅ Sign Transaction
    const signedTxn = await client.signTransaction(senderAccount, txnBuilder);
    
    // ✅ Submit Transaction
    const txnHash = await client.submitTransaction(signedTxn);
    
    console.log("✅ APT Sent! Transaction Hash:", txnHash);
    alert("🎉 Transaction Successful! Check Aptos Explorer.");
  } catch (error) {
    console.error("❌ Transaction Failed:", error);
    alert("⚠ Transaction Failed! Check console.");
  }
};