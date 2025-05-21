export type RoleBase = {
    id: string;
    title: string;
}

export interface RoleDetails extends RoleBase {
    permission: string[];
}