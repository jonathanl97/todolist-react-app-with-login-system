export default function Category({ category }) {
  const checkColor = (category) => {
    switch (category) {
      case "Home":
        return "lightgreen";
      case "Work":
        return "lightcoral";
      case "School":
        return "lightgoldenrodyellow";
      case "Personal":
        return "lightskyblue";
      case "Other":
        return "lightslategrey";
      default:
    }
  };

  return <h3 style={{ color: `${checkColor(category)}` }}>{category}</h3>;
}
