import * as crypto from 'crypto';

export function decryptPhoneData(
  sessionKey: string,
  encryptedData: string,
  iv: string
) {
  const sessionKeyBuf = Buffer.from(sessionKey, 'base64');
  const encryptedDataBuf = Buffer.from(encryptedData, 'base64');
  const ivBuf = Buffer.from(iv, 'base64');

  try {
    const decipher = crypto.createDecipheriv(
      'aes-128-cbc',
      sessionKeyBuf,
      ivBuf
    );
    decipher.setAutoPadding(true);
    let decoded = decipher.update(encryptedDataBuf, undefined, 'utf8');
    decoded += decipher.final('utf8');
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}
