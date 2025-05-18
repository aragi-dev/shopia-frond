export default interface Products {
  id?: string;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
  code: string;
  name: string;
  description?: string;
  cost: number;
  price: number;
  stock: number;
}