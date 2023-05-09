// NAVBAR TOGGLE //
const navbar = document.querySelector(".sidebar-menu");
const hamburgerBtn = document.querySelector(".hamburger-menu");

if (hamburgerBtn) {
	hamburgerBtn.addEventListener("click", () => {
		hamburgerBtn.classList.toggle("hamburger-menu-opened");
		hamburgerBtn.setAttribute("aria-expanded", hamburgerBtn.classList.contains("opened"));
		navbar.classList.toggle("nav--open");
	});
} else {
	console.log("hamburgerBtn is not defined");
}

// quando a janela for redimensionada, remove a classe nav--open
window.addEventListener("resize", () => {
	if (window.innerWidth < 768) {
		if (navbar.classList.contains("nav--open")) {
			navbar.classList.remove("nav--open");
			hamburgerBtn.classList.remove("hamburger-menu-opened");
		}
	} else {
		//se ainda não tiver a classe nav--open, adicione-a
		if (!navbar.classList.contains("nav--open")) {
			navbar.classList.add("nav--open");
			hamburgerBtn.classList.add("hamburger-menu-opened");
		}
	}
});

// DROPDOWN MENU TOGGLE //

//seleciona todos os elementos com a classe dropdown-btn
const dropdownBtn = document.querySelectorAll(".dropdown-btn");

// click event listener para cada elemento com a classe dropdown-btn
dropdownBtn.forEach((btn) => {
	btn.addEventListener("click", () => {
		// seleciona o elemento irmão com a classe dropdown-content
		const dropdownContent = btn.nextElementSibling;
		// toggle class show para o elemento filho
		dropdownContent.classList.toggle("dropdown-show");
	});
});

// se o usuário clicar fora do menu dropdown, feche-o
window.onclick = function (event) {
	if (!event.target.matches(".dropdown-btn")) {
		const dropdowns = document.getElementsByClassName("dropdown-content");
		let i;
		for (i = 0; i < dropdowns.length; i++) {
			const openDropdown = dropdowns[i];
			if (openDropdown.classList.contains("dropdown-show")) {
				openDropdown.classList.remove("dropdown-show");
			}
		}
	}
};
