import { encrypt, decrypt } from '@/utils/encryption';

export const saveLS = (key: string, data: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, encrypt(data));
    }
};

export const getLS = (key: string) => {
    if (typeof window !== 'undefined') {
        const encrypted = localStorage.getItem(key);

        if (!encrypted) return null;
        return decrypt(encrypted);
    }

    return null;
};
