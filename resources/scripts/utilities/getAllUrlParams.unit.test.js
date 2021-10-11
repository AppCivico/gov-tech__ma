import getAllUrlParams from './getAllUrlParams';

const sample = [
  [
    'https://foo.bar.com/text?text=financiamento%20de%20im%C3%B3vel', {
      text: 'financiamento de imóvel'
    }
  ],
  [
    'https://foo.bar/?aux%C3%ADlio=vale%2520g%25C3%25A1s&Emiss%25C3%25A3o=2%C2%AA%20via%20de%20contas%20d%27%C3%A1gua%3F', {
      auxílio: 'vale gás',
      Emissão: '2ª via de contas d\'água?'
    }
  ],
  [
    'https://foo.bar/?Emiss%C3%A3o=Declara%25C3%25A7%25C3%25A3o%2520de%2520Transfer%25C3%25AAncia%2520Animal%2520%2528DTA%2529', {
      Emissão: 'Declaração de Transferência Animal (DTA)'
    }
  ],
];

test.each(sample)('getAllUrlParams()', (a, expected) => {
  expect(getAllUrlParams(a)).toStrictEqual(expected);
});
