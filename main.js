import { Fancybox } from "@fancyapps/ui";
import Swiper from 'swiper/bundle';
import { Mask, MaskInput } from "maska"
import 'jquery';

import './sass/_app.scss';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'swiper/css/bundle';

Fancybox.bind("[data-fancybox]", {})

new MaskInput("[data-maska]") // for masked input

//toggle catalog
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('show-catalog')?.addEventListener('click', () => {
        const jalousie = document.querySelector('.jalousie');
        if (window.innerWidth > 992) {
            jalousie?.classList.toggle('active');
        } else {
            jalousie?.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('show-catalog')?.addEventListener('click', () => {
        const basket = document.querySelector('.basket');
        const cross = document.querySelector('.cross');
        const body = document.body;
        document.querySelector('.header__discount-dropdown').classList.remove('active');

        document.getElementById('show-catalog').classList.toggle('is_active');
        // basket.classList.toggle('hide');
        cross.classList.toggle('hide');
        document.querySelector('.burger-menu').classList.remove('active');
        document.querySelector('.header__burger').classList.remove('is-active');
        document.querySelector('.catalog-menu').classList.toggle('active');

        body.classList.toggle('locked',  cross.classList.contains('hide'));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const firstListItem = document.querySelector('.catalog-menu__list_item');
    const firstInnerItem = document.querySelector('.catalog-menu__inner_item');
    if (firstListItem) firstListItem.classList.add('active');
    if (firstInnerItem) firstInnerItem.classList.add('active');

    document.addEventListener('click', (e) => {
        const listItem = e.target.closest('.catalog-menu__list_item');
        if (listItem) {
            if (window.innerWidth < 992) {
                listItem.classList.toggle('opened');
                const subMenu = listItem.querySelector('.catalog-sub-menu');
                if (subMenu) subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
            } else {
                document.querySelectorAll('.catalog-menu__list_item').forEach(item => item.classList.remove('active'));
                document.querySelectorAll('.catalog-menu__inner_item').forEach(item => item.classList.remove('active'));
                listItem.classList.add('active');
                const innerItem = document.querySelector(`.catalog-menu__inner_item[data-tab="${listItem.dataset.tab}"]`);
                if (innerItem) innerItem.classList.add('active');
            }
        }
    });
});

//burger
document.addEventListener('DOMContentLoaded', () => {
    const toggleClass = (elem, cls) => elem.classList.toggle(cls);

    [document.getElementById('mobile-burger'), document.querySelector('.burger-menu__close')].forEach(btn => {
        btn?.addEventListener('click', () => {
            toggleClass(btn, 'is-active');
            toggleClass(document.querySelector('.burger-menu'), 'active');
            toggleClass(document.documentElement, 'lock');
        });
    });

    document.querySelectorAll('.burger-menu__menu_trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            toggleClass(trigger.parentElement, 'is-active');
            const submenu = trigger.nextElementSibling;
            submenu && (submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block');
        });
    });
});

//search bar
document.addEventListener('click', (event) => {
    if (event.target.closest('.header__search_trigger, .main_search_block_in .close')) {
        const searchPopup = document.getElementById('search-popup');
        searchPopup.classList.toggle('show');
        document.body.classList.toggle('lock', searchPopup.classList.contains('show'));
        document.querySelector('.header__burger')?.classList.remove('is-active');
        document.querySelector('.burger-menu')?.classList.remove('active');
    }
});

//footer submenu
document.addEventListener('DOMContentLoaded', () => {
    ['footer__catalog', 'footer__menu'].forEach((name) => {
        const trigger = document.querySelector(`.${name}_trigger`);
        const subMenu = document.querySelector(`.${name}_sub`);
        trigger?.addEventListener('click', () => {
            trigger.classList.toggle('active');
            subMenu.classList.toggle('active');
        });
    });
});

//sticky header
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const headerTop = document.querySelector('.header__top');
    const headerBottom = document.querySelector('.header__bottom');
    let headerBottomOffset = null;
    let headerBottomHeight = null;
    
    const handleScroll = () => {
        if (headerBottomOffset === null) {
            headerBottomOffset = headerTop.offsetHeight;
            headerBottomHeight = headerBottom.offsetHeight;
        }
        
        const scrollY = window.scrollY;
        
        if (scrollY >= headerBottomOffset) {
            header.classList.add('header-scrolled');
            headerBottom.classList.add('fixed');
            document.body.style.paddingTop = headerBottomHeight + 'px';
        } else {
            header.classList.remove('header-scrolled');
            headerBottom.classList.remove('fixed');
            document.body.style.paddingTop = '0';
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
});

//click jalousie and close catalog dropdown
document.addEventListener('click', (e) => {
    if (e.target.className === 'jalousie active') {
        document.querySelectorAll('.jalousie').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.catalog-menu').forEach(el => el.classList.remove('active'));

        const cross = document.querySelector('#show-catalog .cross');
        const basket = document.querySelector('#show-catalog .basket');

        if (cross) cross.classList.toggle('hide');
        if (basket) basket.classList.toggle('hide');
    }
});

//sliders
document.addEventListener('DOMContentLoaded', () => {
    const popularSlider = new Swiper('.catalog-popular__container', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        breakpoints: {
            300: {
                slidesPerView: 2.25,
            },
            576: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
        },
    })
});

