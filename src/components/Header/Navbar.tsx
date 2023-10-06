import { useNavigate } from "react-router-dom";
import ProfilePic from "../../assets/img/undraw_profile.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary topbar static-top shadow">
      <span className="navbar-brand mb-0">
        <b>GitHub</b> Jobs
      </span>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              className="img-profile rounded-circle"
              src={ProfilePic}
              width={30}
            />
          </a>

          <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              data-toggle="modal"
              data-target="#logoutModal"
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
