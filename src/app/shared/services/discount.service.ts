import { Injectable } from '@angular/core';
import { IDiscount } from '../interfaces/discount.interface';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private arrDiscount: Array<IDiscount> = [
    {
      id: 1,
      title: 'Наша фірмова акція “2+1”',
      text: 'Акція «2+1» діє в понеділок, вівторок, середу та четвер. Замовляйте дві піци та отримуйте ще одну безкоштовно! <br> * Безкоштовною вважається піца з найменшою вартістю. <br> ** Ця акція не поєднується з іншими акціями.',
      image: 'https://www.lapiec-pizza.com.ua/wp-content/uploads/2020/05/aktsiya-dlya-sajta-21.jpg'
    }
  ];
  constructor() { }

  getDiscount(): Array<IDiscount> {
    return this.arrDiscount;
  }

  addDiscount(discount: IDiscount): void {
    this.arrDiscount.push(discount);
  }

  deleteDiscount(id: number): void {
    const index = this.arrDiscount.findIndex(d => d.id === id);
    this.arrDiscount.splice(index, 1);
  }

  updateDiscount(discount: IDiscount): void {
    const index = this.arrDiscount.findIndex(d => d.id === discount.id);
    this.arrDiscount.splice(index, 1, discount);
  }
}