if (document.querySelectorAll('.dropdown')) {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach((dropdown) => {
        const input = dropdown.querySelector('input');
        const listOfOptions = dropdown.querySelectorAll('.option');
        const body = document.body;

        if(input.value === '') {
            input.value = listOfOptions[0].textContent;
            listOfOptions[0].classList.add('selected')
        }

        const toggleDropdown = (event) => {
            event.stopPropagation();
            dropdown.classList.toggle('opened');
        };

        const selectOption = (event) => {
            const clickedOption = event.currentTarget
            listOfOptions.forEach(item => item.classList.remove('selected'))
            clickedOption.classList.add('selected')
            input.value = clickedOption.textContent;
            dropdown.classList.remove('opened')
        };

        const closeDropdownFromOutside = () => {
            if (dropdown.classList.contains('opened')) {
                dropdown.classList.remove('opened');
            }
        };

        body.addEventListener('click', closeDropdownFromOutside);

        listOfOptions.forEach((option) => {
            option.addEventListener('click', selectOption);
        });

        dropdown.addEventListener('click', toggleDropdown);
    })
}


//sliders
document.addEventListener('DOMContentLoaded', () => {
    const bannerSlider = new Swiper('.banner-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.banner-next',
            prevEl: '.banner-prev',
        },
    })

    const productsSlider = new Swiper('.products-swiper', {
        // slidesPerView: 'auto',
        slidesPerView: 4,
        spaceBetween: 16,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 'auto',
            },
            1840: {
                slidesPerView: 4,
            },
        }
        
    })
    const videosSlider = new Swiper('.videos_list', {
        // slidesPerView: 'auto',
        slidesPerView: 3,
        spaceBetween: 16,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 'auto',
            },
            1440: {
                slidesPerView: 3,
            },
        }
        
    })
});

document.addEventListener('DOMContentLoaded', () => {
   const showCatalog = document.querySelector('#show-catalog');
   const catalogMenu = document.querySelector('.catalog-menu');

   showCatalog?.addEventListener('click', () => {
       catalogMenu?.classList.toggle('active');
   });
});


