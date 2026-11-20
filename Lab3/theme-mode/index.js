const body = document.body;
const buttonTheme = document.getElementById("btn-theme")

const setTheme = (theme) => {
	theme = theme || "light"
	buttonTheme.textContent = (theme=="light") ? "☀️ Light mode" : "🌑 Dark mode"
	body.classList.remove("color-scheme-light")
	body.classList.remove("color-scheme-dark")
	body.classList.add((theme=="light") ? "color-scheme-light" : "color-scheme-dark")
}
setTheme(localStorage.theme)

buttonTheme.onclick = () => {
	localStorage.theme = (localStorage.theme=="light") ? "dark" : "light"
	setTheme(localStorage.theme)
}
