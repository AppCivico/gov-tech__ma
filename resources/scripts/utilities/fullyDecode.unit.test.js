import fullyDecode from './fullyDecode';

const sample = [
  ['financiamento%20de%20im%C3%B3vel', 'financiamento de imóvel'],
  ['Emiss%2525C3%2525A3o', 'Emissão'],
];

test.each(sample)('fullyDecode()', (a, expected) => {
  expect(fullyDecode(a)).toBe(expected);
});
