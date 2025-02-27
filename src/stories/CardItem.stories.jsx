import React from "react";
import CardItem from "../components/CardItem";
import "../components/Carditem.module.css";

export default {
  title: "Components/CardItem",
  component: CardItem,
};

const Template = (args) => <CardItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: "1",
  title: "Dog Days Out",
  image:
    "https://f.woowoowoowoo.net/resize/180x270/a8/19/a81999f0314ba9f41059360bfd2695fb/a81999f0314ba9f41059360bfd2695fb.jpg",
  onClick: (id) => alert(`Клікнуто на картку з ID: ${id}`),
};
Default.decorators = [
  (Story) => (
    <div style={{ width: "180px", height: "270px" }}>
      <Story />
    </div>
  ),
];

// Додаткові стилі для конкретної варіації
export const CustomStyle = Template.bind({});
CustomStyle.args = {
  id: "2",
  title: "Dog Days Out",
  image:
    "https://f.woowoowoowoo.net/resize/180x270/a8/19/a81999f0314ba9f41059360bfd2695fb/a81999f0314ba9f41059360bfd2695fb.jpg",
  onClick: (id) => alert(`Клікнуто на картку з ID: ${id}`),
};
CustomStyle.decorators = [
  (Story) => (
    <div
      style={{
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "4px 4px 10px rgba(33, 33, 33, 0.2)",
        backgroundColor: "#f8f8f8",
        transition: "transform 0.3s ease-in-out",
        width: "200px",
      }}
    >
      <div
        style={{
          width: "180px",
        }}
      >
        <Story />
      </div>
    </div>
  ),
];

export const HoverEffect = Template.bind({});
HoverEffect.args = {
  id: "3",
  title: "Dog Days Out",
  image:
    "https://f.woowoowoowoo.net/resize/180x270/a8/19/a81999f0314ba9f41059360bfd2695fb/a81999f0314ba9f41059360bfd2695fb.jpg",
  onClick: (id) => alert(`Клікнуто на картку з ID: ${id}`),
};
HoverEffect.decorators = [
  (Story) => (
    <div
      style={{
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#f8f8f8",
        transition: "transform 0.3s ease-in-out",
        width: "200px",
      }}
    >
      <div
        style={{
          width: "180px",
          transition: "transform 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <Story />
      </div>
    </div>
  ),
];
