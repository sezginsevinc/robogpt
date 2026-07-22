import type { Program } from "./programs";

/**
 * Each discipline owns one hue of the spark. Color here is meaning, not
 * decoration — it lets Chapter 4's rooms, the program pages and the artifacts
 * read as five distinct worlds while ember stays the brand heart.
 */
export type Room = Program["room"];

export const hue: Record<Room, string> = {
  robotics: "#ff7a1a",
  science: "#5fe0a0",
  mathematics: "#a98cff",
  logic: "#ffc24b",
  technology: "#ff7ab6",
};
