const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// DEV: Merkle root allow to verify the integrity of data with 0(Log n) time complexity.
//          H_root
//          /     \
//     H_ABCD     H_EFGH
//      /  \       /  \
//  H_AB  H_CD  H_EF  H_GH
//  / \   / \   / \   / \
// A   B C   D E   F G   H
// Verify C: hash(hash(H_AB + hash(C + D)) + H_EFGH)
const MERKLE_ROOT = 'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa';

app.post('/gift', (req, res) => {
  const { proof, name } = req.body;

  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if(isInTheList) {
    return res.send("You got a toy robot!");
  }
  return res.send("You are not on the list :(");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
