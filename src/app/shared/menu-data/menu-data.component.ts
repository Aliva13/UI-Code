import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-data',
  templateUrl: './menu-data.component.html',
  styleUrls: ['./menu-data.component.scss']
})
export class MenuDataComponent {
  public collapseTabs: any = [
    {
      header: "Actions Required",
      noOfActions: "2",
      type: "actionsRequired",
      data: [{
        title: "Change of Watch Reminder",
        content: "Please ensure to carry out a thorough discussion of relevant details, observations, issues and then handover.",
        button: true,
        buttonName: "Complete Change of Watch",
        emitEvent: true,
        buttonType: "Complete Change of Watch",
        minutes: "2"
      },
      {
        title: "Front Watch Shift starts soon",
        content: "As soon as front watch shift begins, the incoming crew will be notified to enter necessary information.",
        minutes: "3"
      },
      {
        title: "Towing Vessel Log Reminder",
        content: "Please fill out the Towing Vessel Record",
        button: true,
        buttonName: "Enter Towing Vessel Log",
        emitEvent: true,
        buttonType: "Enter Towing Vessel Log",
        minutes: "10"
      },
      ]
    },
    {
      header: "Activity Log",
      type: "activityLog",
      data: [{
        title: "Towing Vessel Record",
        content: "Please ensure to carry out a thorough discussion of relevant details, observations, issues and then handover.",
        button: true,
        buttonName: "Open Towing Vessel Record",
        emitEvent: true,
        buttonType: "Open Towing Vessel Record"
      }, {
        title: "Vessel Manning",
        content: "Please ensure to carry out a thorough discussion of relevant details, observations, issues and then handover.",
        button: true,
        buttonName: "Open Vessel Manning",
        emitEvent: true,
        buttonType: "Open Vessel Manning"
      },
      {
        title: "Change of Watch",
        content: "Please ensure to carry out a thorough discussion of relevant details, observations, issues and then handover.",
        button: true,
        buttonName: "Open Change of Watch",
        emitEvent: true,
        buttonType: "Open Change of Watch"
      }
      ]
    },
    { header: "Voyage Information" },
    { header: "Cargo details" },
    { header: "Crew" },
    { header: "Technical details" }
  ];
  @Output() menuDataEmitter = new EventEmitter();

  closeMenuData() {
    this.menuDataEmitter.emit({ type: "closeMenuData" });
  }
  actionBtnClick(type: string) {
    try {
      if (type === 'Enter Towing Vessel Log') {
        this.menuDataEmitter.emit({ type: "showMenuRecord" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
