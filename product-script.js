import Swiper from 'swiper';
import {Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs} from 'swiper/modules';

Swiper.use([Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs]);


// Thumb slider

document.addEventListener('DOMContentLoaded', () => {
        // основной
    const productThumbsSwiper = new Swiper('.product__slider-thumbs', {
        spaceBetween: 16,
        slidesPerView: 7,
        breakpoints: {
            0: {
                spaceBetween: 8,
            },
            768: {
                spaceBetween: 16,
            },
        }
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
        },

    });

    const relatedProductSwiper = new Swiper('.product__related-slider', {
        slidesPerView: 3,
        spaceBetween: 16,  
        
        navigation: {
            nextEl: '.product__related-nav-btn--next',
            prevEl: '.product__related-nav-btn--prev',
        },
        breakpoints:{
            0:{
                slidesPerView: 'auto',
                spaceBetween: 8
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 16,
            }
        }
    })
})
// Видео-слайдер
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
                slidesPerView: 3,
                spaceBetween: 16,
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


   document.addEventListener('DOMContentLoaded', () => {    
        const productPopularSlider = new Swiper('.product__popular-swiper', {
            slidesPerView: 'auto',
            spaceBetween: 16,
            loop: true,
            navigation: {
                nextEl: '.product__popular-next',
                prevEl: '.product__popular-prev',
            },
            breakpoints: {
                0: {
                    spaceBetween: 8,
                },
                768: {
                    spaceBetween: 16,
                }
            }
        })
    })
    document.addEventListener('DOMContentLoaded', () => {
        const productAddToCompare = document.querySelectorAll('.product__add-to-compare');
        productAddToCompare.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('active');
            })
        })

        const productAddToFavorite = document.querySelectorAll('.product__add-to-favorites');
        productAddToFavorite.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('active');
            })
        })
    })
    document.addEventListener('DOMContentLoaded', () => {
        const compareBtns = document.querySelectorAll('.product__popular-compare');
        const favoriteBtns = document.querySelectorAll('.product__popular-favorite');

        compareBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
            })
        })

        favoriteBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
            })
        })

    })


document.addEventListener('DOMContentLoaded', function(){
    const productCheaperPopup = document.querySelector('.product-cheaper-popup')
    const productCheaperShowBtns = document.querySelectorAll('.show-product-cheaper-popup')
    const productCheaperCloseFormBtn = document.querySelector('.product-cheaper-popup .close-popup')
    const productCheaperForm = document.querySelector('#product-cheaper-popup form')
    const productCheaperSuccess = document.querySelector('.product-cheaper-popup .feedback-success')
    const productCheaperSuccessBtn = document.querySelector('.product-cheaper-popup .success-btn')

    productCheaperShowBtns.forEach(item => {
        item.addEventListener('click', () => {
            productCheaperPopup.classList.add('active')
            
            document.body.classList.add('no-scroll')
        })
    })

    productCheaperCloseFormBtn.addEventListener('click', () => {

        console.log('click')
        productCheaperForm.reset()
        productCheaperPopup.classList.remove('active')
        document.body.classList.remove('no-scroll')
        setTimeout(() => {
            productCheaperForm.style.display = 'block'
            productCheaperSuccess.style.display = 'none'
        })
    })
    productCheaperForm.addEventListener('submit', (event) => {
        event.preventDefault() 
        
        productCheaperForm.style.display = 'none'
        productCheaperSuccess.style.display = 'block'
    })

    productCheaperSuccessBtn.addEventListener('click', () => {
        productCheaperForm.reset() 
        setTimeout(() => {
            productCheaperPopup.classList.remove('active')
            document.body.classList.remove('no-scroll')
            setTimeout(() => {
                productCheaperForm.style.display = 'block'
                productCheaperSuccess.style.display = 'none'
            }, 300) 
        }, 0)
    })

    document.addEventListener('click', (event) => {
        if (event.target === popup) {
            productCheaperForm.reset()
            productCheaperPopup.classList.remove('active')
            document.body.classList.remove('no-scroll')
            setTimeout(() => {
                productCheaperForm.style.display = 'flex'
                productCheaperSuccess.style.display = 'none'
            }, 300) 
        }
    }); 

})

