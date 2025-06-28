import { AptosClient, AptosAccount, TxnBuilderTypes, BCS } from "aptos";

// Use AptosClient instead of "Aptos"
const APTOS_NODE_URL = "https://fullnode.testnet.aptoslabs.com";
const aptosClient = new AptosClient(APTOS_NODE_URL);

export async function sendAptosCoin(toAddress, amount) {
  try {
    const privateKey = "YOUR_PRIVATE_KEY"; // Replace with actual private key
    const sender = new AptosAccount(Buffer.from(privateKey, "hex"));

    const payload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
      TxnBuilderTypes.EntryFunction.natural(
        "0x1::coin",
        "transfer",
        [TxnBuilderTypes.TypeTagStruct(TxnBuilderTypes.StructTag.fromString("0x1::aptos_coin::AptosCoin"))],
        [
          BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex(toAddress)),
          BCS.bcsSerializeUint64(amount * 1e6), // 1 APT = 1,000,000 Octas
        ]
      )
    );

    const txnRequest = await aptosClient.generateTransaction(sender.address(), payload);
    const signedTxn = await aptosClient.signTransaction(sender, txnRequest);
    const txnResponse = await aptosClient.submitTransaction(signedTxn);

    console.log("✅ APT Sent! Transaction Hash:", txnResponse.hash);
    return txnResponse.hash;
  } catch (error) {
    console.error("❌ APT Transfer Failed:", error);
  }
}