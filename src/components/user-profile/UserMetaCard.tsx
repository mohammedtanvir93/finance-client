"use client";
import React from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Image from "next/image";
import { useMe } from "@/hooks/query/user/useMe";
import { KeyRound } from 'lucide-react';
import UserProfileEditForm from "./UserProfileEditForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function UserMetaCard() {
  const { data: loggedInUser } = useMe();
  const { isOpen, closeModal } = useModal();
  const { isOpen: isChangePasswordOpen, openModal: openChangePasswordModal, closeModal: closeChangePasswordModal } = useModal();

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <Image
                width={80}
                height={80}
                src="/images/user/profile.png"
                alt="user"
              />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {loggedInUser?.fullname}
              </h4>
            </div>
          </div>
          <div className="flex flex-col items-end w-full">
            <button
              onClick={openChangePasswordModal}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              <KeyRound width={18} height={18} />
              Change Password
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isChangePasswordOpen} onClose={closeChangePasswordModal} className="max-w-[700px] m-4">
        <ChangePasswordForm closeModal={closeChangePasswordModal} />
      </Modal>
    </>
  );
}
