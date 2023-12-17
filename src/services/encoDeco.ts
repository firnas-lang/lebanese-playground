export const b64Encode = (str: string): string => {
    return encodeURIComponent(str);
}

export const b64Decode = (b64: string): string => {
    return decodeURIComponent(b64);
}
