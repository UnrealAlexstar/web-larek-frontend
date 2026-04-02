import { ApiListResponse } from "../components/base/api";

// =========================================================
// БАЗОВЫЕ МОДЕЛИ ДАННЫХ (Model)
// =========================================================

// 1. Единый интерфейс товара. 
// Соответствует тому, что приходит с API, и используется во всем приложении.
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null; // null для «бесценных» товаров
}

// 2. Интерфейс состояния всего приложения (Хранит все данные)
export interface IAppState {
    catalog: IProduct[];
    basket: IProduct[];
    preview: string | null;
    order: IOrder;
    formErrors: FormErrors;
}

// 3. Данные форм оформления заказа
export interface IOrderForm {
    payment: string;
    address: string;
    email: string;
    phone: string;
}

// 4. Полный интерфейс заказа для отправки на сервер
export interface IOrder extends IOrderForm {
    total: number;
    items: string[]; // Массив ID купленных товаров
}

// Тип для ошибок валидации форм
export type FormErrors = Partial<Record<keyof IOrderForm, string>>;
// =========================================================
// ИНТЕРФЕЙСЫ API
// =========================================================

// Ответ от сервера при успешном оформлении заказа
export interface IOrderResult {
    id: string;
    total: number;
    error?: string;
}

// Интерфейс базового клиента API (твой класс Api будет его реализовывать)
export interface IShopAPI {
    getProductList: () => Promise<ApiListResponse<IProduct>>; 
    getProductItem: (id: string) => Promise<IProduct>;
    orderProducts: (order: IOrder) => Promise<IOrderResult>;
}


// =========================================================
// ИНТЕРФЕЙСЫ ОТОБРАЖЕНИЯ (View)
// =========================================================

// Базовый интерфейс для компонентов интерфейса (вместо множества мелких)
// T - тип данных, которые компонент принимает для рендера
export interface IView<T> {
    render(data?: Partial<T>): HTMLElement;
}

// Данные для главной страницы
export interface IPageData {
    catalog: HTMLElement[];
    counter: number;
    locked: boolean;
}

// Данные для модального окна
export interface IModalData {
    content: HTMLElement;
}