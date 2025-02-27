import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Card from "../components/Card";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Card",
  component: Card,
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
};

const movieData = [
  {
    id: "1",
    title: "Cartoon 1",
    date: "2024-01-01",
    image:
      "https://f.woowoowoowoo.net/resize/180x270/a8/19/a81999f0314ba9f41059360bfd2695fb/a81999f0314ba9f41059360bfd2695fb.jpg",
  },
  {
    id: "2",
    title: "Cartoon 2",
    date: "2024-02-01",
    image:
      "https://f.woowoowoowoo.net/resize/180x270/79/c2/79c27eafa1271db5d9711ece21f8dd20/79c27eafa1271db5d9711ece21f8dd20.jpg",
  },
  {
    id: "3",
    title: "Cartoon 3",
    date: "2024-03-01",
    image:
      "https://f.woowoowoowoo.net/resize/180x270/8e/fa/8efa9188d35595c4fda9ebc55a72f517/8efa9188d35595c4fda9ebc55a72f517.jpg",
  },
];

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  movieArray: movieData,
  originalMovieArray: movieData,
};

export const SearchResult = Template.bind({});
SearchResult.args = {
  movieArray: movieData.filter((cartoon) =>
    cartoon.title.toLowerCase().includes("cartoon 2")
  ),
  originalMovieArray: movieData,
};

export const EmptySearch = Template.bind({});
EmptySearch.args = {
  movieArray: [],
  originalMovieArray: movieData,
};

EmptySearch.parameters = {
  backgrounds: {
    default: "rgba(163, 159, 159, 0.15)",
  },
};

EmptySearch.decorators = [
  (Story) => (
    <div
      style={{
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#e0e0e0",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "24px", color: "#555" }}>No Results Found</h2>
      <p style={{ fontSize: "16px", color: "#888" }}>
        We couldn't find any cartoons matching your search.
      </p>
      <Story />
    </div>
  ),
];

export const AlternateStyle = Template.bind({});
AlternateStyle.args = {
  movieArray: movieData,
  originalMovieArray: movieData,
};

AlternateStyle.decorators = [
  (Story) => (
    <div
      style={{
        padding: "20px",
        borderRadius: "15px",
        backgroundColor: "#fafafa",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        textAlign: "left",
      }}
    >
      <h2 style={{ fontSize: "26px", color: "#333" }}>Movie List</h2>
      <p style={{ fontSize: "18px", color: "#666" }}>
        Explore the latest cartoons and enjoy your time!
      </p>
      <Story />
    </div>
  ),
];
