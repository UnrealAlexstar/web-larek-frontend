import { Component } from './base/Component';
import { IEvents } from './base/events';

// Описываем, что мы можем положить в нашу "коробку"
export interface IModalData {
    content: HTMLElement; // Любой HTML-элемент (карточка, форма, корзина)
}

export class Modal extends Component<IModalData> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        // 1. Ищем элементы внутри модалки ТОЛЬКО ОДИН РАЗ
        this._closeButton = container.querySelector('.modal__close');
        this._content = container.querySelector('.modal__content');

        // 2. Вешаем слушатель на кнопку закрытия (крестик)
        this._closeButton.addEventListener('click', this.close.bind(this));

        // 3. Вешаем слушатель на саму модалку, чтобы закрывать её по клику на темный фон (оверлей)
        this.container.addEventListener('click', (event) => {
            if (event.target === event.currentTarget) {
                this.close();
            }
        });

        // 4. Чтобы модалка не оставалась открытой, если мы как-то хитро сменили контент
        this._content.addEventListener('click', (event) => event.stopPropagation());
    }

    // Сеттер: когда мы передаем данные в render({ content: ... }), 
    // этот метод берет переданный HTML и вставляет его внутрь модалки
    set content(value: HTMLElement | null) {
        if (value) {
            this._content.replaceChildren(value); // Вставляем новый контент
        } else {
            this._content.innerHTML = ''; // Безопасно очищаем, если передали null
        }
    }

    // Метод открытия модального окна
    open() {
        this.container.classList.add('modal_active'); // Добавляем CSS-класс, который делает её видимой
        this.events.emit('modal:open'); // Кричим в рацию: "Модалка открылась!"
    }

    // Метод закрытия модального окна
    close() {
        this.container.classList.remove('modal_active'); // Убираем CSS-класс
        this.content = null; // Очищаем содержимое
        this.events.emit('modal:close'); // Кричим в рацию: "Модалка закрылась!"
    }

    // Переопределяем метод render из базового класса Component,
    // чтобы при рендере модалка сразу открывалась
    render(data: IModalData): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}