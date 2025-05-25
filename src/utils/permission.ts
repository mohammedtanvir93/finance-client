import { UserDetails } from "@/types/user";

type Policy =
    | {
        name: string;
        targetId: string;
        providedId: string;
    }
    | {
        name: string;
        targetId?: never;
        providedId?: never;
    };

export function check(user: UserDetails | undefined, policy: Policy) {
    if (!user)
        return true;

    if (!policy)
        return false;

    const permissions = user.role.permission;

    if (policy.targetId && policy.providedId)
        return permissions.includes(policy.name) && policy.targetId === policy.providedId;

    return permissions.includes(policy.name);
}