import crypto from "crypto";
const algorithm = "sha1";

// 没有处理 hash 碰撞（小概率事件）
export const genPemaLink = (content: string) => crypto.createHash(algorithm).update(content).digest("hex").slice(0, 8);
