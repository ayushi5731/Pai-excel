// import React from "react";

// const themes = [
//   { name: "Orange", className: "theme-orange" },
//   { name: "Blue", className: "theme-blue" },
//   { name: "Purple", className: "theme-purple" },
//   { name: "Green", className: "theme-green" },
//   { name: "Dark", className: "theme-dark" },
// ];

// const ColorPalette = () => {
//   const handleThemeChange = (themeClass) => {
//     // Remove all theme classes first
//     themes.forEach((theme) => document.body.classList.remove(theme.className));
//     // Add selected theme class
//     document.body.classList.add(themeClass);
//   };

//   return (
//     <div className="flex gap-2 items-center">
//       {themes.map((theme) => (
//         <button
//           key={theme.name}
//           onClick={() => handleThemeChange(theme.className)}
//           className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer"
//           style={{
//             backgroundColor: getThemeColor(theme.className),
//           }}
//           title={theme.name}
//         />
//       ))}
//     </div>
//   );
// };

// // Helper to map class names to color swatches
// const getThemeColor = (themeClass) => {
//   switch (themeClass) {
//     case "theme-orange":
//       return "#FFF7ED";
//     case "theme-blue":
//       return "#DBEAFE";
//     case "theme-purple":
//       return "#EDE9FE";
//     case "theme-green":
//       return "#DCFCE7";
//     case "theme-dark":
//       return "#0F172A";
//     default:
//       return "#ffffff";
//   }
// };

// export default ColorPalette;









import React from "react";
import { useTheme } from "../context/ThemeProvider"; // <-- corrected relative path
// <-- import useTheme

const themes = [
  {
    name: "Orange",
    values: { background: "#FFF7ED", text: "#78350F" },
  },
  {
    name: "Blue",
    values: { background: "#DBEAFE", text: "#1E3A8A" },
  },
  {
    name: "Purple",
    values: { background: "#EDE9FE", text: "#4C1D95" },
  },
  {
    name: "Green",
    values: { background: "#DCFCE7", text: "#14532D" },
  },
  {
    name: "Dark",
    values: { background: "#0F172A", text: "#F1F5F9" },
  },
];

const ColorPalette = () => {
  const { setTheme } = useTheme(); // <-- use context

  const handleThemeChange = (themeValues) => {
    setTheme(themeValues); // <-- update theme using context
  };

  return (
    <div className="flex gap-2 items-center">
      {themes.map((theme) => (
        <button
          key={theme.name}
          onClick={() => handleThemeChange(theme.values)}
          className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer"
          style={{
            backgroundColor: theme.values.background,
          }}
          title={theme.name}
        />
      ))}
    </div>
  );
};

export default ColorPalette;






