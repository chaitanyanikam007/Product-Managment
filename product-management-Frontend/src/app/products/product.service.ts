import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any[]>(this.API_URL);
  }

  addProduct(product: any) {
    return this.http.post(this.API_URL, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  getProductById(id: string) {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  updateProduct(id: string, product: any) {
    return this.http.put(`${this.API_URL}/${id}`, product);
  }
}
