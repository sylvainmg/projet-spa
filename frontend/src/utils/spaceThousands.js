export function spaceThounsands(number) {
  return new Intl.NumberFormat("fr-FR").format(number);
}
