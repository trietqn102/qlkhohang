import PropTypes from "prop-types";

import Header from "~/layouts/components/Header";
import Sidebar from "../components/Sidebar";
import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "~/context/AuthContext";

function DefaultLayout({ children }) {
  const { token } = useContext(AuthContext);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      setAdmin(decode.role === 0);
    }
  }, [token]);

  return (
    <div>
      <Header />

      <div className="flex">
        {admin && token && (
          <div>
            <Sidebar />
          </div>
        )}
        <div className={`mr-64 ml-96 mt-20 w-full`}>{children}</div>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
