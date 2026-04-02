import { IProduct } from "../types";
import { Component } from "./base/Component";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProduct> {
    protected _title: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _category?: HTMLElement;
    protected _price: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _description?: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = container.querySelector('.card__title') as HTMLElement;
        this._image = container.querySelector('.card__image') as HTMLImageElement;
        this._category = container.querySelector('.card__category') as HTMLElement;
        this._price = container.querySelector('.card__price') as HTMLElement;
        this._button = container.querySelector('.card__button') as HTMLButtonElement;
        this._description = container.querySelector('.card__text') as HTMLElement;

        // Вешаем слушатель клика
        // Когда мы ставим ?., мы буквально говорим движку:
        // "Эй, проверь сначала, существует ли вообще левая часть (actions). 
        // Если там пустота (undefined или null), то даже не пытайся идти дальше за точку. 
        // Просто остановись и верни undefined".
        if (actions?.onClick) {
            if (this._button) {
                // Если есть кнопка "В корзину", вешаем клик на нее
                this._button.addEventListener('click', actions.onClick);
            } else {
                // Если кнопки нет (например, в каталоге), вешаем клик на саму карточку
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    set title(value: string) {
        this.setText(this._title, value);

        if (this._image) {
            this._image.alt = value;
        }
    }

    set image(value: string) {
        this.setImage(this._image, value);
    }

    set category(value: string) {
        this.setText(this._category, value);
    }

    set price(value: number | null) {
        this.setText(this._price, value === null ? 'Бесценно' : `${value} синапсов`);

        if (this._button && value === null) {
            this.setDisabled(this._button, true);
            this.setText(this._button, `Недоступно`)
        }


    }


    // this._title = container.querySelector('.card__title') as HTMLElement;
    //     this._image = container.querySelector('.card__image') as HTMLImageElement;
    //     this._category = container.querySelector('.card__category') as HTMLElement;
    //     this._price = container.querySelector('.card__prize') as HTMLElement;
    //     this._button = container.querySelector('.card__button') as HTMLButtonElement;
    //     this._description = container.querySelector('.cart__text') as HTMLElement;

}
