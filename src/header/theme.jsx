import { useState } from "react";
import "./theme.css";

const root = document.documentElement;
function Theme() {
  const [darkmode, setDarkmode] = useState(false);
  function handelDarkmode() {
    changeTheme(darkmode);

    setDarkmode((curr) => !curr);
  }
  return (
    <div className="theme-control">
      <label className="switch">
        <input type="checkbox" id="darkmode" onChange={handelDarkmode} />
        <span className="slider round"></span>
      </label>
      {/* <input
        type="radio"
        className="theme-radio radio-green"
        name="theme"
        checked
        onChange={() => {
          handelColorChange(1);
        }}
      />
      <input
        type="radio"
        className="theme-radio radio-red"
        name="theme"
        onChange={() => {
          handelColorChange(2);
        }}
      />
      <input
        type="radio"
        className="theme-radio radio-yellow"
        name="theme"
        onChange={() => {
          handelColorChange(3);
        }}
      /> */}
    </div>
  );
}

const changeTheme = (isDark) => {
  // const colorsDark = [
  //   ["rgb(84, 255, 91)", "rgb(179, 255, 182)"],
  //   ["rgb(255,100,61)", "rgb(255,97,97)"],
  //   ["rgb(255,247,0)", "rgb(255,245,170)"],
  // ];

  const colors = [["#034100", "#b2b2b2cf"]];

  if (!isDark) {
    root.style.setProperty("--clr-black", "rgb(240, 255, 236)");
    root.style.setProperty("--clr-white", "black");
    root.style.setProperty("--clr-bg", colors[0][1]);
    root.style.setProperty("--clr-primary", colors[0][0]);
  } else {
    root.style.setProperty("--clr-black", "black");
    root.style.setProperty("--clr-white", "rgb(240, 255, 236)");
    root.style.setProperty("--clr-bg", "rgba(41, 41, 41, 0.95)");
    root.style.setProperty("--clr-primary", "rgb(84, 255, 91)");
  }
};

export default Theme;
