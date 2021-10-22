function chr4() {
  return Math.random().toString(16).slice(-4);
}

export default () => `${chr4() + chr4()
}-${chr4()
}-${chr4()
}-${chr4()
}-${chr4()}${chr4()}${chr4()}`;
