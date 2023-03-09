/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        MoB: "MontserratBold",
        MoR: "MontserratRegular",
        MoM: "MontserratMedium",
        MoL: "MontserratLight",
        MoS: "MontserratSemiBold",
        InM: "InterMedium",
        InR: "InterRegular",
        InB: "InterBold",
        InL: "InterLight",
        InS: "InterSemiBold",
      }
    },
  },
  plugins: [],
}
