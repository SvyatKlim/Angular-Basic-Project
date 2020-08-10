import { Component, OnInit, TemplateRef } from '@angular/core';
import { IDiscount } from 'src/app/shared/interfaces/discount.interface';
import { Discount } from 'src/app/shared/models/discount.model';
import { DiscountService } from 'src/app/shared/services/discount.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss'],
  providers: []
})
export class AdminDiscountComponent implements OnInit {
  adminDiscount: Array<IDiscount> = [];
  dID = 1;
  dTitle: string;
  dText: string;
  dImage = 'https://www.lapiec-pizza.com.ua/wp-content/uploads/2020/05/aktsiya-dlya-sajta-21.jpg';
  editStatus = false;

  modalRef: BsModalRef;
  modalRefconfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(private dService: DiscountService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getAdminDiscount();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
  }

  getAdminDiscount(): void {
    this.adminDiscount = this.dService.getDiscount();
  }

  addDiscount(): void {
    const discount = new Discount(this.dID, this.dTitle, this.dText, this.dImage);
    if (!this.editStatus) {
      if (this.adminDiscount.length > 0) {
        discount.id = this.adminDiscount.slice(-1)[0].id + 1;
      }
      this.dService.addDiscount(discount);
    }
    else {
      this.dService.updateDiscount(discount);
      this.editStatus = false;
    }
    this.modalRef.hide();
    this.resetForm();
  }

  deleteDiscount(discount: IDiscount): void {
    if (confirm('Are you sure')){
      this.dService.deleteDiscount(discount.id);
    }
  }

  editDiscount(template: TemplateRef<any>, discount: IDiscount): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
    this.dID = discount.id;
    this.dTitle = discount.title;
    this.dText = discount.text;
    this.dImage = discount.image;
    this.editStatus = true;
  }

  private resetForm(): void {
    this.dID = 1;
    this.dTitle = '';
    this.dText = '';
    this.dImage = 'https://www.lapiec-pizza.com.ua/wp-content/uploads/2020/05/aktsiya-dlya-sajta-21.jpg';
  }
}
