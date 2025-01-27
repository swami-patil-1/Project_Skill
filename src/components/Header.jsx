import "../App.css";
import { Link } from "react-router-dom";
import SkillForgeImage from "../assets/SkillForge_5.jpg";

function Header() {
  return (
    <>
      <header className="p-3 text-bg-dark padding-header">
        <div className=" width">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <img
                src={SkillForgeImage} // Replace with your image path
                alt="Your Alt Text" // Add appropriate alt text for accessibility
                width="140" // Set the desired width
                height="50" // Set the desired height
                className="me-2" // Keep any additional classes you need
              />
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/" className="nav-link px-4 text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="nav-link px-3 text-white">
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/skill-assessment"
                  className="nav-link px-3 text-white"
                >
                  Skill Assessment
                </Link>
              </li>
              <li>
                <Link to="/my-profile" className="nav-link px-3 text-white">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/contact" className="nav-link px-3 text-white">
                  Contact Us
                </Link>
              </li>
            </ul>

            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
              role="search"
            >
              <input
                type="search"
                className="form-control form-control-dark text-black"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>

            <div className="text-end">
              <Link to="/login">
                <button type="button" className="btn btn-outline-light me-2">
                  Login
                </button>
              </Link>

              <Link to="/signup">
                <button type="button" className="btn btn-warning">
                  Sign-up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
