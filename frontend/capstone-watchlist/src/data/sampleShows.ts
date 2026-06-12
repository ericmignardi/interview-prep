import type { Show } from "../types/types";

// Hard-coded shows for Milestone 1 — so we can build the UI before wiring the
// real API. Milestone 2 replaces this with a fetch from TVmaze.
export const sampleShows: Show[] = [
  {
    id: 1,
    name: "Breaking Bad",
    genres: ["Drama", "Crime", "Thriller"],
    summary: "<p>A high school chemistry teacher turns to making meth.</p>",
    image: {
      medium: "https://placehold.co/210x295?text=Breaking+Bad",
      original: "",
    },
    rating: { average: 9.3 },
  },
  {
    id: 2,
    name: "Stranger Things",
    genres: ["Drama", "Fantasy", "Horror"],
    summary: "<p>Kids in a small town uncover supernatural mysteries.</p>",
    image: {
      medium: "https://placehold.co/210x295?text=Stranger+Things",
      original: "",
    },
    rating: { average: 8.7 },
  },
  {
    id: 3,
    name: "The Office",
    genres: ["Comedy"],
    summary: "<p>A mockumentary about office workers.</p>",
    image: {
      medium: "https://placehold.co/210x295?text=The+Office",
      original: "",
    },
    rating: { average: 8.6 },
  },
  {
    id: 4,
    name: "The Mandalorian",
    genres: ["Action", "Adventure", "Science-Fiction"],
    summary: "<p>A lone bounty hunter in the outer reaches of the galaxy.</p>",
    image: {
      medium: "https://placehold.co/210x295?text=Mandalorian",
      original: "",
    },
    rating: { average: 8.5 },
  },
  {
    id: 5,
    name: "Better Call Saul",
    genres: ["Drama", "Crime"],
    summary: "<p>The origin story of lawyer Jimmy McGill.</p>",
    image: {
      medium: "https://placehold.co/210x295?text=Better+Call+Saul",
      original: "",
    },
    rating: { average: 8.8 },
  },
  {
    id: 6,
    name: "The Bear",
    genres: ["Drama", "Comedy"],
    summary: "<p>A chef returns home to run his family sandwich shop.</p>",
    image: {
      medium: "https://placehold.co/210x295?text=The+Bear",
      original: "",
    },
    rating: { average: 8.4 },
  },
];
