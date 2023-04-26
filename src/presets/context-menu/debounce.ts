export function debounce(cb: () => void) {
  return {
    timeout: null as null | number,
    cancel() {
      if (this.timeout) {
        window.clearTimeout(this.timeout)
        this.timeout = null
      }
    },
    call(delay: number) {
      this.timeout = window.setTimeout(() => {
        cb()
      }, delay)
    }
  }
}
