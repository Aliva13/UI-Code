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
    {
      header: 'Events Timeline',
      type: "eventsTimeline",
      data: [{
        date: "Jun 12, 2023",
        eventData: [{
          time: "11:04",
          heading:"Departed",
          headingCls:"info",
          content: "Altamira, Mexico"
        }, {
          time: "12:36",
          content: "Cleared Altamira port and set course towards Houston."
        },{
          time: "16:04",
          content: "Crossed the border into international waters"
        },{
          time: "20:54",
          heading:"Delay",
          headingCls:"warning",
          content: "Minor delay due to rough seas"
        },{
          time: "23:17",
          heading:"Layover",
          headingCls:"primary",
          content: "Reached Brownsville, Texas"
        }]
      },
      {
        date: "Jun 12, 2023",
        eventData: [{
          time: "02:00",
          heading:"Departed",
          headingCls:"info",
          content: "Brownsville, resuming the journey."
        }, {
          time: "06:30",
          content: "Crossed into Texas waters"
        },{
          time: "09:04",
          content: "Entered Gulf Intracoastal Waterway."
        },{
          time: "12:54",
          heading:"Layover",
          headingCls:"primary",
          content: "Arrived in Galveston, Texas."
        },{
          time: "15:07",
          heading:"Voyage Complete",
          headingCls:"success",
          content: "Docked in Houston, Texas."
        }]
      }]
    },
    {
      header: "Voyage Information",
      type: "voyageInfo",
      data: [
        { label: "Vessel", value: "Jaime Devall" },
        { label: "Navigational Status", value: "Underway" },
        { label: "Speed", value: "30kn" },
        { label: "Course", value: "34 &deg" },
      ]
    },
    {
      header: "Cargo details",
      type: "activityLog"
    },
    {
      header: "Crew",
      type: "activityLog"
    },
    {
      header: "Technical details",
      type: "activityLog"
    }
  ];
  @Output() menuDataEmitter = new EventEmitter();

  closeMenuData() {
    this.menuDataEmitter.emit({ type: "closeMenuData" });
  }
  actionBtnClick(type: string) {
    try {
      if (type === 'Enter Towing Vessel Log' || type === 'Open Towing Vessel Record') {
        this.menuDataEmitter.emit({ type: "showMenuRecord", extraKey: 'vessel record' });
      } else if (type === 'Complete Change of Watch' || type === 'Open Change of Watch') {
        this.menuDataEmitter.emit({ type: "showMenuRecord", extraKey: 'change of watch' });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
