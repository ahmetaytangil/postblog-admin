export function getSrc(color: string | undefined, name: string | undefined) {
  return `./assets/images/icons/navigation/courier-${ name }-${ color ? color : "orange" }.svg`
}
