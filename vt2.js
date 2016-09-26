/*javascript koodi, vt2*/
"use strict";
window.onload = function() {

	var ruutuLkm = 8;
	

	
	var syottoAlue = document.getElementById("ruudukko");
	
	var field = syottoAlue.getElementsByTagName("fieldset")[0];
	
	// Luodaan radionappulakenttä
	var uusiField = document.createElement("fieldset");
	var napOts = document.createElement("legend");
	napOts.textContent = "Nappuloiden määrä";
	
	
	field.appendChild(uusiField);
	uusiField.appendChild(napOts);
	
	var luku = 3;
	for(var i=0 ; i< 5 ; i++){
		
		var p = document.createElement("p");
		var radioButton = document.createElement("input");
		radioButton.setAttribute("type","radio");
		radioButton.setAttribute("name","napMaara");
		radioButton.setAttribute("value",i);
		if(i == 0){
			radioButton.checked=true;
		}
		p.appendChild(radioButton);
		
		var arvo = document.createTextNode(luku);
		p.appendChild(arvo);
		
		uusiField.appendChild(p);
		luku = luku + (3+i);
	}
	//
	
	
	
	var input = syottoAlue.getElementsByTagName("input")[0];
	input.value="";
	
	
	
	var luo = document.getElementById("luo");
	
	var varod = document.createElement("div");
	
	varod.style.display="inline";
	varod.setAttribute("id","varod");
	field.getElementsByTagName("p")[0].appendChild(varod);
	
	luo.addEventListener("click", luonti);
	

	
	luoRuudut(8,0);

	
}
/*
function tarkistus(e){
	
	if (isNaN(parseInt(e.target.value)))
	    e.target.setAttribute("class","red");
}
*/

/*Luo uuden taulukon
	TODO: lisää pallot soluihin!!
*/
function luonti(e){
	e.preventDefault();
	
	var syottoAlue = document.getElementById("ruudukko");
	var input = syottoAlue.getElementsByTagName("input")[0];
	
	var uusiField = syottoAlue.getElementsByTagName("fieldset")[1];
	var radioList = uusiField.getElementsByTagName("input");
	
	// Tarkistetaan mikä on syötetty nappuloiden määrä
	var napLkm=3;
	
	for(var i=0 ; i < radioList.length ; i++){
		if(radioList[i].checked)
			napLkm = parseInt(radioList[i].value);
	}
		
	//console.log(napLkm);
	
	
	
	var syote=parseInt(input.value);
	console.log(syote);

	/*
	if(input.value == "")
		syote=8;
	*/
	console.log(syote);
	//var varoitus = document.createTextNode("");
	
	var field = syottoAlue.getElementsByTagName("fieldset")[0];
	luoRuudut(syote,napLkm);
    /*var varod = document.getElementById("varod");
	if (isNaN(syote) || syote < 8 || syote > 16){
	    varod.textContent = "Anna kokonaisluku väliltä 8-16!";
	}
	else{
		varod.textContent = "";		
		var body = document.getElementsByTagName("body")[0];
	    var taul = body.getElementsByTagName("table")[0];
		
		
	    body.removeChild(taul);	
		var uusiTaul = document.createElement("table");
		body.appendChild(uusiTaul);
		//var rivi = document.createElement("tr");
		for(var i=0 ; i<syote ; i++){
			var rivi=document.createElement("tr");
			uusiTaul.appendChild(rivi);
			for(var j=0 ; j<syote ; j++){
				var solu=document.createElement("td");
				rivi.appendChild(solu);
				if( j > ((syote-1)-(napLkm+2-i))){
				   var red = document.createElement("img");
		           red.src = "red.svg";
		           red.alt ="red";
				   solu.appendChild(red);
				   }
				   	
				if ( j < ((napLkm+2)-(syote-1-i))){
					var blue = document.createElement("img");
					blue.src = "blue.svg";
					blue.alt ="blue";
					solu.appendChild(blue);
				}
					
			}
		}
		ruudunLeveys(syote);
		ruutuVarit();*/
}

		


/*
Täytyy varmaan muuttaa skaalautuvaksi jossainvaiheessa
*/
function ruudunLeveys(){
	var taulukot=document.getElementsByTagName("table");
	var taulukko=taulukot[0];
	var ruudunLeveys = 50;//document.clientWidth; 
	console.log(ruudunLeveys);
	var ruudut = taulukko.getElementsByTagName("td");
	
	/*Asetetaan leveys ja korkeus ruuduille*/
	for(var i=0;i<ruudut.length ; i++){
		ruudut[i].style.width= ruudunLeveys+"px";
		ruudut[i].style.height= ruudunLeveys+"px";
	}
}

/*
Asettaa värityksen ruutuihin
*/
function ruutuVarit(){
	var taulukot=document.getElementsByTagName("table");
	var taulukko=taulukot[0];
	var rivit = taulukko.getElementsByTagName("tr");
	
	/*Asetetaan värit ruuduille*/
    for(var i=0;i<rivit.length ; i++){
		var rivinRuudut = rivit[i].getElementsByTagName("td");
		for(var j=0;j<rivinRuudut.length ; j++){
			if(i % 2)
				rivinRuudut[j].setAttribute("class","valko");
				
			else
				rivinRuudut[j].setAttribute("class","musta");
				
		}
	}
}

function luoRuudut(syote, napLkm){
	var varod = document.getElementById("varod");
	if (isNaN(syote) || syote < 8 || syote > 16){
	    varod.textContent = "Anna kokonaisluku väliltä 8-16!";
	}
	else{
		varod.textContent = "";		
		var body = document.getElementsByTagName("body")[0];
	    var taul = body.getElementsByTagName("table")[0];
		
		
	    body.removeChild(taul);	
		var uusiTaul = document.createElement("table");
		body.appendChild(uusiTaul);
		//var rivi = document.createElement("tr");
		for(var i=0 ; i<syote ; i++){
			var rivi=document.createElement("tr");
			uusiTaul.appendChild(rivi);
			for(var j=0 ; j<syote ; j++){
				var solu=document.createElement("td");
				rivi.appendChild(solu);
				if( j > ((syote-1)-(napLkm+2-i))){
				   var red = document.createElement("img");
		           red.src = "red.svg";
		           red.alt ="red";
				   solu.appendChild(red);
				   }
				   	
				if ( j < ((napLkm+2)-(syote-1-i))){
					var blue = document.createElement("img");
					blue.src = "blue.svg";
					blue.alt ="blue";
					solu.appendChild(blue);
				}
					
			}
		}
		ruudunLeveys();
		ruutuVarit();
}
}