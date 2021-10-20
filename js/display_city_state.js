var xhr = new XMLHttpRequest();
let citiesByState = "";
// Initiate request.
xhr.onreadystatechange = reportStatus;
xhr.open("GET", "../assets/json/states_city.json", true);  // get json file.
xhr.send();

function reportStatus() {
    if (xhr.readyState == 4) {		
        citiesByState = JSON.parse(this.responseText);
    }
}
let stateList = [['Andaman and Nicobar Islands','Andhra Pradesh','Arunachal Pradesh',
                'Assam','Bihar','Chandigarh','Chhattisgarh','Dadra and Nagar Haveli','Delhi','Goa',
                'Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka',
                'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland',
                'Odisha','Puducherry','Punjab','Rajasthan','Tamil Nadu','Telangana','Tripura',
                'Uttar Pradesh','Uttarakhand','West Bengal']];

function makeState(){
    makeSubmenu(0,stateList,"state")
}
function makeCity(value){
    makeSubmenu(value,citiesByState,"city");
}

function makeSubmenu(value,map,elementId) {
    if(value.length==0) document.getElementById(elementId).innerHTML = "<option></option>";
    else {
    entity = elementId.replace(/(\w)(\w*)/g,
        function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();});
    var citiesOptions = "<option value=''>Select "+entity+"</option>";
    for(cityId in map[value]) {
    citiesOptions+="<option>"+map[value][cityId]+"</option>";
    }
    document.getElementById(elementId).innerHTML = citiesOptions;
    }
    }