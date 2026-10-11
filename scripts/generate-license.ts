import crypto from "crypto";

function generateLicenseKey(): string {
  const part1 = crypto.randomBytes(4).toString("hex").toUpperCase();
  const part2 = crypto.randomBytes(4).toString("hex").toUpperCase();
  const part3 = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `LICENSE-${part1}-${part2}-${part3}`;
}

console.log(generateLicenseKey());
