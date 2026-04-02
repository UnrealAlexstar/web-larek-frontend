import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { Modal } from './components/Modal';
import { IProduct } from './types';
import { Page } from './components/Page';
import { Card } from './components/Card';

// Тестовые данные (позже мы будем получать их через Api)
const mockCatalog: IProduct[] = [
    {
        id: "1",
        description: "Опыт не купишь, но можно купить время.",
        image: "https://images.unsplash.com/photo-1522682078546-47888fe04e81?auto=format&fit=crop&w=300&q=80",
        title: "+1 час в сутках",
        category: "софт-скил",
        price: 750
    },
    {
        id: "2",
        description: "То, что нужно для сложных проектов.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80",
        title: "Бэкенд-антистресс",
        category: "другое",
        price: 1500
    },
    {
        id: "3",
        description: "Бесценный опыт для тех, кто ищет баги.",
        image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=300&q=80",
        title: "Лупа для кода",
        category: "хард-скил",
        price: null // Проверим, как сработает блокировка кнопки!
    }
];
// 1. Создаем нашу "рацию" (брокер событий)
const events = new EventEmitter();
const modalContainer = document.querySelector('#modal-container') as HTMLElement;
const modal = new Modal(modalContainer, events);

const pageContainer = document.querySelector('.page') as HTMLElement;
const page = new Page(pageContainer, events);

const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;

const cardsArray = mockCatalog.map((item) => {

    const cardHtml = cardCatalogTemplate.content.querySelector('.card').cloneNode(true) as HTMLElement;

    const card = new Card(cardHtml, {
        onClick: () => {
            console.log(`Ты кликнул по товару: ${item.title}`);
        }
    })

    return card.render(item); // new Card потом ещё и render?
})

page.render({
    catalog: cardsArray,
    counter: 0,
    locked: false
})