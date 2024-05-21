export const reducedDIV = (divi) => {
  switch (divi) {
    case "Southeast":
      return "SE";
    case "Southwest":
      return "SW";
    case "Northwest":
      return "NW";
    case "Atlantic":
      return "Atl.";
    case "Central":
      return "Cen.";
    case "Pacific":
      return "Pac.";
    default:
      return "";
  }
};

export const generateRandom = (total) => {
  const rand = parseInt(Math.random() * 10000);
  return rand - parseInt(rand / total) * total;
};
