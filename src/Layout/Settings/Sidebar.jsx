import { Link, useLocation } from "react-router-dom";
import { settingsLink } from "./Links";

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <>
      <aside className="flex">
        <div className="bg-[#303d4d] pt-0 relative h-full">
          {settingsLink.map((l, i) => (
            <Link to={l.href}>
              <li className={`px-4 pt-2 !list-none ${
                              pathname.includes(l.host)
                                ? "!bg-blue-500 shadow-blue-600"
                                : ""
                            }`}>
                <div
                  className={`d-flex flex-column gap-1 align-items-center 
                            p-2 rounded-md transition-all duration-150 border-1 border-transparent 
                           
                                 `}
                >
                  <img
                    width="36"
                    height="36"
                    src={l.img}
                    alt=""
                  />
                  <span>{l.title}</span>
                </div>
              </li>
            </Link>
          ))}
        </div>

        {settingsLink.map((l, i) =>
          l?.subMenu?.length ? (
            pathname.includes(l.host) ? (
              <div
                className=" bg-[#212b37] end-[-220px]
                    w-[220px] top-0 bottom-0 z-10 px-1 sidebar"
              >
                <div className="d-flex align-items-center justify-content-center gap-2 px-5 pt-3">
                  <img src={l.img} alt="" />
                  <h2 className="fs-4 m-0 font-semibold">{l.title}</h2>
                </div>
                <hr className="my-3" />

                <ul className="">
                  {l?.subMenu?.map((s) => {
                    return (
                      <Link to={s.href} className={``}>
                        <li className={`bg-[#1469BF] px-4 py-2 rounded-1 my-1 mb-1
                        border-1 border-transparent 
                        ${pathname === s.href ? "!ps-12 bg-[#439BF5]" : null}`}>
                          {s.title}
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            ) : null
          ) : null
        )}
        {/* <div className="!border-[#4aef4a] shadow-[0_0_20px_rgba(172,255,47,0.282)] hidden"></div> */}
      </aside>
    </>
  );
};

export default Sidebar;
