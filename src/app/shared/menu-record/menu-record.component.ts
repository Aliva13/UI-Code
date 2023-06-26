import { Component, Output, EventEmitter, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-menu-record',
  templateUrl: './menu-record.component.html',
  styleUrls: ['./menu-record.component.scss']
})
export class MenuRecordComponent implements OnInit {
  @Output() menuDataEmitter = new EventEmitter();
  @Input() type: any = '';
  @Input() menuContentToshow: any = '';

  public timenow = '';
  public recordData = {
    dataList: [
      {
        title: '12 Jun 2023, 19:30',
        content: 'Course adjusted to 300 degrees. Speed: 10 knots. Weather: Overcast but calm. Sea state: Moderate.'
      }, {
        title: '12 Jun 2023, 23:31',
        content: 'Course held at 300 degrees. Speed: 8 knots. Weather: Light rain, visibility reduced. Sea state: Rough.'
      }, {
        title: '13 Jun 2023, 03:34',
        content: 'Standby. Weather: Clear skies, good visibility. Sea state: Calm.',
        image: true,
        imageSrc: 'assets/images/towboat.jpg'
      }
    ],
    warning: true,
    warningMsg: "The data entry was due at 13 Jun, 07:30 and is now overdue.",
    formRequired: true
  };
  public watchData = {
    dataList: [
      {
        content: 'Status of current operations'
      },
      {
        content: 'State of the transfer, if in progress, including performance of barge equipment and tankerman approaching work hour limits.'
      }, {
        content: 'Any Incidents, near misses or injuries since last watch.'
      },
      {
        content: 'Information vital to the scheduler.'
      }, {
        content: 'Work Instructions or duties in progress by the crew, including open Permits to Work or hazardous situations onboard.'
      }, {
        content: 'Conditions/hazards critical areas likely to be encountered during the watch.'
      }, {
        content: 'Any new or changed orders between vessel and Logistics Department.'
      }, {
        content: 'Any changes in MARSEC level.'
      }, {
        content: 'Any changes to Master’s Standing Orders.'
      }, {
        content: 'Any distress calls sent or received during watch.'
      }, {
        content: 'Any emails,safety flashes or general communications from the office.'
      }
    ]
  };
  ngOnInit() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const d = new Date();
    this.timenow = d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear() + " , " + d.getHours() + ":" + d.getMinutes()
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (this.menuContentToshow) {
        this.menuContentToshow = this.menuContentToshow;
      }
    }
  }
  closeRecord() {
    this.menuDataEmitter.emit({ type: "closeMenuRecord" });
  }

}
