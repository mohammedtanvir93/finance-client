import ChangePasswordWithTokenForm from "@/components/auth/ChangePasswordWithTokenForm";
import { Metadata } from "next";

interface Params {
    token: string;
}

export const metadata: Metadata = {
    title: "New Password Setup | YourAppName",
    description: "Enter and confirm your new password to complete the reset process.",
};

export default async function ChangePasswordWithToken({ params }: { params: Params }) {
    const { token } = await params;

    return <ChangePasswordWithTokenForm token={token} />;
}
