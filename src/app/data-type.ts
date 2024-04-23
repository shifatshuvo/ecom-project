export interface signUp{
  name: String,
  password: String,
  email: String
}

export interface login{
  email: String,
  password: String
}

export interface product{
  name: string,
  price: number,
  category: string,
  color: string,
  description: string,
  image: string,
  id: number
  // userId: number,
  quantity: undefined | number
}

export interface cart{
  name: string,
  price: number,
  category: string,
  color: string,
  description: string,
  image: string,
  id: number | undefined,
  quantity: undefined | number,
  userId: number,
  productId: number
}