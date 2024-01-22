import { useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import ChangePassword from "./ChangePassword";

function User() {
  const [showEdit, setShowEdit] = useState(false);

  const onCloseEdit = () => {
    setShowEdit(false);
  };

  return (
    <div className="flex flex-col items-center my-20">
      <FaUserCircle size={300} />
      <div>
        <button
          className="px-10 py-10 m-4 rounded-3xl text-xl bg-sky-400"
          onClick={() => setShowEdit(true)}
        >
          Đổi mật khẩu
        </button>
      </div>

      <ChangePassword
        showModal={showEdit}
        onClose={onCloseEdit}
      />
    </div>
  );
}

export default User;
