
let wrapper = document.querySelector('.wrapper');

let pageSlider = new Swiper('.page', {
	//? Свои классы
	wrapperClass: "page__wrapper",
	slideClass: "page__screen",

	//? Вертикальный слайдер
	direction: 'vertical',

	//? Количество слайдов для показа
	slidesPerView: 'auto',

	//? Включаем параллакс
	parallax: true,


	//? Управление клавиатурой
	keyboard: {
		//* Включить\выключить
		enabled: true,
		//* Включить\выключить только когда слайдер в пределах вьюпорта
		onlyInViewport: true,
		//* Включить\выключить управление клавишами pageUp, pageDown
		pageUpDown: true,
	},

	//? Управление колесом мыши
	mousewheel: {
		//* Чувствительность колеса мыши
		sensitivity: 1,
		//* Класс объекта на котором будет срабатывать прокрутка мышью.
		// eventsTarget: ".image-slider"
	},

	//! Отключение функционала
	//? если слайдов меньше чем нужно
	watchOverflow: true,

	//? Скорость
	speed: 800,

	//? Обновить свайпер при изменении элементов слайдера
	observer: true,

	//? Обновить свайпер при изменении родительских элементов слайдера
	observeParents: true,

	//? Обновить свайпер при изменении дочерних элементов слайда
	observeSlideChildren: true,

	//! Навигация
	//? Буллеты, текущее положение, прогрессбар
	pagination: {
		el: '.page__pagination',
		type: 'bullets',
		clickable: true,
		bulletClass: "page__bullet",
		bulletActiveClass: "page__bullet_active",
	},
	//? Скролл
	scrollbar: {
		el: '.page__scroll',
		dragClass: "page__drag-scroll",
		//* Возможность перетаскивать скролл
		draggable: true
	},

	//! Отключаем автоинициализацию
	init: false,

	//! События
	on: {
		//? Событие инициализации
		init: function () {
			menuSlider();
			setScrollType();
			wrapper.classList.add('_loaded'); //! при ініціалізації даного слайдера до контенту добавляється даний клас і всі анімації спрацьовують
		},
		// Событие смены слайда
		slideChange: function () {
			//! при зміні слайда спрацює цей метод і видалить усі класи активності у силок, встановивши його на поточному слайді
			menuSliderRemove();
			menuLinks[pageSlider.realIndex].classList.add('_active');
		},
		resize: function () { //! при зміні вікна браузера, викликається метод для активації вільного режиму
			setScrollType();
		}
	},
});

let menuLinks = document.querySelectorAll('.menu__link');

function menuSlider() {
	if (menuLinks.length > 0) {
		menuLinks[pageSlider.realIndex].classList.add('_active'); //! із об'єкта слайдера беремо поточний індекс слайду і присвоюємо поточному посиланню необхідні стилі
		for (let index = 0; index < menuLinks.length; index++) {
			const menuLink = menuLinks[index];
			menuLink.addEventListener("click", function (e) {
				menuSliderRemove(); //? видаляємо клас активності у всіх посилань
				pageSlider.slideTo(index, 800); //! перелистуєимо до поточного слайду
				menuLink.classList.add('_active');
				e.preventDefault();
			});
		}
	}
}

function menuSliderRemove() {
	let menuLinkActive = document.querySelector('.menu__link._active');
	if (menuLinkActive) {
		menuLinkActive.classList.remove('_active');
	}
}


//! якщо контент поточного слайду
function setScrollType() {
	if (wrapper.classList.contains('_free')) {
		wrapper.classList.remove('_free');
		pageSlider.params.freeMode = false;
	}
	for (let index = 0; index < pageSlider.slides.length; index++) {
		const pageSlide = pageSlider.slides[index];
		const pageSlideContent = pageSlide.querySelector('.screen__content'); //! контент в середині кожного слайду
		if (pageSlideContent) {
			const pageSlideContentHeight = pageSlideContent.offsetHeight; //! отримуємо висоту контенту і перевіряємо чи дана висота більша за висоту видимої частини
			if (pageSlideContentHeight > window.innerHeight) {
				wrapper.classList.add('_free'); //? для приховування точок пагінації
				pageSlider.params.freeMode = true; //! включаємо вільний режим в слайдера
				break;
			}
		}
	}
}

pageSlider.init(); //! запускаємо слайдер вручну