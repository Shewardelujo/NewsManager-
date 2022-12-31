import { Component, Input, OnInit } from '@angular/core';
import { dData } from 'src/app/dummydata/ddata';
import { NewsApiStateService } from 'src/app/services/news-api-state.service';

@Component({
  selector: 'app-horizontal-page-card',
  templateUrl: './horizontal-page-card.component.html',
  styleUrls: ['./horizontal-page-card.component.scss'],
})
export class HorizontalPageCardComponent implements OnInit {
  @Input() item!: dData;
  readLaterList!: dData[];

  constructor(private apiState: NewsApiStateService) {}

  ngOnInit(): void {}

  storeNews(item: dData) {
    console.log('item', item);
    this.apiState.getReadLater.subscribe((res) => {
      this.readLaterList = res;
      console.log('res', res);
    });
    const preExistingReadL = this.readLaterList.find(
      (readL) => readL.title === item.title
    );

    if (preExistingReadL == undefined) {
      this.readLaterList = [...this.readLaterList, item];
    }
    this.apiState.setReadLater(this.readLaterList);
  }
}
