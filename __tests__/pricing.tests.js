const {
  getSubtotal,
  getQuantityDiscount,
  getCategoryDiscount,
  getBulkDiscount,
  getTotal,
} = require('../src/pricing');

const book = { id: 'b1', title: 'Книга', price: 1000, quantity: 10, category: 'books' };
const laptop = { id: 'e1', title: 'Ноутбук', price: 5000, quantity: 4, category: 'electronics' };
const tshirt = { id: 'c1', title: 'Футболка', price: 200, quantity: 3, category: 'clothing' };

describe('getCategoryDiscount', () => {
  test('даёт 5% на книги и 7% на электронику при subtotal >= 10000', () => {
    const cart = [book, laptop]; // subtotal = 10000 + 20000 = 30000

    // книги: 10000 * 0.05 = 500
    // электроника: 20000 * 0.07 = 1400 (subtotal 30000 >= 10000)
    expect(getCategoryDiscount(cart)).toBeCloseTo(1900, 2);
  });

  test('не даёт 7% на электронику, если subtotal < 10000', () => {
    const cart = [
      { id: 'b2', title: 'Книга', price: 500, quantity: 1, category: 'books' },
      { id: 'e2', title: 'Мышка', price: 100, quantity: 10, category: 'electronics' },
    ]; // subtotal = 1500 < 10000

    // только книги: 500 * 0.05 = 25, электроника — 0
    expect(getCategoryDiscount(cart)).toBeCloseTo(25, 2);
  });
});

describe('getTotal', () => {
  test('обычная корзина: итог равен subtotal − сумма скидок', () => {
    const cart = [tshirt]; // subtotal = 600

    // скидка за количество: 3 шт -> 5% от 600 = 30
    // категорийной и оптовой нет
    expect(getSubtotal(cart)).toBe(600);
    expect(getQuantityDiscount(tshirt)).toBeCloseTo(30, 2);
    expect(getTotal(cart)).toBeCloseTo(570, 2);
  });

  test('корзина со всеми тремя скидками: итог считается по формуле', () => {
    const cart = [book, laptop];
    // subtotal = 30000
    // скидка за количество: книги 10 шт -> 15% (1500), электроника 4 шт -> 5% (1000) = 2500
    // категорийная: 500 + 1400 = 1900
    // оптовая: 14 единиц -> 3% от 30000 = 900
    // итог: 30000 - 2500 - 1900 - 900 = 24700
    expect(getTotal(cart)).toBeCloseTo(24700, 2);
  });

  test('не уходит в минус: пустая корзина даёт 0', () => {
    expect(getTotal([])).toBe(0);
  });

  test('не уходит в минус: при максимальных скидках итог положительный', () => {
    const cart = [book, laptop]; // скидки 27% от подытога — потолок для этих правил
    const total = getTotal(cart);

    expect(total).toBeGreaterThan(0);
    expect(total).toBeLessThanOrEqual(getSubtotal(cart));
  });
});
