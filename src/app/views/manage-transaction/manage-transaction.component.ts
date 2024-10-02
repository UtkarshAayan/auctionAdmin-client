import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-transaction',
  standalone: false,
  templateUrl: './manage-transaction.component.html',
  styleUrl: './manage-transaction.component.scss'
})
export class ManageTransactionComponent {

  public visible2 = false;
  toggleLiveDemo2() {
    this.visible2 = !this.visible2;
  }



  handleLiveDemoChange2(event2: any) {
    this.visible2 = event2;
  }
}
