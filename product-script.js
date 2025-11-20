import Swiper from 'swiper';
import {Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs} from 'swiper/modules';

Swiper.use([Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs]);


// Thumb slider

document.addEventListener('DOMContentLoaded', () => {
        // основной
    const productThumbsSwiper = new Swiper('.product__slider-thumbs', {
        spaceBetween: 16,
        slidesPerView: 7,
    })

// второстепенный
    const productMainSwiper = new Swiper(".product__slider-main", {
        spaceBetween: 10,
        thumbs: {
            swiper: productThumbsSwiper,
        },
        navigation: {
            nextEl: ".product__slider-nav--next",
            prevEl: ".product__slider-nav--prev",
        }
    });

    const relatedProductSwiper = new Swiper('.product__related-slider', {
        slidesPerView: 3,
        spaceBetween: 16,  
        
        navigation: {
            nextEl: '.product__related-nav-btn--next',
            prevEl: '.product__related-nav-btn--prev',
        },
    })
})
// Инициализация слайдера продукта
document.addEventListener('DOMContentLoaded', () => {
   const productVideosSlider = new Swiper('.product__videos-slider', {
        slidesPerView: 3,
        spaceBetween: 16,
        loop: true,
        navigation: {
            nextEl: '.product__videos-next',
            prevEl: '.product__videos-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 'auto',
                spaceBetween: 8,

            },
            768: {
                slidesPerView: 'auto',
                spaceBetween: 16,
            },
            1440: {
                slidesPerView: 3,
            },
        }
        
    })

    // Переключение видимости блока характеристик
    const detailsContent = document.querySelector('.product__details-content');
    const descriptionMoreBtn = document.querySelector('.product__description-more');

    if (detailsContent && descriptionMoreBtn) {
        // Проверяем, нужно ли показывать кнопку
        const checkButtonVisibility = () => {
            // Временно убираем ограничение высоты для проверки реальной высоты
            const originalMaxHeight = detailsContent.style.maxHeight;
            detailsContent.style.maxHeight = 'none';
            const fullHeight = detailsContent.scrollHeight;
            detailsContent.style.maxHeight = originalMaxHeight;

            if (fullHeight <= 400) {
                descriptionMoreBtn.style.display = 'none';
            } else {
                descriptionMoreBtn.style.display = 'block';
            }
        };

        descriptionMoreBtn.addEventListener('click', () => {
            const isExpanded = detailsContent.classList.contains('product__details-content--expanded');

            if (isExpanded) {
                detailsContent.classList.remove('product__details-content--expanded');
                descriptionMoreBtn.setAttribute('aria-expanded', 'false');
                descriptionMoreBtn.textContent = 'Показать полностью';
            } else {
                detailsContent.classList.add('product__details-content--expanded');
                descriptionMoreBtn.setAttribute('aria-expanded', 'true');
                descriptionMoreBtn.textContent = 'Скрыть';
            }
        });

        // Проверяем при загрузке страницы (с небольшой задержкой для полной отрисовки)
        setTimeout(checkButtonVisibility, 100);
    }

    // Навигация для популярных товаров
    const popularItems = document.querySelector('.product__popular-items');
    const popularPrevBtn = document.querySelector('.product__popular-nav-btn--prev');
    const popularNextBtn = document.querySelector('.product__popular-nav-btn--next');

    if (popularItems && popularPrevBtn && popularNextBtn) {
        const scrollAmount = 309; // 293px ширина карточки + 16px gap

        popularNextBtn.addEventListener('click', () => {
            popularItems.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        popularPrevBtn.addEventListener('click', () => {
            popularItems.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Обновление состояния кнопок при прокрутке
        const updateNavButtons = () => {
            const { scrollLeft, scrollWidth, clientWidth } = popularItems;
            popularPrevBtn.style.opacity = scrollLeft > 0 ? '1' : '0.5';
            popularNextBtn.style.opacity = scrollLeft < scrollWidth - clientWidth - 10 ? '1' : '0.5';
        };

        popularItems.addEventListener('scroll', updateNavButtons);
        updateNavButtons();
    }

    // Выпадающий список доступности товара
    const availabilityToggle = document.querySelector('.product__availability-toggle');
    const availabilityDropdown = document.querySelector('.product__availability-dropdown');
    const availabilityItems = document.querySelectorAll('.product__availability-item');
    const availabilityContainer = document.querySelector('.product__availability');

    if (availabilityToggle && availabilityDropdown && availabilityContainer) {
        // Открытие/закрытие списка
        availabilityToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = availabilityContainer.getAttribute('aria-expanded') === 'true';
            availabilityContainer.setAttribute('aria-expanded', !isExpanded);
            availabilityToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Выбор элемента из списка
        availabilityItems.forEach(item => {
            item.addEventListener('click', () => {
                const city = item.getAttribute('data-city');
                const status = item.getAttribute('data-status');
                const statusText = item.querySelector('.product__status-badge').textContent;

                // Обновляем выбранный элемент
                const selectedCity = availabilityToggle.querySelector('.product__city');
                const selectedStatus = availabilityToggle.querySelector('.product__status-badge');

                selectedCity.textContent = city;
                selectedStatus.textContent = statusText;

                // Обновляем классы статуса
                selectedStatus.className = 'product__status-badge';
                selectedStatus.classList.add(`product__status-badge--${status}`);

                // Обновляем aria-selected
                availabilityItems.forEach(i => i.setAttribute('aria-selected', 'false'));
                item.setAttribute('aria-selected', 'true');

                // Закрываем список
                availabilityContainer.setAttribute('aria-expanded', 'false');
                availabilityToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Закрытие при клике вне списка
        document.addEventListener('click', (e) => {
            if (!availabilityContainer.contains(e.target)) {
                availabilityContainer.setAttribute('aria-expanded', 'false');
                availabilityToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Устанавливаем первый элемент как выбранный по умолчанию
        if (availabilityItems.length > 0) {
            availabilityItems[0].setAttribute('aria-selected', 'true');
        }
    }

    // Модальное окно "Нашли дешевле?"
    const cheaperLink = document.querySelector('.product__cheaper-link');
    const cheaperPopup = document.querySelector('.product-cheaper-popup');
    const cheaperPopupClose = document.querySelector('.product-cheaper-popup__close');
    const cheaperPopupOverlay = document.querySelector('.product-cheaper-popup__overlay');
    const cheaperPopupForm = document.querySelector('.product-cheaper-popup__form');

    if (cheaperLink && cheaperPopup) {
        // Открытие модального окна
        cheaperLink.addEventListener('click', (e) => {
            e.preventDefault();
            cheaperPopup.classList.add('product-cheaper-popup--active');
            document.body.style.overflow = 'hidden';
        });

        // Закрытие модального окна
        const closePopup = () => {
            cheaperPopup.classList.remove('product-cheaper-popup--active');
            document.body.style.overflow = '';
        };

        if (cheaperPopupClose) {
            cheaperPopupClose.addEventListener('click', closePopup);
        }

        if (cheaperPopupOverlay) {
            cheaperPopupOverlay.addEventListener('click', closePopup);
        }

        // Закрытие по клавише ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && cheaperPopup.classList.contains('product-cheaper-popup--active')) {
                closePopup();
            }
        });

        // Обработка отправки формы
        if (cheaperPopupForm) {
            cheaperPopupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Здесь можно добавить логику отправки формы
                console.log('Форма отправлена');
                closePopup();
            });
        }
    }

    // Модальное окно "Бесплатное тестирование"
    const testingBtn = document.querySelector('.product__banner-btn');
    const testingPopup = document.querySelector('.product-testing-popup');
    const testingPopupClose = document.querySelector('.product-testing-popup__close');
    const testingPopupOverlay = document.querySelector('.product-testing-popup__overlay');
    const testingPopupForm = document.querySelector('.product-testing-popup__form');
    const testingCheckbox = document.querySelector('#product-testing-popup-checkbox');

    if (testingBtn && testingPopup) {
        // Устанавливаем чекбокс как отмеченный по умолчанию
        if (testingCheckbox) {
            testingCheckbox.checked = true;
        }

        // Открытие модального окна
        testingBtn.addEventListener('click', () => {
            testingPopup.classList.add('product-testing-popup--active');
            document.body.style.overflow = 'hidden';
        });

        // Закрытие модального окна
        const closeTestingPopup = () => {
            testingPopup.classList.remove('product-testing-popup--active');
            document.body.style.overflow = '';
        };

        if (testingPopupClose) {
            testingPopupClose.addEventListener('click', closeTestingPopup);
        }

        if (testingPopupOverlay) {
            testingPopupOverlay.addEventListener('click', closeTestingPopup);
        }

        // Закрытие по клавише ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && testingPopup.classList.contains('product-testing-popup--active')) {
                closeTestingPopup();
            }
        });

        // Обработка отправки формы
        if (testingPopupForm) {
            testingPopupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Здесь можно добавить логику отправки формы
                console.log('Форма тестирования отправлена');
                closeTestingPopup();
            });
        }
    }

    // Управление количеством товара
    const quantityInput = document.querySelector('.product__quantity-input');
    const quantityMinusBtn = document.querySelector('.product__quantity-btn--minus');
    const quantityPlusBtn = document.querySelector('.product__quantity-btn--plus');

    if (quantityInput && quantityMinusBtn && quantityPlusBtn) {
        // Функция обновления состояния кнопок
        const updateButtonsState = () => {
            const currentValue = parseInt(quantityInput.value, 10) || 1;
            if (currentValue <= 1) {
                quantityMinusBtn.disabled = true;
                quantityMinusBtn.classList.add('product__quantity-btn--disabled');
            } else {
                quantityMinusBtn.disabled = false;
                quantityMinusBtn.classList.remove('product__quantity-btn--disabled');
            }
        };

        // Функция обновления значения
        const updateQuantity = (value) => {
            const numValue = parseInt(value, 10);
            if (isNaN(numValue) || numValue < 1) {
                quantityInput.value = 1;
            } else {
                quantityInput.value = numValue;
            }
            updateButtonsState();
        };

        // Обработчик клика на кнопку минус
        quantityMinusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value, 10) || 1;
            if (currentValue > 1) {
                updateQuantity(currentValue - 1);
            }
        });

        // Обработчик клика на кнопку плюс
        quantityPlusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value, 10) || 1;
            updateQuantity(currentValue + 1);
        });

        // Обработчик изменения значения в input
        quantityInput.addEventListener('change', () => {
            updateQuantity(quantityInput.value);
        });

        // Обработчик ввода в input (валидация в реальном времени)
        quantityInput.addEventListener('input', () => {
            const value = quantityInput.value;
            if (value === '' || value === '0') {
                updateButtonsState();
                return; // Разрешаем пустое значение или 0 во время ввода
            }
            const numValue = parseInt(value, 10);
            if (!isNaN(numValue) && numValue < 1) {
                quantityInput.value = '';
            }
            updateButtonsState();
        });

        // Обработчик потери фокуса - устанавливаем минимум 1
        quantityInput.addEventListener('blur', () => {
            const value = quantityInput.value;
            if (value === '' || parseInt(value, 10) < 1) {
                quantityInput.value = 1;
            }
            updateButtonsState();
        });

        // Инициализация состояния кнопок при загрузке
        updateButtonsState();
    }

    // Поиск в таблице запчастей
    const sparesSearchInput = document.querySelector('.product__spares-search-input');
    const sparesTable = document.querySelector('.product__spares-table');
    const sparesRows = document.querySelectorAll('.product__spares-row:not(.product__spares-row--head)');

    if (sparesSearchInput && sparesTable && sparesRows.length > 0) {
        // Функция нормализации текста для поиска (убирает пробелы, приводит к нижнему регистру)
        const normalizeText = (text) => {
            return text.toLowerCase().trim().replace(/\s+/g, ' ');
        };

        // Функция поиска
        const performSearch = (searchTerm) => {
            const normalizedSearch = normalizeText(searchTerm);
            let visibleCount = 0;

            sparesRows.forEach((row) => {
                // Получаем код товара и наименование из строки
                const codeCol = row.querySelector('.product__spares-col--code');
                const nameCol = row.querySelector('.product__spares-col--name');

                if (!codeCol || !nameCol) {
                    return;
                }

                const codeText = codeCol.textContent || '';
                const nameText = nameCol.textContent || '';
                const normalizedCode = normalizeText(codeText);
                const normalizedName = normalizeText(nameText);

                // Проверяем совпадение в коде или наименовании
                const matches = normalizedSearch === '' ||
                    normalizedCode.includes(normalizedSearch) ||
                    normalizedName.includes(normalizedSearch);

                if (matches) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });

            // Показываем сообщение, если ничего не найдено
            let noResultsMessage = sparesTable.querySelector('.product__spares-no-results');
            if (visibleCount === 0 && normalizedSearch !== '') {
                if (!noResultsMessage) {
                    noResultsMessage = document.createElement('div');
                    noResultsMessage.className = 'product__spares-no-results';
                    noResultsMessage.textContent = 'Ничего не найдено';
                    sparesTable.appendChild(noResultsMessage);
                }
                noResultsMessage.style.display = 'block';
            } else {
                if (noResultsMessage) {
                    noResultsMessage.style.display = 'none';
                }
            }
        };

        // Обработчик ввода в поле поиска
        sparesSearchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });

        // Обработчик очистки поиска (если браузер поддерживает)
        sparesSearchInput.addEventListener('search', (e) => {
            if (e.target.value === '') {
                performSearch('');
            }
        });

        // Обработчик клика на кнопку поиска (опционально)
        const sparesSearchIcon = document.querySelector('.product__spares-search-icon');
        if (sparesSearchIcon) {
            sparesSearchIcon.addEventListener('click', () => {
                sparesSearchInput.focus();
            });
        }
    }
});

