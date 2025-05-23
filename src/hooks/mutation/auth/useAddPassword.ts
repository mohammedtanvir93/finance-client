import { addPassword } from '@/services/authService';
import { ChangePasswordWithToken } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';

export const useAddPassword = (token: string) => {
    return useMutation({
        mutationFn: (payload: ChangePasswordWithToken) => addPassword(token, payload)
    });
};