// ----------------------------test-popup----------------------------
document.addEventListener('DOMContentLoaded', function(){
    const testPopup = document.querySelector('.test-popup')
    const testPopupShowBtns = document.querySelectorAll('.show-test-popup')
    const testCloseFormBtn = document.querySelector('.test-popup .close-popup')
    const testForm = document.querySelector('#test-popup form')
    const testSuccess = document.querySelector('.test-popup .feedback-success')
    const testSuccessBtn = document.querySelector('.test-popup .success-btn')
    
    // Обработчики для открытия test-popup
    testPopupShowBtns.forEach(item => {
        item.addEventListener('click', () => {
            testPopup.classList.add('active')
            document.body.classList.add('no-scroll')
        })
    })
    
    // Обработчик закрытия по крестику
    testCloseFormBtn.addEventListener('click', () => {
        // Сначала сбрасываем форму
        testForm.reset()
        // Затем скрываем popup
        testPopup.classList.remove('active')
        document.body.classList.remove('no-scroll')
        // И только после закрытия возвращаем исходное состояние формы
        setTimeout(() => {
            testForm.style.display = 'block'
            testSuccess.style.display = 'none'
        }, 300) // Задержка, соответствующая времени анимации закрытия попапа
    })
    
    // Обработчик отправки формы тестирования
    testForm.addEventListener('submit', (event) => {
        event.preventDefault() // Предотвращаем стандартную отправку формы
        
        // Скрываем форму и показываем блок успеха
        testForm.style.display = 'none'
        testSuccess.style.display = 'block'
    })
    
    // Обработчик кнопки "Хорошо" в блоке успеха тестирования
    testSuccessBtn.addEventListener('click', () => {
        // Сначала сбрасываем состояние для следующего использования
        testForm.reset() // Очищаем форму
        setTimeout(() => {
            // Затем скрываем popup
            testPopup.classList.remove('active')
            document.body.classList.remove('no-scroll')
            // И только после этого возвращаем исходное состояние формы
            setTimeout(() => {
                testForm.style.display = 'block'
                testSuccess.style.display = 'none'
            }, 300) // Задержка, соответствующая времени анимации закрытия попапа
        }, 0)
    })
    
    // Закрытие по клику вне формы
    document.addEventListener('click', (event) => {
        if (event.target === testPopup) {
            // Сначала сбрасываем форму
            testForm.reset()
            // Затем скрываем popup
            testPopup.classList.remove('active')
            document.body.classList.remove('no-scroll')
            // И только после закрытия возвращаем исходное состояние формы
            setTimeout(() => {
                testForm.style.display = 'block'
                testSuccess.style.display = 'none'
            }, 300) // Задержка, соответствующая времени анимации закрытия попапа
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const copyBtn = document.querySelector(".copy-btn");
    const textToCopy = document.getElementById("text-to-copy");
    const notification = document.getElementById("copy-notification");

    function copyText() {
        // Выделяем текст
        // textToCopy.select();
        textToCopy.setSelectionRange(0, 99999);
        
        // Пытаемся скопировать
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                // Показываем уведомление
                notification.style.display = "block";
                setTimeout(() => {
                    notification.style.display = "none";
                }, 2000);
            }
        } catch (err) {
            console.log('Ошибка при копировании:', err);
        }
    }

    // Настройка
    if (textToCopy) {
        textToCopy.style.width = textToCopy.value.length  + 'ch';
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', copyText);
        copyBtn.style.cursor = 'pointer';
    }
    
    // Скрываем уведомление изначально
    if (notification) {
        notification.style.display = 'none';
    }
});