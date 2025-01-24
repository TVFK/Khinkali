import { defineStore } from 'pinia'
import { reactive, ref, onMounted, watch } from 'vue'

export const useCartStore = defineStore('cartStore', () => {
  const cart = reactive([])
  const totalAmount = ref(0)

  function clearCart() {
    cart.splice(0, cart.length)
    totalAmount.value = 0
    saveToLocalStorage()
  }

  function addCardToCart(card, quantity) {
    const existingCard = cart.find((c) => c.id === card.id)
    if (existingCard) {
      existingCard.quantity += quantity
    } else {
      cart.push({
        id: card.id,
        title: card.title,
        price: card.newPrice,
        quantity,
        image: card.image,
      })
    }
    totalAmount.value += card.newPrice * quantity
    saveToLocalStorage()
  }

  function removeCard(cardId) {
    const removingCard = cart.find((c) => c.id === cardId)
    if (!removingCard) {
      console.warn(`Card with ID ${cardId} not found.`)
      return
    }
    totalAmount.value -= removingCard.price * removingCard.quantity
    cart.splice(cart.indexOf(removingCard), 1)
    saveToLocalStorage()
  }

  function updateCardQuantity(cardId, change) {
    const existingCard = cart.find((c) => c.id === cardId)
    if (!existingCard) {
      console.warn(`Card with ID ${cardId} not found.`)
      return
    }
    existingCard.quantity += change
    totalAmount.value += existingCard.price * change

    if (existingCard.quantity <= 0) {
      removeCard(cardId)
    }
    saveToLocalStorage()
  }

  function isEmpty() {
    return cart.length === 0
  }

  function saveToLocalStorage() {
    localStorage.setItem(
      'cartStore',
      JSON.stringify({
        cart,
        totalAmount: totalAmount.value,
      }),
    )
  }

  function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('cartStore'))
    if (data) {
      cart.splice(0, cart.length, ...data.cart)
      totalAmount.value = data.totalAmount
    }
  }

  onMounted(() => {
    loadFromLocalStorage()
  })

  watch(() => ({ cart, totalAmount: totalAmount.value }), saveToLocalStorage, { deep: true })

  return { cart, totalAmount, clearCart, addCardToCart, removeCard, updateCardQuantity, isEmpty }
})
