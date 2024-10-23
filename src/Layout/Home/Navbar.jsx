import { Link, useLocation } from "react-router-dom";
import { links } from "./Links";

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <nav
      style={{ backgroundColor: "#303d4d" }}
      className="d-flex align-items-center justify-content-between px-4 py-2"
    >
      <div className="d-flex align-items-center gap-4">
        {links.map((l, index) => (
          <Link to={l.href} key={index} className="text-decoration-none pb-1">
            <span
              className={`text-white pb-2 ${
                l.href === pathname ? "border-b-2 border-blue-500" : ""
              } d-flex gap-1 items-end`}
            >
              <img src={l.img} alt={`${l.title} icon`} />
              {l.title}
            </span>
          </Link>
        ))}
      </div>

      {/* Device select dropdown can be added here if needed */}
    </nav>
  );
};

export default Navbar;
