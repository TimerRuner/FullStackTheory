//! Инициализируем Swiper для .image-slider
let myImageSlider = new Swiper('.image-slider', {

//! Стрелки
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},

//! Навигация
//! Буллеты, текущее положение, прогрессбар
	pagination: {
		el: '.swiper-pagination',
/*
	?Буллеты
		type: 'bullets',
		clickable: true,

	?Динамические буллеты - зменьшують розміри точок, навколо активної по спаду
		dynamicBullets: true,


	?Кастомные буллеты - самостійно прописуємо, як відображатиметься інформація в булет вписується (індекс слайду, якому він належить)
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + '</span>';
		},
		*/
/*
	?Фракция - виводить рахунок слайдів в форматі 1/5...
		type: 'fraction',

	?Кастомный вывод фракции - Формуємо структуру фракції, зручним нам способом
		renderFraction: function (currentClass, totalClass) {
			return 'Фото <span class="' + currentClass + '"></span>' +
				' из ' +
				'<span class="' + totalClass + '"></span>';
		},
		*/
//? Прогрессбар
		//type: 'progressbar'
	},


//! Скролл
	/*
	scrollbar: {
		el: '.swiper-scrollbar',
?Возможность перетаскивать скролл
		draggable: true
	},
	*/
//* Включение/отключение
	//* перетаскивания на ПК
	simulateTouch: true,
	//* Чувствительность свайпа 0-... - зусилля прикладені для перетаскування слайда
	touchRatio: 1,
	//* Угол срабатывания свайпа/перетаскивания
	touchAngle: 45,
	//* Курсор перетаскивания в формі руки
	grabCursor: true,

	//* Переключение при клике на слайд
	slideToClickedSlide: false,

//? Навигация по хешу
	hashNavigation: {
		//*Отслеживать состояние - навігація з допомогою стрілок браузера
		watchState: true,
	},

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

		//* Класс объекта на котором будет срабатывать прокрутка мышью. ! клас має бути унікальним
		// eventsTarget: ".image-slider"
	},

//? Автовысота
	autoHeight: false,

//? Количество слайдов для показа (якщо ми задаємо параметр 'auto', то в стилі задаємо слайду swiper-slide - width: auto)
	slidesPerView: 3,

	//* Отключение функционала если слайдов меньше чем нужно
	watchOverflow: true,

//? Отступ между слайдами
	spaceBetween: 30,

//? Количество пролистываемых слайдов
	slidesPerGroup: 1,

//? Активный слайд по центру
	centeredSlides: false,

//? Стартовый слайд - задаємо вручну індекс першого слайду для показу.
	initialSlide: 0,

//? Мультирядность - важливо відключити автовисоту і в стилях задати потібні налаштування див. css
	slidesPerColumn: 1,

//? Бесконечный слайдер (відключаємо скрол, так як функціонує не коректно, відключити мультирядність)
	loop: false,

//? Кол-во дублирующих слайдов (якщо slidePerView: 'auto', то в даному параметрі ми вручну вкахуємо к-сть дубльованих слайдів)
	loopedSlides: 0,

//? Свободный режим - дозволяє перетягувати слайдер скролом чи вручну без фіксованих позицій, як стрічку, або проскролвати колесом мишки
	freeMode: true,

//? Автопрокрутка
	/*
	autoplay: {
*Пауза между прокруткой
		delay: 1000,

*Закончить на последнем слайде (відключити безкінечність)
		stopOnLastSlide: true,

*Отключить после ручного переключения
		disableOnInteraction: false
	},
	*/

//? Скорость
	speed: 800,

//? Вертикальный слайдер (vertical, horizontal) - задаємо в стилях
	direction: 'horizontal',


//!Эффекты переключения слайдов.
	//* Листание
	effect: 'slide',

	/*
!Эффекты переключения слайдов.
	*Cмена прозрачности
	effect: 'fade',

	*Дополнение к fade
	fadeEffect: {
		*Параллельная смена прозрачности
		crossFade: true
	},
	*/
	/*


	*Эффекты переключения слайдов.
	*Переворот
	effect: 'flip',

	*Дополнение к flip
	flipEffect: {
		*Тень
		slideShadows: true,
		*Показ только активного слайда
		limitRotation: true
	},
	*/
	/*
	*Эффекты переключения слайдов.
	*Куб
	effect: 'cube',

	*Дополнение к cube
	cubeEffect: {
		*Настройки тени
		slideShadows: true,
		shadow: true,
		shadowOffset: 20,
		shadowScale: 0.94
	},
	*/
	/*
	*Эффекты переключения слайдов.
	*Эффект потока
	effect: 'coverflow',

	*Дополнение к coverflow
	coverflowEffect: {
		*Угол
		rotate: 20,
		*Наложение
		stretch: 50,
		*Тень
		slideShadows: true,
	},
	*/
	/*

!Брейк поинты (адаптив)
	*Ширина экрана
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		480: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 3,
		}
	},
	*/
	/*

	*Брейк поинты (адаптив)
	*Соотношение сторон
	breakpoints: {
		'@0.75': {
			slidesPerView: 1,
		},
		'@1.00': {
			slidesPerView: 2,
		},
		'@1.50': {
			slidesPerView: 3,
		}
	},
	*/
	//! Оптимізація через lazy loading

	//? Отключить предзагрузка картинок
	preloadImages: false,
	// Lazy Loading
	// (подгрузка картинок)
	lazy: {
		//*Подгружать на старте переключения слайда
		loadOnTransitionStart: false,
		//* Подгрузить предыдущую и следующую картинки
		loadPrevNext: false,
	},
	//? якщо в нас slidesPerView: 'auto', то вкзуємо праметри нижче
	//* Слежка за видимыми слайдами
	watchSlidesProgress: true,
	//* Добавление класса видимым слайдам
	watchSlidesVisibility: true,

