export interface OrderItem {
  khinkaliId: number
  quantity: number
}

export interface Order {
  name: string
  email: string
  phone: string
  address: string
  deliveryASAP: boolean
  deliveryDate: string | null
  paymentMethod: string
  comments: string
  amount: number
  orderItemsList: OrderItem[]
}
