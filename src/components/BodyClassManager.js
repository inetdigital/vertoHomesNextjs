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

  useEffect(() => {
    // Create the link element
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://use.typekit.net/xno3cen.css";
    link.media = "print"; // Prevent it from blocking rendering
    link.onload = () => {
      link.media = "all"; // Apply styles after loading
    };

    // Append the link element to the document head
    document.head.appendChild(link);

    // Cleanup: Remove the link on component unmount
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return null; // This component does not render anything
}
