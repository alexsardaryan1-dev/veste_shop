import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  // A React Router hook that gives information about the current URL.
  //   useLocation() returns an object like:
  // {
  //   pathname: "/shop",
  //   search: "",
  //   hash: "",
  //   state: null
  // }
  // You only need: pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  // It means - run this effect every time the URL path changes.

  return null;
};

export default ScrollToTop;
