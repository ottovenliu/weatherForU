// ['嘉義縣','新北市','嘉義市','新竹縣','新竹市','臺北市',
// '臺南市','宜蘭縣','苗栗縣','雲林縣','花蓮縣','臺中市',
// '臺東縣','桃園市','南投縣','高雄市','金門縣','屏東縣',
// '基隆市','澎湖縣','彰化縣','連江縣']

// database: F-C0032-001 "三十六小時天氣預報"
fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization="+CWB_API_KEY).then((response)=>{
	return response.json();
}).then((data)=>{
	data=data.records;
	console.log(data)
	// renderData(data)
	dataProcessing(data)
});

let locations=[];
function dataProcessing(rawdata){
	let length=rawdata.location.length
	let county = [
			'基隆市','新北市','臺北市','宜蘭縣','桃園市',
			'新竹市','新竹縣','苗栗縣','臺中市','彰化縣',
			'雲林縣','南投縣','嘉義市','嘉義縣','臺南市',
			'高雄市','屏東縣','臺東縣','花蓮縣','澎湖縣',
			'金門縣','連江縣']
	list=[]
	
	for (let j=0; j<22; j++){
		for (let i=0; i<length; i++){
			const location=rawdata.location[i]
			const locationName=location.locationName
			if(locationName == county[j]){
				// console.log(locationName, county[j])		
				list[j]= {
					"location": location}
				locations.push(list[j])
				
			};
		}
	}
	console.log(locations);
	render(locations);
	initWeather(locations)
}


function render(data){
	// console.log(data.length)
	let length=data.length;

	for(let i=0; i<length; i++){
		const location=data[i].location;
		const dflex = document.createElement("li")
		dflex.className="d-flex"
		dflex.setAttribute('id', data[i].location.locationName)
		dflex.setAttribute("onclick", "searchWeather(event)")

		const everycity= document.createElement("span")
		everycity.className="every-city"
		everycity.setAttribute('id', data[i].location.locationName)
		everycity.textContent=data[i].location.locationName + "  "
		// everycity.setAttribute("onclick", "searchWeather(event)")

		const everytext=document.createElement("div")
		everytext.className="every-text"
	
		const everymin= document.createElement("span")
		everymin.className="every-min"
		everymin.textContent=data[i].location.weatherElement[2].time[0].parameter.parameterName + '℃ - '	

		const everymax= document.createElement("span")
		everymax.className="every-max"
		everymax.textContent=data[i].location.weatherElement[4].time[0].parameter.parameterName + '℃'	
		
		const cityIcon = document.createElement("img")
		cityIcon.className="every-city-icon"
		// console.log(everycity.textContent, data[i].location.weatherElement[1].time[0].parameter.parameterName + '%')
		if (data[i].location.weatherElement[1].time[0].parameter.parameterName<=30){
			cityIcon.src="images/clear 2.png"
		};
		if ((30<data[i].location.weatherElement[1].time[0].parameter.parameterName)&&(data[i].location.weatherElement[1].time[0].parameter.parameterName<=60)){
			cityIcon.src="images/cloudy 6.png"
		};
		if (60<data[i].location.weatherElement[1].time[0].parameter.parameterName){
			cityIcon.src="images/rainy 1.png"
		};
		

		everytext.append(everycity, everymin, everymax, cityIcon)
		dflex.appendChild(everytext)
		
		const everywrap=document.querySelector("#everyWrap")
		everywrap.appendChild(dflex)
	}
}


