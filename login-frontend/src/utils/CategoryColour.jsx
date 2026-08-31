export default function Category({ category }) {
  const checkColor = (category) => {
    switch (category) {
      case "Home":
        return "green";
      case "Work":
        return "red";
      case "School":
        return "yellow";
      case "Personal":
        return "blue";
      case "Other":
        return "grey";
      default:
    }
  };
  //maybe change colours to light variants
  return <h3 style={{ color: `${checkColor(category)}` }}>{category}</h3>;
}
