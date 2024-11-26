"use client";

import { useEffect } from "react";
import { useMenuStatus } from "@/context/MenuStatus";

export default function BodyClassManager() {
  const { menuStatus, setMenuStatus } = useMenuStatus();

  useEffect(() => {
    // Dynamically update the body class
    document.body.classList.toggle("overflow-hidden", menuStatus === true);
    document.body.classList.toggle("allow-scroll", menuStatus === false);
  }, [menuStatus]);

  useEffect(() => {
    setMenuStatus(false);
  }, []);

  return null; // This component does not render anything
}
