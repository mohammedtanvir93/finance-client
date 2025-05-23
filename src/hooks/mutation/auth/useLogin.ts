import { login } from '@/services/authService';
import { Login } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
    return useMutation({
        mutationFn: (payload: Login) => login(payload)
    });
};