//! Зум картинки
	zoom: {
		//* Макимальное увеличение
		maxRatio: 5,
		//* Минимальное увеличение
		minRatio: 1,
	},

//! Миниатюры (превью)
	/*
	thumbs: {
		*Свайпер с мениатюрами и его настройки
		swiper: {
			el: '.image-mini-slider',
			slidesPerView: 5,
		}
	},
	*/
	/*
	!Передача управления слайдера з картинками в руки слайдера з текстом
	controller: {
		control: myTextSlider
	},
	*/

	//! для ситуацій, коли слайдер прихований з початку (елемент таба)
	//* Обновить свайпер при изменении элементов слайдера
	observer: true,

	//* Обновить свайпер при изменении родительских элементов слайдера
	observeParents: true,

	//* Обновить свайпер при изменении дочерних элементов слайда
	observeSlideChildren: true,

//! Виртуальные слайды
//* формирование слайдера динамічески
	/*
	virtual: {
		slides: (function () {
			let slide = []
			for (let i = 0; i < 500; i++) {
				slide.push(`<div class="image-slider__text">Слайд №${i}</div>`);
			}
			return slide;
		}()),
	},
	*/
	/*
!Доступность для людей із обмеженими можливостями
	a11y: {
		*Включить/выключить
		enabled: true,
		*Сообщения
		prevSlideMessage: 'Previous slide',
		nextSlideMessage: 'Next slide',
		firstSlideMessage: 'This is the first slide',
		lastSlideMessage: 'This is the last slide',
		paginationBulletMessage: 'Go to slide {{index}}',
		notificationClass: 'swiper-notification',
		containerMessage: '',
		containerRoleDescriptionMessage: '',
		itemRoleDescriptionMessage: '',
		// и т.д.
	},
	*/
	/*
	*События
	on: {
		*Событие инициализации
		init: function () {
			console.log('Слайдер запущен!');
		},
		*Событие смены слайда
		slideChange: function () {
			console.log('Слайд переключен');
		}
	},
	*/
});

/*
!Слайдер в слайдере
new Swiper('.image-in-slider', {
	*Курсор перетаскивания
	grabCursor: true,

	*Навигация пагинация, текущее положение, прогрессбар
	pagination: {
		el: '.swiper-pagination',

		*Буллеты
		clickable: true,
	},

	*Корректная работа перетаскивания\свайпа для дочернего слайдера
	nested: true,
});
*/
/*
!Еще один слайдер - для ситуацій, коли 2 слайдера розділені контентом і потрібно лише одному слайдеру управління, всі параменти показу і структури слайдерів мають бути одинакові
let myTextSlider = new Swiper('.text-slider', {
	*Количество слайдов для показа
	slidesPerView: 3,
	*Отступ между слайдами
	spaceBetween: 30,
});

*Передача управления
myImageSlider.controller.control = myTextSlider;
myTextSlider.controller.control = myImageSlider;
*/

/*
!Параллакс слайдер
new Swiper('.parallax-slider', {
	*Включаем параллакс
	parallax: true,
	*скорость переключения
	speed: 2000,
	*Стрелки
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
});
*/

//! для керування слайдером із інших файлів, можна використовувати змінні і методи від swiper-slider
/*
*Параметры
*Получение
let qSlides = myImageSlider.slides.length;

*Изменение
myImageSlider.params.speed = 3000;
*/

/*
*Методы
*Обновить слайдер
myImageSlider.update();

*Переключится на слайд 2, скорость 800
myImageSlider.slideTo(2, 800);
*/

/*
*События
*Событие смены слайда
myImageSlider.on('slideChange', function () {
	console.log('Слайд переключен');
});
*/


/*
!Запуск автоппрокрутки при наведении
let sliderBlock = document.querySelector('.image-slider');

*myImageSlider  - это переменная которой присвоен слайдер

sliderBlock.addEventListener("mouseenter", function (e) {
	myImageSlider.params.autoplay.disableOnInteraction = false;
	myImageSlider.params.autoplay.delay = 500;
	myImageSlider.autoplay.start();
});
sliderBlock.addEventListener("mouseleave", function (e) {
	myImageSlider.autoplay.stop();
});

*/


/*
!Фракция і прогрес-бар одночасно 
let mySliderAllSlides = document.querySelector('.image-slider__total');
let mySliderCurrentSlide = document.querySelector('.image-slider__current');

mySliderAllSlides.innerHTML = myImageSlider.slides.length;

myImageSlider.on('slideChange', function () {
	let currentSlide = ++myImageSlider.realIndex;
	mySliderCurrentSlide.innerHTML = currentSlide;
});
*/
