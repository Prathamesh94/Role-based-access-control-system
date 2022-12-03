const crypto = require("crypto")
// Defining the hash algorithm
let algorithm = "sha256"

function generateHash(key) {
    return crypto.createHash(algorithm).update(key).digest("hex")
}
module.exports ={ generateHash}