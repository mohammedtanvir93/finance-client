import { changeSelfPassword } from '@/services/authService';
import { ChangePassword } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (payload: ChangePassword) => changeSelfPassword(payload),
    });
};
