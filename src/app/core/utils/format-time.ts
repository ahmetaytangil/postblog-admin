export const formatTime = (value: string) => {
  return value?.length > 2 ? value.slice(0, 2) + ':' + value.slice(2, 4) : value
}
