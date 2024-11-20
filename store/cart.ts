import { defineStore } from "pinia"
import { ref, computed } from "vue"

interface productData {
  id: string
  price: number
}
// 定義商品類型
interface Product {
  id: string
  data: productData
  quantity: number
}

// 定義狀態類型
interface CartState {
  cartId: string
  dataList: Product[]
  checkedList: Product[]
}

export const useCartStore = defineStore("cart", () => {
  const cartId = ref<string>("")
  const dataList = ref<Product[]>([])
  const checkedList = ref<Product[]>([])

  // Actions
  const setCartId = (id: string): void => {
    console.log("設定購物車ID=", id)
    cartId.value = id
  }

  const setCartItems = (items: Product[]): void => {
    console.log("setCartItems(items=", items, ")")
    dataList.value = items.map(item => ({
      id: item.id,
      data: item.data,
      quantity: item.quantity
    }))
  }

  const addProductToCart = (product: Product, qty: number): void => {
    console.log(" addProduct(product=", product)
    console.log("productqty=", qty)
    if (product != null) {
      const cartItem = dataList.value.find(item => item.data.id === product.id)
      if (!cartItem) {
        dataList.value.push({ ...product, quantity: qty })
        console.log("加入購物車成功")
      } else {
        console.log("購物車已存在這個東西")
      }
    }
  }

  const updateProductQty = (product: Product, quantity: number): void => {
    console.log("[Action] updateProductQty() product=", product)
    console.log("productqty=", quantity)
    if (product != null) {
      const cartItem = dataList.value.find(
        item => item.data.id === product.data.id
      )
      if (cartItem) {
        cartItem.quantity = quantity
      }
    }
  }

  const removeProductFromCart = (id: string): void => {
    console.log("[Action] removeProductFromCart() id=", id)
    dataList.value = dataList.value.filter(data => data.id !== id)
    console.log("state.dataList=", dataList.value)
  }

  const updateCheckedProducts = (products: Product[]): void => {
    checkedList.value = products
  }

  const clearAll = (): void => {
    dataList.value = []
    checkedList.value = []
  }

  // Getters
  const cartProducts = computed(() => dataList.value)
  const cartTotalQty = computed(() => {
    return dataList.value.reduce(
      (total, product) => total + (product.quantity || 0),
      0
    )
  })
  const cartTotalPrice = computed(() => {
    return checkedList.value.reduce(
      (total, product) => total + product.data.price * product.quantity,
      0
    )
  })
  const checkedProducts = computed(() => checkedList.value)

  return {
    cartId,
    dataList,
    checkedList,
    setCartId,
    setCartItems,
    addProductToCart,
    updateProductQty,
    removeProductFromCart,
    updateCheckedProducts,
    clearAll,
    cartProducts,
    cartTotalQty,
    cartTotalPrice,
    checkedProducts
  }
})
