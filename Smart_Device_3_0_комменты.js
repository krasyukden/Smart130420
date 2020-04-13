"use strict";

class Device {
	constructor(name, modes){
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
	





let airBedroom = new AirConditioning("airBedroom", ["tropics", "pole", "dry", "fan"]);
let washingMachine = new WashingMachine("washingMachine");

console.log(airBedroom.name);
//console.log(airBedroom.roomName);
console.log(airBedroom.status);
airBedroom.on();
console.log(airBedroom.status);
console.log(airBedroom._temperature);//!! если просто temperature - undefined
airBedroom.increaseTemperature();
console.log(airBedroom._temperature);
airBedroom.decreaseTemperature();
console.log(airBedroom._temperature);
airBedroom.temperature = 16;//36 уже не ставит
console.log(airBedroom._temperature);
console.log(airBedroom.getMode());
console.log(airBedroom.getModes());
airBedroom.setMode("pole");
console.log(airBedroom.getMode());
airBedroom.addMode("temperate");//"temperate123456" - не добавил
airBedroom.setMode("temperate");
console.log(airBedroom.getMode());
console.log(airBedroom.getModes());
airBedroom.previousMode();
console.log(airBedroom.getMode());
airBedroom.nextMode();
console.log(airBedroom.getMode());
airBedroom.temperature = 35;
console.log(airBedroom._temperature);

//стиралка
console.log(washingMachine.name);
washingMachine.setMode("rinse");
console.log(washingMachine.status);
washingMachine.waterLevel = 7;// работ
washingMachine.on();
console.log(washingMachine.status);
//console.log(washingMachine._temperature);//!! если просто temperature - undefined
//washingMachine.temperature = 16;
//console.log(washingMachine._temperature);
console.log(washingMachine.getMode());
console.log(washingMachine.getModes());
washingMachine.setMode("rinse");
console.log(washingMachine.getMode());
washingMachine.addMode("spin");//"temperate123456" - не добавил
washingMachine.setMode("spin");
console.log(washingMachine.getMode());
console.log(washingMachine.getModes());
washingMachine.previousMode();
console.log(washingMachine.getMode());
washingMachine.nextMode();
console.log(washingMachine.getMode());
//washingMachine.temperature = 35;
//console.log(washingMachine._temperature);