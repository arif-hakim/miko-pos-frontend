export const toThousands = (x, separator = '.') => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export const toPlain = (str) => {
  let res = parseInt(str.split(',').join(''))
  return isNaN(res) ? 0 : res
}