// ----------------------------popup----------------------------
document.addEventListener('DOMContentLoaded', function(){
    const popup = document.querySelector('.callback-popup')
    const popupShowBtns = document.querySelectorAll('.show-popup')
    const closeFormBtn = document.querySelector('.close-popup')
    const feedbackForm = document.querySelector('#feedback-popup form')
    const feedbackSuccess = document.querySelector('.feedback-success')
    const successBtn = document.querySelector('.success-btn')

    popupShowBtns.forEach(item => {
        item.addEventListener('click', () => {
            popup.classList.add('active')
            document.body.classList.add('no-scroll')
        })
    })

    closeFormBtn.addEventListener('click', () => {
        // Сначала сбрасываем форму
        feedbackForm.reset()
        // Затем скрываем popup
        popup.classList.remove('active')
        document.body.classList.remove('no-scroll')
        // И только после закрытия возвращаем исходное состояние формы
        setTimeout(() => {
            feedbackForm.style.display = 'block'
            feedbackSuccess.style.display = 'none'
        }, 300) // Задержка, соответствующая времени анимации закрытия попапа
    })

    // Обработчик отправки формы
    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault() // Предотвращаем стандартную отправку формы
        
        // Скрываем форму и показываем блок успеха
        feedbackForm.style.display = 'none'
        feedbackSuccess.style.display = 'block'
    })

    // Обработчик кнопки "Хорошо" в блоке успеха
    successBtn.addEventListener('click', () => {
        // Сначала сбрасываем состояние для следующего использования
        feedbackForm.reset() // Очищаем форму
        setTimeout(() => {
            // Затем скрываем popup
            popup.classList.remove('active')
            document.body.classList.remove('no-scroll')
            // И только после этого возвращаем исходное состояние формы
            setTimeout(() => {
                feedbackForm.style.display = 'block'
                feedbackSuccess.style.display = 'none'
            }, 300) // Задержка, соответствующая времени анимации закрытия попапа
        }, 0)
    })

    document.addEventListener('click', (event) => {
        if (event.target === popup) {
            // Сначала сбрасываем форму
            feedbackForm.reset()
            // Затем скрываем popup
            popup.classList.remove('active')
            document.body.classList.remove('no-scroll')
            // И только после закрытия возвращаем исходное состояние формы
            setTimeout(() => {
                feedbackForm.style.display = 'block'
                feedbackSuccess.style.display = 'none'
            }, 300) // Задержка, соответствующая времени анимации закрытия попапа
        }
    });
});
// ----------------------------service-popup----------------------------
document.addEventListener('DOMContentLoaded', function(){
    const servicePopup = document.querySelector('.service-popup')
    const servicePopupShowBtns = document.querySelectorAll('.show-service-popup')
    const serviceCloseFormBtn = document.querySelector('.service-popup .close-popup')
    const serviceForm = document.querySelector('#service-popup form')
    const serviceSuccess = document.querySelector('.service-popup .feedback-success')
    const serviceSuccessBtn = document.querySelector('.service-popup .success-btn')
    
    // Обработчики для открытия service-popup
    servicePopupShowBtns.forEach(item => {
        item.addEventListener('click', () => {
            servicePopup.classList.add('active')
            document.body.classList.add('no-scroll')
        })
    })
    
    // Обработчик закрытия по крестику
    serviceCloseFormBtn.addEventListener('click', () => {
        // Сначала сбрасываем форму
        serviceForm.reset()
        // Затем скрываем popup
        servicePopup.classList.remove('active')
        document.body.classList.remove('no-scroll')
        // И только после закрытия возвращаем исходное состояние формы
        setTimeout(() => {
            serviceForm.style.display = 'block'
            serviceSuccess.style.display = 'none'
        }, 300) // Задержка, соответствующая времени анимации закрытия попапа
    })
    
    // Обработчик отправки формы сервиса
    serviceForm.addEventListener('submit', (event) => {
        event.preventDefault() // Предотвращаем стандартную отправку формы
        
        // Скрываем форму и показываем блок успеха
        serviceForm.style.display = 'none'
        serviceSuccess.style.display = 'block'
    })
    
    // Обработчик кнопки "Хорошо" в блоке успеха сервиса
    serviceSuccessBtn.addEventListener('click', () => {
        // Сначала сбрасываем состояние для следующего использования
        serviceForm.reset() // Очищаем форму
        setTimeout(() => {
            // Затем скрываем popup
            servicePopup.classList.remove('active')
            document.body.classList.remove('no-scroll')
            // И только после этого возвращаем исходное состояние формы
            setTimeout(() => {
                serviceForm.style.display = 'block'
                serviceSuccess.style.display = 'none'
            }, 300) // Задержка, соответствующая времени анимации закрытия попапа
        }, 0)
    })
    
    // Закрытие по клику вне формы
    document.addEventListener('click', (event) => {
        if (event.target === servicePopup) {
            // Сначала сбрасываем форму
            serviceForm.reset()
            // Затем скрываем popup
            servicePopup.classList.remove('active')
            document.body.classList.remove('no-scroll')
            // И только после закрытия возвращаем исходное состояние формы
            setTimeout(() => {
                serviceForm.style.display = 'block'
                serviceSuccess.style.display = 'none'
            }, 300) // Задержка, соответствующая времени анимации закрытия попапа
        }
    });
});

// ----------------------------subscribe-popup----------------------------
document.addEventListener('DOMContentLoaded', function(){
    const subscribePopup = document.querySelector('.subscribe-popup')
    const subscribeForm = document.querySelector('.footer__form')
    const subscribeSuccess = document.querySelector('.subscribe-popup .feedback-success')
    const subscribeSuccessBtn = document.querySelector('.subscribe-popup .success-btn')
    const subscribeCloseFormBtn = document.querySelector('.subscribe-popup .close-popup')
    
    // Обработчик отправки формы подписки
    subscribeForm.addEventListener('submit', (event) => {
        event.preventDefault() // Предотвращаем стандартную отправку формы
        
        // Показываем popup с благодарностью
        subscribePopup.classList.add('active')
        document.body.classList.add('no-scroll')
        
        // Сбрасываем форму
        subscribeForm.reset()
    })
    
    // Обработчик кнопки "Хорошо" в блоке успеха подписки
    subscribeSuccessBtn.addEventListener('click', () => {
        // Скрываем popup
        subscribePopup.classList.remove('active')
        document.body.classList.remove('no-scroll')
    })
    
    // Обработчик закрытия по крестику
    subscribeCloseFormBtn.addEventListener('click', () => {
        // Скрываем popup
        subscribePopup.classList.remove('active')
        document.body.classList.remove('no-scroll')
    })
    
    // Закрытие по клику вне формы
    document.addEventListener('click', (event) => {
        if (event.target === subscribePopup) {
            // Скрываем popup
            subscribePopup.classList.remove('active')
            document.body.classList.remove('no-scroll')
        }
    });
 });


