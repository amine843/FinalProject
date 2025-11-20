// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        borderBounce: {
          "0%, 100%": { borderWidth: "2px", borderColor: "#3b82f6" }, // أزرق رفيع
          "50%": { borderWidth: "6px", borderColor: "#ef4444" },       // أحمر عريض
        },
      },
      animation: {
        "border-bounce": "borderBounce 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
