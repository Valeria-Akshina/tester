const { formatPrice, pluralizeItems } = require('../src/formatter')

describe('formatPrice', () => {
    test('форматирует число с копейками', () => {
        expect(formatPrice(1234.5)).toBe('1 234,50 ₽');
    });
});

describe('formatPrice', () => {
    test('бросает ошибку для не-числа', () => {
        expect(() => formatPrice('100')).toThrow('Amount must be a number')
    });
});

describe('pluralizeItems', () => {
    test('склоняет «товар» правильно', () => {
        expect(pluralizeItems(1)).toBe('1 товар')
    });
});

describe('pluralizeItems', () => {
    test('склоняет «товар» правильно', () => {
        expect(pluralizeItems(2)).toBe('2 товара')
    });
});

describe('pluralizeItems', () => {
    test('склоняет «товар» правильно', () => {
        expect(pluralizeItems(3)).toBe('3 товара')
    });
});