import Badge, { BadgeColor } from "@/components/ui/badge/Badge";
import { User } from "@/types/user";

type UserStatus = User['status'];

const STATUS_BADGES: Record<UserStatus, BadgeColor> = {
    'ACTIVE': 'success',
    'PENDING': 'info',
    'INACTIVE': 'warning'
};

const getStatusBadge = (status: UserStatus) => {
    return (
        <Badge variant="solid" color={STATUS_BADGES[status]} >
            {status}
        </Badge>
    );
};

export default getStatusBadge;