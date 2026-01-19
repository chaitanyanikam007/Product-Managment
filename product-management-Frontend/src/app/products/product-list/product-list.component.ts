import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
      this.loading = false;
    });
  }

  delete(id: string) {
    if (!confirm('Delete product?')) return;

    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(p => p._id !== id);
    });
  }
}
