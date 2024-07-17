import { useState } from "react";

export default function useToggle() {
  const [toggle, setToggle] = useState(false);

  const toggler = () => {
    setToggle((prevState) => !prevState);
  };

  return { toggle, toggler };
}
