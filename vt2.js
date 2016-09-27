/*javascript koodi, vt2*/
"use strict";  
/*
Pitäisi saada toimimaan, että hypynjälkeen voi vain hyppiä ja 
maalialueelta ei saa poistua
*/
window.onload = function() {

	var ruutuLkm = 8;
	
	asetaVuoro();

	//var vuoro = Math.round(Math.random()); // arpoo vuoron
	//console.log(vuoro);
	
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
	

	
	luoRuudut(8,0,vuoro);

	
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
	
	
	var vuoro = Math.round(Math.random());
	
	var syottoAlue = document.getElementById("ruudukko");
	
	var vaihdettava = syottoAlue.lastChild;
	
	var vuoroAlue = document.createElement("div"); /// Luodaan täälläkin vuoroalue
	syottoAlue.replaceChild(vuoroAlue,vaihdettava);
	vuoroAlue.setAttribute("id","vuoroAlue");
	
	var red = document.createElement("img");
	red.src = "red.svg";
	red.alt ="red";
	
	var blue = document.createElement("img");
	blue.src = "blue.svg";
	blue.alt ="blue";
	
	if(vuoro == 0){
		vuoroAlue.appendChild(red);
	}
	else
		vuoroAlue.appendChild(blue); ///
	vuoroAlue.firstChild.setAttribute("id","vuoro");
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
	luoRuudut(syote,napLkm,vuoro);
    
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

function luoRuudut(syote, napLkm, vuoro){
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
				solu.addEventListener("click",klikkaus);
				rivi.appendChild(solu);
				solu.setAttribute("title","");
				if( j > ((syote-1)-(napLkm+2-i))){
				   var red = document.createElement("img");
		           red.src = "red.svg";
		           red.alt ="red";
				   solu.appendChild(red);
				   solu.setAttribute("title","blueMaali");
				   }
				   	
				if ( j < ((napLkm+2)-(syote-1-i))){
					var blue = document.createElement("img");
					blue.src = "blue.svg";
					blue.alt ="blue";
					solu.appendChild(blue);
					solu.setAttribute("title","redMaali");
				}
					
			}
		}
		ruudunLeveys();
		ruutuVarit();
}
}

function klikkaus(){
	
	var vuoroKuva = document.getElementById("vuoro");
	
	if(vuoroKuva.alt == "red"){
		punaisenVuoro(this);
	}
	
	else{
		sinisenVuoro(this);
	}
	
}

function asetaVuoro(){
	
	var vuoro = Math.round(Math.random()); // arpoo vuoron
	//console.log(vuoro);
	
	var syottoAlue = document.getElementById("ruudukko");
	
	var vuoroAlue = document.createElement("div");
	
	vuoroAlue.setAttribute("id","vuoroAlue");
	
	syottoAlue.appendChild(vuoroAlue);
	
	var redVuoro = document.createElement("img");
	redVuoro.src = "red.svg";
	redVuoro.alt ="red";
	//redVuoro.setAttribute = ("id","vuoro");
	
	var blueVuoro = document.createElement("img");
	blueVuoro.src = "blue.svg";
	blueVuoro.alt ="blue";
	//blueVuoro.setAttribute = ("id","vuoro");
	
	if(vuoro == 0){
		vuoroAlue.appendChild(redVuoro);
	}
	else
		vuoroAlue.appendChild(blueVuoro);
	vuoroAlue.firstChild.setAttribute("id","vuoro");
}

