import { Link } from "react-router-dom";
import { AiOutlineFacebook } from "react-icons/ai";
import { MdOutlineAttachEmail } from "react-icons/md";
import { useContext } from "react";
import {
  CiUser,
  CiLinkedin,
  CiTwitter,
  CiInstagram,
  CiLogout,
} from "react-icons/ci";

import routes from "~/config/routes";
import { AuthContext } from "~/context/AuthContext";
const IconLink = [
  {
    title: "facebook",
    icon: <AiOutlineFacebook />,
    link: "https://www.facebook.com/",
  },
  {
    title: "instagram",
    icon: <CiInstagram />,
    link: "https://www.instagram.com/",
  },
  {
    title: "linkedin",
    icon: <CiLinkedin />,
    link: "https://www.linkedin.com/",
  },
  {
    title: "twitter",
    icon: <CiTwitter />,
    link: "twitter",
  },
];

function Header() {
  const { token, logOut } = useContext(AuthContext);

  return (
    <div>
      <div className="w-full h-20 flex md:justify-around z-10 fixed items-center text-xl bg-[#008080] text-white">
        <div className="md:flex hidden">
          <MdOutlineAttachEmail size={20} className="mr-2" />
          <a href="mailto:Trietqn23@gmail.com">Trietqn23@gmail.com</a>
          <span className="border-r-[1px] border-neutral-300 ml-6 mr-6"></span>
          <p>FreeShip cho khách hàng đăng kí VIP</p>
        </div>

        <div className="flex items-center">
          {IconLink.map((item) => (
            <Link
              to={item.link}
              key={item.title}
              className="px-2 py-6 text-3xl hover:text-4xl relative"
            >
              {item.icon}
            </Link>
          ))}
          {!token ? (
            <Link
              to={routes.login}
              className="px-4 py-6 flex hover:bg-neutral-300/20"
            >
              <CiUser size={18} className="mr-2" />
              Đăng nhập
            </Link>
          ) : (
            <button
              onClick={logOut}
              className="px-4 py-6 flex hover:bg-neutral-300/20"
            >
              <CiLogout size={18} className="mr-2" />
              Đăng xuất
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
