"use client";

import { useDevelopments } from "@/context/AllDevelopments";

export const GetDevelopmentFromUid = ({ uid }) => {
  const developments = useDevelopments();

  // Find the development with the matching UID
  const matchingDevelopment = developments.find(
    (development) => development.data.uid === uid
  );

  return matchingDevelopment || null; // Return the matching development or null if not found
};
