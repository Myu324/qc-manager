import React, { useRef } from "react";
import { useEffect } from "react";

function dashboard() {
  const dashboard = useRef(null);
  useEffect(() => {
    console.log(dashboard);
  }, []);

  return <div className="dashboard" ref={dashboard}></div>;
}

export default dashboard;
