import { TypedDataDomain } from "@ethersproject/abstract-signer";
import { ethers, utils, Wallet } from "ethers";

// @ts-ignore
import omitDeep from "omit-deep";

const getParamOrExit = (name: string) => {
  const param = process.env[name];
  if (!param) {
    console.error(`Required config param '${name}' missing`);
    process.exit(1);
  }
  return param;
};

const MUMBAI_RPC_URL = getParamOrExit("MUMBAI_RPC_URL");
const PK = getParamOrExit("PK");

export const prettyJSON = (message: string, obj: string) => {
  console.log(message, JSON.stringify(obj, null, 2));
};

export const sleep = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const omit = (object: any, name: string) => {
  return omitDeep(object, name);
};

export const ethersProvider = new ethers.providers.JsonRpcProvider(
  MUMBAI_RPC_URL
);

export const getSigner = () => {
  return new Wallet(PK, ethersProvider);
};

export const getAddressFromSigner = () => {
  return getSigner().address;
};

export const signedTypeData = async (
  domain: TypedDataDomain,
  types: Record<string, any>,
  value: Record<string, any>
) => {
  const signer = getSigner();

  // remove the __typedname from the signature!
  const result = await signer._signTypedData(
    omit(domain, "__typename"),
    omit(types, "__typename"),
    omit(value, "__typename")
  );

  return result;
};

export const splitSignature = (signature: string) => {
  return utils.splitSignature(signature);
};

export const sendTx = (
  transaction: ethers.utils.Deferrable<ethers.providers.TransactionRequest>
) => {
  const signer = getSigner();
  return signer.sendTransaction(transaction);
};

export const signText = (text: string) => {
  return getSigner().signMessage(text);
};
