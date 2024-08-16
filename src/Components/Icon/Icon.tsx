import clock from "../../assets/clock.svg";
import search from "../../assets/search.svg";

import "./Icon.css";

const svgs = {
  clock,
  search,
};

interface IconProps {
  name: keyof typeof svgs;
  classes?: string;
  alt?: string;
}

function Icon({ name, classes, alt }: IconProps) {
  return (
    <img
      src={svgs[name]}
      className={`icon-${name} ${classes || ""}`}
      alt={alt}
    />
  );
}

export default Icon;