// getWeather(left country default = '基隆市')
function initWeather(){
	let searchName= "基隆市";
	let length=locations.length;
	const i=0;
	const locationName=locations[i].location.locationName;
	if (searchName == locationName){
		const county = document.querySelector('h1')
		county.textContent=locationName

		// check Time Period
		let startTime=locations[i].location.weatherElement[2].time[0].startTime.slice(0,10)
		let startHour=locations[i].location.weatherElement[2].time[0].startTime.slice(11,13)
		tabShift(startTime,startHour)

		// Period 1 
		const period1Min = document.querySelector(".morning-min")
		period1Min.textContent=locations[i].location.weatherElement[2].time[0].parameter.parameterName + '℃ - '	

		const period1Max= document.querySelector(".morning-max")
		period1Max.textContent=locations[i].location.weatherElement[4].time[0].parameter.parameterName + '℃'	

		const probRain = document.querySelector(".morning-rain")
		probRain.textContent=locations[i].location.weatherElement[1].time[0].parameter.parameterName + '%'
	
		const period1Icon = document.querySelector(".period1-icon")
		if (locations[i].location.weatherElement[1].time[0].parameter.parameterName<=30){
			period1Icon.src="images/clear 2.png"
		};
		if ((30<locations[i].location.weatherElement[1].time[0].parameter.parameterName)&&(locations[i].location.weatherElement[1].time[0].parameter.parameterName<=60)){
			period1Icon.src="images/cloudy 6.png"
		};
		if (60<locations[i].location.weatherElement[1].time[0].parameter.parameterName){
			period1Icon.src="images/rainy 1.png"
		};
	
		// Period 2 
		const period2Min = document.querySelector(".night-min")
		period2Min.textContent=locations[i].location.weatherElement[2].time[1].parameter.parameterName + '℃ - '	

		const period2Max= document.querySelector(".night-max")
		period2Max.textContent=locations[i].location.weatherElement[4].time[1].parameter.parameterName + '℃'	

		const probRain2 = document.querySelector(".night-rain")
		probRain2.textContent=locations[i].location.weatherElement[1].time[1].parameter.parameterName + '%'
	
		const period2Icon = document.querySelector(".period2-icon")
		if (locations[i].location.weatherElement[1].time[1].parameter.parameterName<=30){
			period2Icon.src="images/clear 2.png"
		};
		if ((30<locations[i].location.weatherElement[1].time[1].parameter.parameterName)&&(locations[i].location.weatherElement[1].time[1].parameter.parameterName<=60)){
			period2Icon.src="images/cloudy 6.png"
		};
		if (60<locations[i].location.weatherElement[1].time[1].parameter.parameterName){
			period2Icon.src="images/rainy 1.png"
		};

		// Period 3
		const period3Min = document.querySelector(".tomorrow-min")
		period3Min.textContent=locations[i].location.weatherElement[2].time[2].parameter.parameterName + '℃ - '	

		const period3Max= document.querySelector(".tomorrow-max")
		period3Max.textContent=locations[i].location.weatherElement[4].time[2].parameter.parameterName + '℃'	

		const probRain3 = document.querySelector(".tomorrow-rain")
		probRain3.textContent=locations[i].location.weatherElement[1].time[2].parameter.parameterName + '%'
	
		const period3Icon = document.querySelector(".period3-icon")
		if (locations[i].location.weatherElement[1].time[2].parameter.parameterName<=30){
			period3Icon.src="images/clear 2.png"
		};
		if ((30<locations[i].location.weatherElement[1].time[2].parameter.parameterName)&&(locations[i].location.weatherElement[1].time[2].parameter.parameterName<=60)){
			period3Icon.src="images/cloudy 6.png"
		};
		if (60<locations[i].location.weatherElement[1].time[2].parameter.parameterName){
			period3Icon.src="images/rainy 1.png"
		};
	}
};



