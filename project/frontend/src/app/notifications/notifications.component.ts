import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';
import { Subscription } from 'rxjs';
import { NotificationsService } from './../notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  msgs: Message[] = [];
  subscription: Subscription;
  lifeTime:number = 3000;

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.subscribeToNotifications();
  }

  subscribeToNotifications() {
    this.subscription = this.notificationsService.notificationChange
    .subscribe(notification => {
      let notificationObject = <NotificationsComponent> notification;
      this.lifeTime = notificationObject.lifeTime;
      this.msgs = [];
      this.msgs.push(notification);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
