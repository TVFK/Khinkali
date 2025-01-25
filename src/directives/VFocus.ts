import type { Directive } from 'vue'

const VFocus: Directive = {
  mounted(el: HTMLElement) {
    el.focus()
  },
}

export default VFocus
