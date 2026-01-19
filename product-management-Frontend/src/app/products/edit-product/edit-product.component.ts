import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit {

  productId!: string;
  loading = false;

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required]
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.loadProduct();
  }

  loadProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price
        });
      },
      error: err => console.error(err)
    });
  }

  submit() {
    if (this.productForm.invalid) return;

    this.loading = true;

    this.productService.updateProduct(this.productId, this.productForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: err => {
          console.error(err);
          this.loading = false;
        }
      });
  }
}
