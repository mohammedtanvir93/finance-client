import { encrypt, decrypt } from '@/utils/encryption';

export const remove = (key: string) => {
    if (retrieve(key))
        localStorage.removeItem(key);
};

export const store = (key: string, data: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, encrypt(data));
    }
};

export const retrieve = (key: string) => {
    if (typeof window !== 'undefined') {
        const encrypted = localStorage.getItem(key);

        if (!encrypted) return null;
        return decrypt(encrypted);
    }

    return null;
};
