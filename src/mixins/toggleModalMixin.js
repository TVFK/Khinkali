export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    emits: ['close'],
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
  },
}