// ---------------------------has-submenu-accordion----------------------------
document.addEventListener('DOMContentLoaded', function(){
    const hasSubListArrows = document.querySelectorAll('.has-sublist__arrow');


    hasSubListArrows.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                item.style.transform = 'rotate(-90deg)';
            } else {
                item.style.transform = 'rotate(90deg)';
            }

            const submenu = item.closest('.has-sublist').querySelector('.catalog-menu__sublist');

            if (submenu) {
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        })
    })
});

// ----------------------------advantages-popup----------------------------
document.addEventListener('DOMContentLoaded', function(){
    const advantagesPopup = document.querySelector('.advantages-popup')
    const advantagesForm = document.querySelector('#advantages_feedback-form')
    const advantagesSuccess = document.querySelector('.advantages-popup .feedback-success')
    const advantagesSuccessBtn = document.querySelector('.advantages-popup .success-btn')
    const advantagesCloseFormBtn = document.querySelector('.advantages-popup .close-popup')
    
    // Обработчик отправки формы обратной связи
    advantagesForm.addEventListener('submit', (event) => {
        event.preventDefault() // Предотвращаем стандартную отправку формы
        
        // Показываем popup с благодарностью
        advantagesPopup.classList.add('active')
        document.body.classList.add('no-scroll')
        
        // Сбрасываем форму
        advantagesForm.reset()
    })
    
    // Обработчик кнопки "Хорошо" в блоке успеха
    advantagesSuccessBtn.addEventListener('click', () => {
        // Скрываем popup
        advantagesPopup.classList.remove('active')
        document.body.classList.remove('no-scroll')
    })
    
    // Обработчик закрытия по крестику
    advantagesCloseFormBtn.addEventListener('click', () => {
        // Скрываем popup
        advantagesPopup.classList.remove('active')
        document.body.classList.remove('no-scroll')
    })
    
    // Закрытие по клику вне формы
    document.addEventListener('click', (event) => {
        if (event.target === advantagesPopup) {
            // Скрываем popup
            advantagesPopup.classList.remove('active')
            document.body.classList.remove('no-scroll')
        }
    });
});

// ----------------------------feedback-main-popup----------------------------
document.addEventListener('DOMContentLoaded', function(){
    const feedbackMainPopup = document.querySelector('.feedback-main-popup')
    const feedbackMainForm = document.querySelector('#feedback_main_form')
    const feedbackMainSuccess = document.querySelector('.feedback-main-popup .feedback-success')
    const feedbackMainSuccessBtn = document.querySelector('.feedback-main-popup .success-btn')
    const feedbackMainCloseFormBtn = document.querySelector('.feedback-main-popup .close-popup')
    
    // Обработчик отправки основной формы обратной связи
    feedbackMainForm.addEventListener('submit', (event) => {
        event.preventDefault() // Предотвращаем стандартную отправку формы
        
        // Показываем popup с благодарностью
        feedbackMainPopup.classList.add('active')
        document.body.classList.add('no-scroll')
        
        // Сбрасываем форму
        feedbackMainForm.reset()
    })
    
    // Обработчик кнопки "Хорошо" в блоке успеха
    feedbackMainSuccessBtn.addEventListener('click', () => {
        // Скрываем popup
        feedbackMainPopup.classList.remove('active')
        document.body.classList.remove('no-scroll')
    })
    
    // Обработчик закрытия по крестику
    feedbackMainCloseFormBtn.addEventListener('click', () => {
        // Скрываем popup
        feedbackMainPopup.classList.remove('active')
        document.body.classList.remove('no-scroll')
    })
    
    // Закрытие по клику вне формы
    document.addEventListener('click', (event) => {
        if (event.target === feedbackMainPopup) {
            // Скрываем popup
            feedbackMainPopup.classList.remove('active')
            document.body.classList.remove('no-scroll')
        }
    });
});

// ---------------------------------header-discount-dropdown--------------------------------
document.addEventListener('DOMContentLoaded', function(){
    const headerDiscount = document.querySelector('.header__discount');
    const headerDiscountDropdown = document.querySelector('.header__discount-dropdown');
    const catalogMenu = document.querySelector('.catalog-menu');
    const headerCatTr = document.querySelector('.header__catalog_trigger');

    headerDiscount.addEventListener('click', () => {
        headerDiscountDropdown.classList.toggle('active');
        catalogMenu.classList.remove('active');
        headerCatTr.classList.remove('is_active');
    })
});
   
// --------------------------------catalog-menu-accordion--------------------------------
$(function () {
    $('.sublist__arrow').click(function () {
        $(this).toggleClass('active')
        $(this).siblings('ul').slideToggle();
    })
})