import ChangePasswordWithTokenForm from "@/components/auth/ChangePasswordWithTokenForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "New Password Setup | YourAppName",
    description: "Enter and confirm your new password to complete the reset process.",
};

export default async function ChangePasswordWithToken(props: {
    params: Promise<{ token: string }>;
}) {
    const { token } = await props.params;

    return <ChangePasswordWithTokenForm token={token} />;
}
