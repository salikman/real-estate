// Проверка поддержки webp, класса _webp или _no-webp для HTML
function isWebp() {
	// Проверка поддержки webp
	function testWebp(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	// Добавление класса _webp или _no-webp для HTML
	testWebp(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	})
}

isWebp();


document.addEventListener("DOMContentLoaded", function () {
	// Отримуємо посилання на всі набори вкладок
	const tabSets = document.querySelectorAll(".tabs");

	// Функція, яка встановлює активний таб для конкретного набору
	function setActiveTab(tabSet, index) {
		// Отримуємо посилання на елементи вкладок та вмісту для цього набору
		const tabLinks = tabSet.querySelectorAll(".tab-links li");
		const tabContents = tabSet.querySelectorAll(".tab-content");

		// Знімаємо клас 'active' з усіх табів і вмісту в даному наборі
		tabLinks.forEach((link) => link.classList.remove("active"));
		tabContents.forEach((content) => content.classList.remove("active"));

		// Встановлюємо клас 'active' для вибраного табу і відповідного вмісту
		tabLinks[index].classList.add("active");
		tabContents[index].classList.add("active");
	}

	// Додаємо обробник події для кожного набору вкладок
	tabSets.forEach((tabSet) => {
		const tabLinks = tabSet.querySelectorAll(".tab-links li");

		tabLinks.forEach((link, index) => {
			link.addEventListener("click", function (event) {
				event.preventDefault(); // Забороняємо перехід по посиланню
				setActiveTab(tabSet, index); // Встановлюємо активний таб для цього набору
			});
		});

		// Встановлюємо активний таб за замовчуванням для кожного набору (наприклад, перший таб)
		setActiveTab(tabSet, 0);
	});
});

document.querySelector('.header__collapse').addEventListener('click', function () {
	document.querySelector('.header').classList.toggle('open');
	document.querySelector('body').classList.toggle('lock');
});

window.addEventListener('click', function (e) {
	if (!document.getElementById('header').contains(e.target) && (!document.getElementById('logo').contains(e.target))) {
		document.getElementById('header').classList.remove('open');
		document.querySelector('body').classList.remove('lock');
	}
})


$(document).ready(function () {
	$('.justselect').each(function () {
		$(this).wrap('<div class="justselect-wrapper">');

		var justselectUL = document.createElement("ul");
		justselectUL.className = "justselect-list";

		var justselectTitle = document.createElement("div");
		justselectTitle.className = "justselect-title";

		var select = $(this).parent(),
			option = $(this).find($('option'));

		select.append(justselectTitle, justselectUL);

		for (i = 0; i < option.length; i++) {
			var justselectLI = document.createElement("li");
			justselectUL.append(justselectLI),
				justselectLI_option = select.find($('.justselect-list li'));

			justselectLI_option.eq(i).text(option.eq(i).text());

			if (option.eq(i).attr('selected')) {
				justselectLI_option.eq(i).addClass('selected');
				select.find($('.justselect-title')).text(justselectLI_option.eq(i).text());
			}

			justselectLI_option.click(function () {
				$(this).addClass('selected').siblings().removeAttr('class');
				var index = $(this).index();

				select.find($('.justselect-list')).fadeOut();
				$('.justselect-body-overlay').remove();

				option.eq(index).attr("selected", true).siblings().removeAttr("selected");
				select.find($('.justselect-title')).text($(this).text());
			});
		}

		select.find($('.justselect-title')).click(function () {
			select.find($('.justselect-list')).fadeToggle();

			var bodyOverlay = document.createElement("div");
			bodyOverlay.className = "justselect-body-overlay";
			$('body').prepend(bodyOverlay);

			$('.justselect-body-overlay').click(function () {
				select.find($('.justselect-list')).fadeToggle();
				$('.justselect-body-overlay').remove();
			});
		});
	});
});


// Функция для изменения вида списка при выборе различных input элементов
function changeView() {
	const gridInput = document.getElementById("items-grid");
	const listInput = document.getElementById("items-list");
	const mapInput = document.getElementById("items-map");
	const apartmentsList = document.querySelector(".page__apartments-list");

	const isSmallScreen = window.innerWidth < 992;

	if (gridInput.checked && !isSmallScreen) {
		apartmentsList.classList.add("items-grid");
	} else {
		apartmentsList.classList.remove("items-grid");
	}

	if (listInput.checked && !isSmallScreen) {
		apartmentsList.classList.add("items-list");
	} else {
		apartmentsList.classList.remove("items-list");
		apartmentsList.classList.add("items-grid");
	}

	if (mapInput.checked && !isSmallScreen) {
		apartmentsList.classList.add("items-map");
	} else {
		apartmentsList.classList.remove("items-map");
		apartmentsList.classList.add("items-grid");
	}
}

document.getElementById("items-grid").addEventListener("change", changeView);
document.getElementById("items-list").addEventListener("change", changeView);
document.getElementById("items-map").addEventListener("change", changeView);

changeView();


const openFilterLink = document.querySelector('.open-filter');
const closeFilterLink = document.querySelector('.close');
const apartments = document.querySelector('.page__apartments');
const body = document.querySelector('body');

openFilterLink.addEventListener('click', function (event) {
	event.preventDefault(); 
	apartments.classList.add('active-filter');
	body.classList.add('page-lock');
});

closeFilterLink.addEventListener('click', function (event) {
	event.preventDefault();
	apartments.classList.remove('active-filter');
	body.classList.remove('page-lock');
});