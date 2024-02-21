import React from "react";
import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";

function NotificationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-5xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Thông báo</h3>
              <button onClick={onClose}>
                <IoMdClose size={16} />
              </button>
            </div>
            <div className="relative px-6 py-10 flex-auto text-center">
            <p className="text-2xl font-bold">Đợi vài giây đến khi đèn xanh </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="opacity-25 fixed inset-0 z-40 bg-black"
        onClick={onClose}
      ></div>
    </div>
  );
}

NotificationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotificationModal;