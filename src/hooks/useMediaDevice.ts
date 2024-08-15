import { useState, useEffect } from "react";

// Define breakpoints for different device types
const BREAKPOINTS = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width: 768px) and (max-width: 1024px)",
  desktop: "(min-width: 1025px)",
};

// Helper function to get the device type
const getDeviceType = () => {
  if (window.matchMedia(BREAKPOINTS.mobile).matches) {
    return "mobile";
  }
  if (window.matchMedia(BREAKPOINTS.tablet).matches) {
    return "tablet";
  }
  return "desktop";
};

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(getDeviceType);

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    // Add event listeners for resizing
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile: deviceType === "mobile" };
};

export default useDeviceType;
