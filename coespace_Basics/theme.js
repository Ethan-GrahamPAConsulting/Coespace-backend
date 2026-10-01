const themeToggleButton = document.getElementById("theme-toggle");

if (themeToggleButton instanceof HTMLButtonElement) {
	themeToggleButton.addEventListener("click", () => {
		const isDarkTheme = document.body.classList.toggle("dark-mode");

		themeToggleButton.textContent = isDarkTheme
			? "Switch to Light Theme"
			: "Switch to Dark Theme";
		themeToggleButton.setAttribute("aria-pressed", String(isDarkTheme));
	});
}
 