// locations 全域變數
function searchWeather(event){
	let searchName= event.currentTarget.id
	let length=locations.length;
	
	for(let i=0; i<length; i++){
		const locationName=locations[i].location.locationName;
		if (searchName == locationName){
			const county = document.querySelector('h1')
			county.textContent=locationName

			// check Time Period
			let startTime=locations[i].location.weatherElement[2].time[0].startTime.slice(0,10)
			let startHour=locations[i].location.weatherElement[2].time[0].startTime.slice(11,13)
			tabShift(startTime,startHour)

			// Period 1 
			const period1Min = document.querySelector(".morning-min")
			period1Min.textContent=locations[i].location.weatherElement[2].time[0].parameter.parameterName + '℃ - '	

			const period1Max= document.querySelector(".morning-max")
			period1Max.textContent=locations[i].location.weatherElement[4].time[0].parameter.parameterName + '℃'	

			const probRain = document.querySelector(".morning-rain")
			probRain.textContent=locations[i].location.weatherElement[1].time[0].parameter.parameterName + '%'
		
			const period1Icon = document.querySelector(".period1-icon")
			if (locations[i].location.weatherElement[1].time[0].parameter.parameterName<=30){
				period1Icon.src="images/clear 2.png"
			};
			if ((30<locations[i].location.weatherElement[1].time[0].parameter.parameterName)&&(locations[i].location.weatherElement[1].time[0].parameter.parameterName<=60)){
				period1Icon.src="images/cloudy 6.png"
			};
			if (60<locations[i].location.weatherElement[1].time[0].parameter.parameterName){
				period1Icon.src="images/rainy 1.png"
			};
		
			// Period 2 
			const period2Min = document.querySelector(".night-min")
			period2Min.textContent=locations[i].location.weatherElement[2].time[1].parameter.parameterName + '℃ - '	

			const period2Max= document.querySelector(".night-max")
			period2Max.textContent=locations[i].location.weatherElement[4].time[1].parameter.parameterName + '℃'	

			const probRain2 = document.querySelector(".night-rain")
			probRain2.textContent=locations[i].location.weatherElement[1].time[1].parameter.parameterName + '%'
		
			const period2Icon = document.querySelector(".period2-icon")
			if (locations[i].location.weatherElement[1].time[1].parameter.parameterName<=30){
				period2Icon.src="images/clear 2.png"
			};
			if ((30<locations[i].location.weatherElement[1].time[1].parameter.parameterName)&&(locations[i].location.weatherElement[1].time[1].parameter.parameterName<=60)){
				period2Icon.src="images/cloudy 6.png"
			};
			if (60<locations[i].location.weatherElement[1].time[1].parameter.parameterName){
				period2Icon.src="images/rainy 1.png"
			};

			// Period 3
			const period3Min = document.querySelector(".tomorrow-min")
			period3Min.textContent=locations[i].location.weatherElement[2].time[2].parameter.parameterName + '℃ - '	

			const period3Max= document.querySelector(".tomorrow-max")
			period3Max.textContent=locations[i].location.weatherElement[4].time[2].parameter.parameterName + '℃'	

			const probRain3 = document.querySelector(".tomorrow-rain")
			probRain3.textContent=locations[i].location.weatherElement[1].time[2].parameter.parameterName + '%'
		
			const period3Icon = document.querySelector(".period3-icon")
			if (locations[i].location.weatherElement[1].time[2].parameter.parameterName<=30){
				period3Icon.src="images/clear 2.png"
			};
			if ((30<locations[i].location.weatherElement[1].time[2].parameter.parameterName)&&(locations[i].location.weatherElement[1].time[2].parameter.parameterName<=60)){
				period3Icon.src="images/cloudy 6.png"
			};
			if (60<locations[i].location.weatherElement[1].time[2].parameter.parameterName){
				period3Icon.src="images/rainy 1.png"
			};

		
		}
	}
}


function tabShift(startTime,startHour){
	let TimeName = {
		'T06':{'A':'今日白天','B':'今晚明晨', 'C':'明日白天'},
		'T18':{'A':'今晚明晨','B':'明日白天', 'C':'明日晚上'},
	}
	if ((startHour=='06')){
		document.querySelector('#period1').textContent=TimeName.T06.A
		document.querySelector('#period2').textContent=TimeName.T06.B
		document.querySelector('#period3').textContent=TimeName.T06.C
	};
	if ((startHour=='00')){
		document.querySelector('#period1').textContent=TimeName.T18.A
		document.querySelector('#period2').textContent=TimeName.T18.B
		document.querySelector('#period3').textContent=TimeName.T18.C
	};
	if ((startHour=='12')){
		document.querySelector('#period1').textContent=TimeName.T06.A
		document.querySelector('#period2').textContent=TimeName.T06.B
		document.querySelector('#period3').textContent=TimeName.T06.C
	};
	if ((startHour=='18')){
		document.querySelector('#period1').textContent=TimeName.T18.A
		document.querySelector('#period2').textContent=TimeName.T18.B
		document.querySelector('#period3').textContent=TimeName.T18.C
	};
}




