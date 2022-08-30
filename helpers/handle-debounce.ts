let to = null as null | any;
export default function handleDebounce(fn: () => void, timeout = 200) {
  if (to) {
    clearTimeout(to);
  }

  to = setTimeout(fn, timeout);
}
