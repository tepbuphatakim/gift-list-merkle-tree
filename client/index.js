const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const giftList = require('../utils/niceList');

const merkleTree = new MerkleTree(giftList);

const serverUrl = 'http://localhost:1225';

async function main() {
  const valid = 'Mr. Darrin Carroll';
  const invalid = 'Mr. Tepbuphata Kim';
  const name = invalid;
  const giftListIndex = niceList.findIndex((gift) => gift === name);
  const proof = merkleTree.getProof(giftListIndex);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
  });

  console.log({ gift });
}

main();