function punaisenVuoro(valittu){
	var kuvat = document.getElementsByTagName("img");
	
	var iIndex = valittu.parentNode.rowIndex;
	var jIndex = valittu.cellIndex;
	
	//console.log("i:"+iIndex);
	//console.log("j:"+jIndex);
	
	var red = document.createElement("img");
	red.src = "red.svg";
	red.alt ="red";
	
	var blue = document.createElement("img");
	blue.src = "blue.svg";
	blue.alt ="blue";
	
	
	
	var oliVihrea;
	//nollaaVihrea(red,blue,oliVihrea, kuvat);
	
	for(var i=0;i<kuvat.length;i++){
		if(kuvat[i].alt == "redgreen" ){
			vihr = kuvat[i];
			oliVihrea = red;
			vihr.parentNode.replaceChild(oliVihrea,vihr);
		}
		if(kuvat[i].alt == "bluegreen"){
			var vihr = kuvat[i];
			oliVihrea = blue;
			vihr.parentNode.replaceChild(oliVihrea,vihr);
		}
	}
	
	if(valittu.firstChild){
		
	var vaihdettava = valittu.firstChild;
	
	if(vaihdettava.alt == "red"){
		var redgreen = document.createElement("img");
        redgreen.src = "green.svg";
	    redgreen.alt ="redgreen";
		valittu.replaceChild(redgreen,vaihdettava);
	}
	
	}
	else{
		if(oliVihrea){
			
			var iVert = oliVihrea.parentNode.parentNode.rowIndex;
			var jVert = oliVihrea.parentNode.cellIndex;
		
			if(((iVert-1)<= iIndex && iIndex<=(iVert+1))&&((jVert-1)<= jIndex && jIndex<=(jVert+1))){
				valittu.appendChild(oliVihrea);
				var vuoroKuva = document.getElementById("vuoro");
				var blueVuoro = document.createElement("img");
				blueVuoro.src = "blue.svg";
				blueVuoro.alt ="blue";
				vuoroKuva.parentNode.replaceChild(blueVuoro,vuoroKuva);
				blueVuoro.setAttribute("id","vuoro");
				
				if(document.getElementById("vuoronappi"))
					document.getElementById("vuoroAlue").removeChild(document.getElementById("vuoroAlue").lastChild);
				
				tarkistaPun();
			}
			
			else{
				var iDelta = (iIndex-iVert)/2;
				var jDelta = (jIndex-jVert)/2;
				if((iDelta==-1 || iDelta==0 || iDelta==1)&&(jDelta==-1 || jDelta==0 || jDelta==1)){
					var rivit=valittu.parentNode.parentNode.getElementsByTagName("tr");
				    var theSolu = rivit[iVert+iDelta].getElementsByTagName("td")[jVert+jDelta];
					if(theSolu.firstChild){
						valittu.appendChild(oliVihrea);
						
						//korvataan valinnaisella vuoronvaihdolla
						
						tarkistaPun();
						
						var vuoroAlue=document.getElementById("vuoroAlue");
						var nappi = document.createElement("input","button");
						
						if(document.getElementById("vuoronappi")){
							vuoroAlue.replaceChild(nappi, vuoroAlue.lastChild);
						}
						else	
							vuoroAlue.appendChild(nappi);
						
						nappi.setAttribute("id","vuoronappi");
						nappi.setAttribute("value","Lopeta vuoro")
						nappi.addEventListener("click",lopetaVuoroPun);
						/*vuoroKuva.parentNode.replaceChild(blueVuoro,vuoroKuva);
						blueVuoro.setAttribute("id","vuoro");*/
						
						
					}
				}
			}	
		}
	}
}

function lopetaVuoroPun(){
	var vuoroAlue=document.getElementById("vuoroAlue");
	vuoroAlue.removeChild(vuoroAlue.lastChild);
	
	var vuoroKuva = document.getElementById("vuoro");
	var blueVuoro = document.createElement("img");
	blueVuoro.src = "blue.svg";
	blueVuoro.alt ="blue";
	
	vuoroAlue.replaceChild(blueVuoro,vuoroKuva);
	blueVuoro.setAttribute("id","vuoro");
}

	


