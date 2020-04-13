"use strict";

class Home{
	constructor(address, devices){
		this._address = address;
		this._devices = devices;
	}
	get adress(){
		return this._address;
	}
	set adress(value){
		if(typeof value == "string" && value.length <= 20){
				this._address = value;
		}	
	}	
	addDevice(dev){// работает
		//if(typeof value == "object"){// объект 
			this._devices.push(dev); // (new AirConditioning("airKitchen"));// или "airKitchen"???
		//}
	}
	getDeviceByName(dev){
		this._devices.forEach((value) => value);//undefined		
		
	}
	getAllDevices(){// работ
		return this._devices;
	}
	deleteDeviceByName(dev){
		//this._devices.filter( (dev) => !=dev);//Unexpected token '!='
		this._devices.splice(this._devices.indexOf(dev), 1);// работ
	}
}	
	
	
	
class Device extends Home{
	constructor(address, devices, name, modes){
		super(address, devices);
		this._name = name;
		this._status = false;
		this._modes = modes;
		this._currentMode = 0;
	}
	get name(){ 
		return this._name;
	}
	get status(){ 
		return this._status
	}
	on(){ 
		this._status = true;
	} 
	off(){ 
		this._status = false;
	}
	getMode() {
		return this._modes[this._currentMode]; 
	}
	getModes(){
		return this._modes;
	}	
	setMode(value) { 
      this._currentMode = this._modes.indexOf(value);
	}
	addMode(value) {
		if(typeof value == "string" && value.length <= 12){
			this._modes.push(value);
		}
	}
	nextMode() {
		if(this._currentMode < this._modes.length - 1){
			this._currentMode++;
		}
	}
	previousMode() {
		if(this._currentMode > 0){
			this._currentMode--;
		}
	}
}	

class AirConditioning extends Device {
	constructor(name, modes){
		super(name, modes);
		this._temperature = 20;
	}
	increaseTemperature(){
		if(this._temperature < 35){
			this._temperature++;
		}
	}
	decreaseTemperature(){
		if(this._temperature > 15){
			this._temperature--;
		}
	}
	set temperature(value) {
		if(typeof value == "number" && value <= 35 && value >= 15){
         this._temperature = value;
		}
   }
   get temperature(){
		return this._temperature;
	}
}

class WashingMachine extends Device {
	constructor(name){
		super(name);
		this._waterLevel = 0; // 0 - 10
		this._modes = ["wash", "intensive_wash", "rinse"]; // хватит 3 режима// ["wash", "intensive_wash", "rinse" -полоскание, "spin", "drain"];
		this._currentMode = 0;		
	}
    get waterLevel() {
	    return this._waterLevel;
	}
    set waterLevel(value) {
		if(typeof value == "number" && !isNaN(value) && value >= 0 && value <= 10){
			this._waterLevel = value;
		}	
	}
    on() {  // полиморфизм, для включения нужно проверить что уровня воды достаточно для режима
		switch(this._modes[this._currentMode]) {// если добавить режим - как контролировать объем воды - объект
			case "wash":
				if(this._waterLevel >= 5 && this._waterLevel <= 8){
					this._status = true;;
				};
				break;
			case "intensive_wash":
				if(this._waterLevel >= 6 && this._waterLevel <= 10){
					this._status = true;
				};
				break;
			case "rinse":
				if(this._waterLevel >= 8 && this._waterLevel <= 10){
					this._status = true;
				};
				break;
			default:
					return false;
		}
	}
}	
//let myHome = new Home("Bedroom", [new AirConditioning("airBedroom"), new WashingMachine("washingMachine")]);
let myHome = new Home("Bedroom", ["airBedroom", "washingMachine"]);
let myDevice = new Device(this._devices);
let airBedroom = new AirConditioning("airBedroom", ["tropics", "pole", "dry", "fan"]);
let washingMachine = new WashingMachine("washingMachine");
console.log(myHome._devices);//раб с _
myHome._address = "Kitchen";
console.log(myHome._address);
//myHome.addDevice("airBedroom");// раб
myHome.addDevice(new AirConditioning("airKitchen"));// или "airKitchen"???
console.log(myHome.getDeviceByName("airKitchen"));
console.log(myHome.getAllDevices());
myHome.deleteDeviceByName("washingMachine");
console.log(myHome.getAllDevices());