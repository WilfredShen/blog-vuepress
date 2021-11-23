const crypto = require("crypto");
const algorithm = "sha1";

// 没有处理 hash 碰撞（小概率事件）
const genPemaLink = content => crypto.createHash(algorithm).update(content).digest("hex").slice(0, 8);

module.exports = { genPemaLink };