function sinisenVuoro(valittu){
	var kuvat = document.getElementsByTagName("img");
	
	var iIndex = valittu.parentNode.rowIndex;
	var jIndex = valittu.cellIndex;
	
	var red = document.createElement("img");
	red.src = "red.svg";
	red.alt ="red";
	
	var blue = document.createElement("img");
	blue.src = "blue.svg";
	blue.alt ="blue";
	
	//JOtain pielessä
	
	var oliVihrea;
	//nollaaVihrea(red,blue,oliVihrea, kuvat);
	
	for(var i=0;i<kuvat.length;i++){
		if(kuvat[i].alt == "redgreen" ){
			vihr = kuvat[i];
			oliVihrea = red;
			vihr.parentNode.replaceChild(oliVihrea,vihr);
		}
		if(kuvat[i].alt == "bluegreen"){
			var vihr = kuvat[i];
			oliVihrea = blue;
			vihr.parentNode.replaceChild(oliVihrea,vihr);
		}
	}
	
	if(valittu.firstChild){
		
	var vaihdettava = valittu.firstChild;
	
	if(vaihdettava.alt == "blue"){
		var bluegreen = document.createElement("img");
        bluegreen.src = "green.svg";
	    bluegreen.alt ="bluegreen";
		valittu.replaceChild(bluegreen,vaihdettava);
	}
	
	}
	else{
		if(oliVihrea){
			
			var iVert = oliVihrea.parentNode.parentNode.rowIndex;
			var jVert = oliVihrea.parentNode.cellIndex;
			
			if(((iVert-1)<= iIndex && iIndex<=(iVert+1))&&((jVert-1)<= jIndex && jIndex<=(jVert+1))){
				valittu.appendChild(oliVihrea);
				var vuoroKuva = document.getElementById("vuoro");
				var redVuoro = document.createElement("img");
				redVuoro.src = "red.svg";
				redVuoro.alt ="red";
				vuoroKuva.parentNode.replaceChild(redVuoro,vuoroKuva);
				redVuoro.setAttribute("id","vuoro");
				
				if(document.getElementById("vuoronappi"))
					document.getElementById("vuoroAlue").removeChild(document.getElementById("vuoroAlue").lastChild);
				
				tarkistaSin();
			}
			
			else{
				var iDelta = (iIndex-iVert)/2;
				var jDelta = (jIndex-jVert)/2;
				if((iDelta==-1 || iDelta==0 || iDelta==1)&&(jDelta==-1 || jDelta==0 || jDelta==1)){
					var rivit=valittu.parentNode.parentNode.getElementsByTagName("tr");
				    var theSolu = rivit[iVert+iDelta].getElementsByTagName("td")[jVert+jDelta];
					if(theSolu.firstChild){
						valittu.appendChild(oliVihrea);
						
						tarkistaSin();
						/*
						var vuoroKuva = document.getElementById("vuoro");
						var redVuoro = document.createElement("img");
						redVuoro.src = "red.svg";
						redVuoro.alt ="red";
						vuoroKuva.parentNode.replaceChild(redVuoro,vuoroKuva);
						redVuoro.setAttribute("id","vuoro");
						*/
						var vuoroAlue=document.getElementById("vuoroAlue");
						var nappi = document.createElement("input","button");
						
						if(document.getElementById("vuoronappi")){
							vuoroAlue.replaceChild(nappi, vuoroAlue.lastChild);
						}
						else	
							vuoroAlue.appendChild(nappi);
						
						nappi.setAttribute("id","vuoronappi");
						nappi.setAttribute("value","Lopeta vuoro")
						nappi.addEventListener("click",lopetaVuoroSin);
						
						
					}
				}
			}
			
		}
	}
}

function lopetaVuoroSin(){
	var vuoroAlue=document.getElementById("vuoroAlue");
	vuoroAlue.removeChild(vuoroAlue.lastChild);
	
	var vuoroKuva = document.getElementById("vuoro");
	var redVuoro = document.createElement("img");
	redVuoro.src = "red.svg";
	redVuoro.alt ="red";
	
	vuoroAlue.replaceChild(redVuoro,vuoroKuva);
	redVuoro.setAttribute("id","vuoro");
}

function tarkistaPun(){
	var elementit = document.getElementsByTagName("td");
	var maali=[];
	for(var i=0; i<elementit.length ; i++){
		if(elementit[i].title == "redMaali"){
			maali.push(elementit[i]);
		}
	}
	for(var i=0 ; i<maali.length ; i++){
		if(!(maali[i].firstChild))
			return;
		if(!(maali[i].firstChild.alt=="red")) return;
	}
	console.log("punainen voitti");
	voitto("Punainen");
}

function tarkistaSin(){
	var elementit = document.getElementsByTagName("td");
	var maali=[];
	for(var i=0; i<elementit.length ; i++){
		if(elementit[i].title == "blueMaali"){
			maali.push(elementit[i]);
		}
	}
	for(var i=0 ; i<maali.length ; i++){
		if(!(maali[i].firstChild))
			return;
		if(!(maali[i].firstChild.alt=="blue")) return;
	}
	console.log("Sininen voitti");
	voitto("Sininen");
}
/*
function nollaaVihrea(red,blue,oliVihrea,kuvat){
	for(var i=0;i<kuvat.length;i++){
		if(kuvat[i].alt == "redgreen" ){
			vihr = kuvat[i];
			oliVihrea = red;
			vihr.parentNode.replaceChild(oliVihrea,vihr);
		}
		if(kuvat[i].alt == "bluegreen"){
			var vihr = kuvat[i];
			oliVihrea = blue;
			vihr.parentNode.replaceChild(oliVihrea,vihr);
		}
	}
}*/

function voitto(teksti){
	
	document.getElementById("varod").textContent = teksti+" voitti!";
	
	var taulukko=document.getElementsByTagName("table");
	var rivit = document.getElementsByTagName("tr");
	for(var i=0;i<rivit.length;i++){
		var solut=rivit[i].getElementsByTagName("td");
		for(var j=0;j<solut.length;j++){
			solut[j].removeEventListener("click",klikkaus);
		}
	}
}