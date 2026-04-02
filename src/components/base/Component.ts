/**
 * Базовый компонент, от которого будут наследоваться все остальные классы отображения (Modal, Card, Basket и т.д.)
 * Он содержит базовый инструментарий для удобной работы с DOM-элементами.
 */
export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {
        // Защищенный конструктор, чтобы этот класс нельзя было создать напрямую, 
        // а только унаследовать от него (например, class Modal extends Component)
    }

    // Переключить CSS-класс
    toggleClass(element: HTMLElement, className: string, force?: boolean) {
        element.classList.toggle(className, force);
    }

    // Установить текстовое содержимое
    protected setText(element: HTMLElement, value: unknown) {
        if (element) {
            element.textContent = String(value);
        }
    }

    // Заблокировать/разблокировать кнопку или инпут
    setDisabled(element: HTMLElement, state: boolean) {
        if (element) {
            if (state) element.setAttribute('disabled', 'disabled');
            else element.removeAttribute('disabled');
        }
    }

    // Скрыть элемент
    protected setHidden(element: HTMLElement) {
        element.style.display = 'none';
    }

    // Показать элемент
    protected setVisible(element: HTMLElement) {
        element.style.removeProperty('display');
    }

    // Установить картинку и альтернативный текст
    protected setImage(element: HTMLImageElement, src: string) {
        if (element) {
            element.src = src;
        }
    }

    // Главный метод рендера! 
    // Он берет переданные данные (например, название товара), 
    // сливает их с текущим объектом и возвращает готовый HTML-контейнер
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}