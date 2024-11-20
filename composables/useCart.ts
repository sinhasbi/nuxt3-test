import useFetchApi from "@/composables/useFetchApi"
import { useCartStore } from "@/store/cart"

export function useCart() {
  const { request } = useFetchApi()
  const {
    setCartId,
    setCartItems,
    addProductToCart,
    removeProductFromCart,
    updateProductQty
  } = useCartStore()

  // const request = async (url: string, options: RequestInit = {}): Promise<any> => {
  //   try {
  //     const response = await fetch(`${process.env.ApiUrl}${url}`, {
  //       ...options,
  //       credentials: 'include',
  //     });

  //     if (!response.ok) throw new Error('Network response was not ok');
  //     return await response.json();
  //   } catch (error) {
  //     console.error('API request error:', error);
  //     throw error;
  //   }
  // };
  interface Product {
    id: string
    data: {
      id: string
      price: number
    }
    quantity: number
  }

  const getCart = async () => {
    const url: string = "/api/v1/cart"
    const response = await request(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response
  }

  const addToCart = async (cartId: string, productId: string, qty: number) => {
    const url: string = "/api/v1/cart/items"
    const response = await request(url, {
      method: "POST",
      body: JSON.stringify({
        cart_id: cartId,
        product_id: productId,
        quantity: qty
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response
  }

  const updateCartItem = async (itemId: string, qty: number) => {
    const url: string = `/api/v1/cart/items/${itemId}`
    const response = await request(url, {
      method: "PUT",
      body: JSON.stringify({
        item_id: itemId,
        quantity: qty
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response
  }

  const removeCartItem = async (itemId: string) => {
    const url: string = `/api/v1/cart/items/${itemId}`
    const response = await request(url, {
      method: "DELETE"
    })
    return response
  }

  const clearCart = async (cartId: string) => {
    const url: string = `/api/v1/cart/${cartId}`
    const response = await request(url, {
      method: "DELETE"
    })
    return response
  }

  const getCartById = async (cartId: string) => {
    const url: string = `/api/v1/cart/${cartId}`
    const response = await request(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response
  }

  const updateCartItemsInCart = async (cartId: string) => {
    try {
      const cartItems = await getCartById(cartId)
      setCartItems(cartItems.data.items)
    } catch (error) {
      console.error("更新購物車失敗:", error)
      throw error
    }
  }

  const fetchAndSetCartData = async () => {
    try {
      const cartRes = await getCart()
      console.log("cartRes", cartRes)
      if (cartRes.code === 200) {
        const cartId: string = cartRes.data
        setCartId(cartId)
        await updateCartItemsInCart(cartId)
      } else {
        throw new Error("獲取購物車內容失敗")
      }
    } catch (error) {
      console.error("獲取購物車失敗:", error)
      throw error
    }
  }

  const addCartItem = async (
    cartId: string,
    addProduct: Product,
    quantity: number
  ) => {
    if (!addProduct.id || quantity <= 0) {
      console.error("addProductToCart: 無效的商品ID或數量")
      throw new Error("無效的商品ID或數量")
    }

    try {
      const response = await addToCart(cartId, addProduct.id, quantity)

      if (response.code === 200) {
        console.log("商品已成功加入購物車", response.data)

        await updateCartItemsInCart(cartId)
        addProductToCart(addProduct, quantity)

        console.log("商品已成功加入購物車")
      } else if (response.code === 500) {
        console.log("商品已經在購物車中")
      } else {
        console.log("加入購物車失敗", response.data)

        throw new Error("加入購物車失敗")
      }
    } catch (error) {
      console.error("加入購物車時發生錯誤:", error)
      throw error
    }
  }

  const removeItemFromCart = async (itemId: string, cartId: string) => {
    if (!itemId) {
      console.error("removeCartItem: itemId 不能為空")
      throw new Error("無效的商品ID")
    }

    try {
      const response = await removeCartItem(itemId)

      if (response.code === 200) {
        removeProductFromCart(itemId)
        await updateCartItemsInCart(cartId)
        console.log("商品已從購物車中移除", itemId)
      } else {
        console.log("移除商品失敗", response.code, response.data)
      }

      return response
    } catch (error) {
      console.error("從購物車移除商品時發生錯誤:", error)
      throw error
    }
  }

  const updateCartItemQty = async (product: Product, quantity: number) => {
    try {
      const itemId = product.id
      console.log(`更新商品 ID: ${itemId}, 新數量: ${quantity}`)
      await updateCartItem(itemId, quantity)
      updateProductQty(product, quantity)
    } catch (error) {
      console.error("更新購物車商品數量失敗:", error)
      throw error
    }
  }

  return {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    getCartById,
    updateCartItemsInCart,
    fetchAndSetCartData,
    addCartItem,
    removeItemFromCart,
    updateCartItemQty
  }
}
