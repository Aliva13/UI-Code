import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import 'leaflet-rotatedmarker';
import { ToasterService } from 'src/app/shared/toastr/toaster.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Subscription } from 'rxjs';
import { vesselsLegendData } from 'src/assets/json/vesselsLegendData';
@Component({
	selector: 'app-maps',
	templateUrl: './maps.component.html',
	styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

	public inputData: any;
	@Input() type: any = '';
	public map!: L.Map;
	public propertyList = [];
	public jsonDataResult: any;
	public label: string = "0,0";
	public subscription: Subscription;
	public markersArray = {}; // create the markers array
	public legendData = vesselsLegendData;
	public initMapData;
	constructor(private http: HttpClient, public _router: Router, private toasterService: ToasterService, private sharedService: SharedService) {
		// subscribe to home component messages
		this.subscription = this.sharedService.getClickedCardId().subscribe(id => {
			if (id) {
				// document.getElementById('map').click();
				this.markersArray[id].fire('mouseover');
				// this.markersArray[id].fire('click');
			}
		});
	};

	async ngOnInit() {
		try {
			this.initMapData = this.initMap();
		} catch (error) {
			console.log(error);
		}
	}
	// Initialise map
	private initMap(): void {
		try {
			let map = new L.Map('map', {
				maxZoom: 15,
				minZoom: 4,
				zoomControl: false
			}).setView([40, -110], 4);
			L.control.zoom({
				position: 'topright'
			}).addTo(map);

			let obm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
				maxZoom: 19
			}).addTo(map);

			let positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
				maxZoom: 19
			});


			let layersControl = new L.Control.Layers({
				'Simple Map': positron,
				'Standard Map': obm
			},
			).addTo(map);

			var circle = L.circleMarker([0, 0], {
				color: '#34C759',
				fillColor: '#34C759',
				radius: 20,
				weight: 7,
				className: 'loader'
			});
			var circle1 = L.circleMarker([0, 0], {
				color: '#707070',
				fillColor: '#34C759',
				radius: 18,
				weight: 2,
			});
			circle.addTo(map);
			circle1.addTo(map);
			let markerGroup = new L.LayerGroup();
			let loadvoyages = async () => {
				const res: any = await this.http.get('assets/json/voyages.json').toPromise();
				if (res && res.status === 'OK') {
					markerGroup.clearLayers();
					let boatIcon: any = new L.Icon({
						iconUrl: 'assets/images/vessel-view.svg',
						shadowUrl: undefined,
						iconSize: new L.Point(19, 26),
						iconAnchor: new L.Point(9, 13),
						popupAnchor: [0, 0],
					});
					res.data.forEach((item: any, i: number) => {
						var lat = item.LAT;
						var lng = item.LON;
						var marker: any = new L.Marker(new L.LatLng(lat, lng), { icon: boatIcon });
						marker.setRotationAngle(item.COURSE);
						marker.setRotationOrigin("center center");
						marker.options.mmsi = item.SHIPNAME;
						marker.options.status = item.STATUS_NAME;
						marker.on('mouseover', function (e: any) {
							if (e.latlng) {
								circle1.setLatLng([lat, lng]);
								circle.setLatLng([lat, lng]);
								this.bindPopup(item.NAVIGATIONAL_STATUS + " , " + item.SPEED + "kn /" + item.COURSE + "&deg").openPopup();
							} else {
								circle1.setLatLng([lat, lng]);
								circle.setLatLng([lat, lng]);
								this.bindPopup(item.NAVIGATIONAL_STATUS + " , " + item.SPEED + "kn /" + item.COURSE + "&deg").openPopup();
								const x = map.latLngToContainerPoint(e.target._latlng).x - 500;
								const y = map.latLngToContainerPoint(e.target._latlng).y;
								const point = map.containerPointToLatLng([x, y]);
								map.setView(point);
							}
						})
						marker.on('click', function (e: any) {
							const x = map.latLngToContainerPoint(e.target._latlng).x - 500;
							const y = map.latLngToContainerPoint(e.target._latlng).y;
							const point = map.containerPointToLatLng([x, y])
							map.setView(point);
							let content = "<div class='tooltip-div'><div class='card mb-0'><img class='card-img-top' src='assets/images/towboat.jpg' alt='Card image cap'style='height: 21vh;'>";
							content += "<div class='card-body px-3 py-2'><h5 class='card-title my-2'><div class='row m-0'><div class='col-3 p-0'><img src='assets/images/flag-mexico.svg' class='rounded-circle flag-img' /><label class='pt-1 pl-1'>" + item.ORIGINATION + "</label></div><div class='col-6'><input style='background: linear-gradient(to right, #17AAD8 0%, #17AAD8 " + item.DISTANCE_COVERED_PERCENT + "%, #707070 " + item.DISTANCE_COVERED_PERCENT + "%, #707070 100%);' type='range' min='1' max='100' value='" + item.DISTANCE_COVERED_PERCENT + "' class='slider mx-2' id='" + i + "' disabled ></div><div class='col-3 p-0 right-align'><label class='pt-1 pr-1'>" + item.DESTINATION + "</label><img class='rounded-circle flag-img' src='assets/images/flag-usa.svg'/></div></div></h5>";
							content += "<div class='row'><div class='col-6 op-7'><i class='fa fa-arrow-up pr-1'></i>" + item.START_DATE + "</div><div class='col-6 op-7'><i class='fa fa-arrow-down pr-1'></i>" + item.END_DATE + "</div></div>";
							content += "<div class='row'><div class='col-6 op-7'><i class='fa fa-ship pr-1'></i>" + item.SHIPNAME + "</div><div class='col-6 op-7'><i class='fa fa-arrows-h pr-1'></i>" + item.REMAINING_DISTANCE + " nm to reach</div></div>";
							content += "</div></div><h6 class='pt-2'>Voyage Information</h6><div class='card mb-0'><div class='card-body px-3 pt-2 pb-0'>"
							content += "<div class='bb-1'><label class='mb-0 op-7'>Vessel</label><br><label>" + item.SHIPNAME + "</label></div>"
							content += "<div class='bb-1'><label class='mb-0 op-7'>Navigational Status</label><br><label>" + item.NAVIGATIONAL_STATUS + "</label></div>"
							content += "<div class='bb-1'><label class='mb-0 op-7'>Latitude / Longitude</label><br><label>" + item.LAT + " / " + item.LON + "</label></div>"
							content += "<div ><label class='mb-0 op-7'>Speed / Course</label><br><label>" + item.SPEED + " kn / " + item.COURSE + " &deg;</label></div>"
							content += "</div></div><div class='row m-0 mt-2'><button class='btn btn-primary col-5 mx-2'>Track Route</button><button class='btn btn-primary col-5 mx-2'>More Info..</button></div></div>"
							var popup = L.tooltip()
								.setLatLng([lat, lng])
								.setContent(content)
								.openOn(map);
						})
						this.markersArray[item.SHIP_ID] = marker;
						markerGroup.addLayer(marker);
					});
					map.addLayer(markerGroup);
				} else {
					this.toasterService.toast('error', 'Error', res['message'] || 'Error while fetching data.');
				}
			};
			let loadvessels = async () => {
				var legend = new L.Control({ position: 'topright' });

				legend.onAdd = (map: any) => {
					let div = L.DomUtil.create('div', 'info legend');

					let legendInfo = '';
					for (let i = 0; i < this.legendData.length; i++) {
						legendInfo += '<i style="background:' + this.legendData[i].color + '"></i> ' +
							this.legendData[i].label + '<br>';
					}
					div.innerHTML = legendInfo;
					return div;
				};

				legend.addTo(map);

				const res: any = await this.http.get('assets/json/vessels.json').toPromise();
				if (res && res.status === 'OK') {
					markerGroup.clearLayers();
					res.data.forEach((item: any, i: number) => {
						var lat = item.LAT;
						var lng = item.LON;
						let iconUrl;
						if (item.STATUS === 'In Transit/Underway') {
							iconUrl = 'assets/images/vessel-in-transit.svg';
						} else if (item.STATUS === 'On Standby/Idle') {
							iconUrl = 'assets/images/vessel-on-standby.svg';
						} else if (item.STATUS === 'At Port/Docked') {
							iconUrl = 'assets/images/vessel-at-port.svg';
						} else if (item.STATUS === 'Awaiting Orders') {
							iconUrl = 'assets/images/vessel-awaiting-orders.svg';
						} else if (item.STATUS === 'In Drydock') {
							iconUrl = 'assets/images/vessel-in-drydock.svg';
						} else if (item.STATUS === 'In Inspection') {
							iconUrl = 'assets/images/vessel-in-inspection.svg';
						} else if (item.STATUS === 'Under Repair/Maintenance') {
							iconUrl = 'assets/images/vessel-under-repair.svg';
						} else {
							iconUrl = 'assets/images/vessel-under-charter.svg';
						}
						let boatIcon: any = new L.Icon({
							iconUrl: iconUrl,
							shadowUrl: undefined,
							iconSize: new L.Point(19, 26),
							iconAnchor: new L.Point(9, 13),
							popupAnchor: [0, 0],
						});

						var marker: any = new L.Marker(new L.LatLng(lat, lng), { icon: boatIcon });
						marker.setRotationAngle(item.COURSE);
						marker.setRotationOrigin("center center");
						marker.options.mmsi = item.SHIPNAME;
						marker.options.status = item.STATUS_NAME;
						markerGroup.addLayer(marker);
						marker.on('mouseover', function (e: any) {
							if (e.latlng) {
								circle1.setLatLng([lat, lng]);
								circle.setLatLng([lat, lng]);
								//this.bindPopup(item.NAVIGATIONAL_STATUS + " , " + item.SPEED + "kn /" + item.COURSE + "&deg").openPopup();
							} else {
								circle1.setLatLng([lat, lng]);
								circle.setLatLng([lat, lng]);
								// this.bindPopup(item.NAVIGATIONAL_STATUS + " , " + item.SPEED + "kn /" + item.COURSE + "&deg").openPopup();
								const x = map.latLngToContainerPoint(e.target._latlng).x - 500;
								const y = map.latLngToContainerPoint(e.target._latlng).y;
								const point = map.containerPointToLatLng([x, y]);
								map.setView(point);
							}
						})
					});
					map.addLayer(markerGroup);
				} else {
					this.toasterService.toast('error', 'Error', res['message'] || 'Error while fetching data.');
				}
			};
			if (this.type === 'voyages') {
				loadvoyages();
			} else if (this.type === 'vessels') {
				loadvessels();
			}
		} catch (error) {
			console.log(error);
		}
	}
	ngOnDestroy() {
		if (this.map) {
			this.map.remove();
		}
		// unsubscribe to ensure no memory leaks
		this.subscription.unsubscribe();
	}

}
