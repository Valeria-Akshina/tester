const { createCart, addItem, removeItem, countItems } = require('../src/cart');

describe('createCart', () => {
  test('возвращает пустой массив', () => {
    expect(createCart()).toEqual([]);
  });
});

const item = {
  id: '1',
  title: 'Ноутбук',
  price: 50000,
  quantity: 2,
  category: 'electronics',
};

describe('addItem', () => {
  test('добавляет новый товар в пустую корзину', () => {
    const cart = addItem(createCart(), item);

    expect(cart).toHaveLength(1);
    expect(cart[0]).toEqual(item);
  });

  test('увеличивает quantity, если товар с таким id уже есть', () => {
    let cart = addItem(createCart(), item);
    cart = addItem(cart, item);

    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(4);
  });

  test('не мутирует исходную корзину', () => {
    const cart = createCart();
    const updated = addItem(cart, item);

    expect(cart).toHaveLength(0);
    expect(updated).toHaveLength(1);
  });
});

describe('removeItem', () => {
  test('удаляет товар по id', () => {
    const a = { id: '1', title: 'А', price: 10, quantity: 1, category: 'books' };
    const b = { id: '2', title: 'Б', price: 20, quantity: 1, category: 'books' };
    let cart = addItem(addItem(createCart(), a), b);

    cart = removeItem(cart, '1');

    expect(cart).toHaveLength(1);
    expect(cart[0].id).toBe('2');
  });

  test('ничего не ломает, если id не найден', () => {
    const a = { id: '1', title: 'А', price: 10, quantity: 1, category: 'books' };
    const cart = removeItem(addItem(createCart(), a), '999');

    expect(cart).toHaveLength(1);
  });
});

describe('countItems', () => {
  test('суммирует quantity всех товаров', () => {
    let cart = createCart();
    cart = addItem(cart, { id: '1', title: 'А', price: 10, quantity: 3, category: 'books' });
    cart = addItem(cart, { id: '2', title: 'Б', price: 20, quantity: 2, category: 'books' });

    expect(countItems(cart)).toBe(5);
  });

  test('возвращает 0 для пустой корзины', () => {
    expect(countItems(createCart())).toBe(0);
  });
});

