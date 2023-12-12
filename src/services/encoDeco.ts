import { Buffer } from 'buffer';

export const b64Encode = (str: string): string => {
    return encodeURIComponent(Buffer.from(str).toString('base64'));
}

export const b64Decode = (b64: string): string => {
    return decodeURIComponent(Buffer.from(b64, 'base64').toString('utf16le'));
}
