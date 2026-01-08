const toggle = document.createElement("button");
toggle.textContent = "🌙";
toggle.className = "theme-toggle";
document.querySelector(".header").appendChild(toggle);

toggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
};

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
