/*javascript koodi, vt2, 
Toni Pikkarainen
*/

"use strict";  

/*
Tästä ohjelma lähtee käyntiin, html-dokumentin antama puu on ladattu.
*/
window.onload = function() {

	document.getElementsByTagName("h1")[0].textContent = "Halma";
	asetaVuoro();

	var syottoAlue = document.getElementById("ruudukko");

	var field = syottoAlue.getElementsByTagName("fieldset")[0];
	
	// Luodaan radionappulakenttä
	var uusiField = document.createElement("fieldset");
	var napOts = document.createElement("legend");
	napOts.textContent = "Nappuloiden määrä";
	
	
	field.appendChild(uusiField);
	uusiField.appendChild(napOts);
	
	var luku = 3;
	for(var i=0 ; i< 5 ; i++){//Tässä luodaan radionappulat
		
		var p = document.createElement("p");
		var radioButton = document.createElement("input");
		radioButton.setAttribute("type","radio");
		radioButton.setAttribute("name","napMaara");
		radioButton.setAttribute("value",i);
		if(i == 4){
			radioButton.checked=true;
		}
		p.appendChild(radioButton);
		
		
		var arvo = document.createTextNode(luku);
		p.appendChild(arvo);
		luku = luku + (3+i);
	
		uusiField.appendChild(p);	
	}

	var input = syottoAlue.getElementsByTagName("input")[0];
	input.value="";

	var luo = document.getElementById("luo");
	
	var varod = document.createElement("div");
	
	varod.style.display="inline";
	varod.setAttribute("id","varod");
	field.getElementsByTagName("p")[0].appendChild(varod);
	
	luo.addEventListener("click", luonti);

	luoRuudut(16,5,vuoro); //Luodaan ruudut ladatessa

}

/*Luo uuden ruudukon
*/
function luonti(e){
	e.preventDefault();

	var vuoro = Math.round(Math.random()); //Asetetaan vuoro satunnaisesti
	
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

	
	var syote=parseInt(input.value); //Otetaan ruudukon koko talteen
	console.log(syote);

	var field = syottoAlue.getElementsByTagName("fieldset")[0];
	luoRuudut(syote,napLkm,vuoro);  
}

/*
Asettaa ruudunleveydeksi 50px, tämän voisi muuttaa skaalautuvaksi.
*/
function ruudunLeveys(){

	var taulukot=document.getElementsByTagName("table");
	var taulukko=taulukot[0];
	var ruutuLeveys = 50;//document.clientWidth; 
	console.log(ruutuLeveys);
	var ruudut = taulukko.getElementsByTagName("td");
	

	for(var i=0;i<ruudut.length ; i++){
		ruudut[i].style.width= ruutuLeveys+"px";
		ruudut[i].style.height= ruutuLeveys+"px";
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

/*
Luo ruudukon ja siihen pelinappulat
valintojen mukaisesti
*/
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
				   //solu.appendChild(luoPallo(syote,"red"));
				   solu.setAttribute("title","blueMaali");
				   }
				   	
				if ( j < ((napLkm+2)-(syote-1-i))){
					var blue = document.createElement("img");
					blue.src = "blue.svg";
					blue.alt ="blue";
					solu.appendChild(blue);
					//solu.appendChild(luoPallo(syote,"blue"));
					solu.setAttribute("title","redMaali");
				}
					
			}
		}
		ruudunLeveys();
		ruutuVarit();
}
}

/*
Tähän funktioon tullaan kun on klikattu ruutua
*/
function klikkaus(){
	
	var vuoroKuva = document.getElementById("vuoro");
	
	if(vuoroKuva.alt == "red"){
		punaisenVuoro(this);
	}
	
	else{
		sinisenVuoro(this);
	}
	
}

/*
Asettaa vuoron, kun dokumentti ladataan
*/
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
		vuoroAlue.appendChild(redVuoro);//(luoPallo(8,"red"));
	}
	else
		vuoroAlue.appendChild(blueVuoro);//(luoPallo(8,"blue"));
	vuoroAlue.firstChild.setAttribute("id","vuoro");
}

/*
Funktio kertoo miten toimitaan punaisen vuorolla
*/
function punaisenVuoro(valittu){
	var kuvat = document.getElementsByTagName("img");
	
	var iIndex = valittu.parentNode.rowIndex;
	var jIndex = valittu.cellIndex;
	

	var vihr = etsiVihrea();
	var oliVihrea;
	//nollaaVihrea(red,blue,oliVihrea, kuvat);
	
	if(vihr){
		oliVihrea=mikaVihreaOli(vihr);
	}

	if(document.getElementById("vuoronappi")){		//eli tämä tulee jos on hypätty
		var iVert = vihr.parentNode.parentNode.rowIndex;
		var jVert = vihr.parentNode.cellIndex;
		var iDelta = (iIndex-iVert)/2;
		var jDelta = (jIndex-jVert)/2;
		if((iDelta==-1 || iDelta==0 || iDelta==1)&&(jDelta==-1 || jDelta==0 || jDelta==1)){
			var rivit=valittu.parentNode.parentNode.getElementsByTagName("tr");
		    var theSolu = rivit[iVert+iDelta].getElementsByTagName("td")[jVert+jDelta];
			if(theSolu.firstChild){
				if(onkoMaaliAlueella(vihr,valittu,"redMaali")) 
					return;
				valittu.appendChild(vihr);
				
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
				
			}
		}
		return;
	}
	
	if(valittu.firstChild){ //jos klikatussa ruudussa on kuva
		
	var vaihdettava = valittu.firstChild;
	var redgreen = document.createElement("img");
    redgreen.src = "green.svg";
	redgreen.alt ="redgreen";
	if(vaihdettava.alt == "red"){
		if(vihr){
		
			vihr.parentNode.replaceChild(oliVihrea,vihr);
		}
	
		valittu.replaceChild(redgreen,vaihdettava);
	}
	
	}
	else{ //jos klikattu ruutu on tyhjä
		if(vihr){
			if(onkoMaaliAlueella(vihr,valittu,"redMaali")) 
					return;
			
			var iVert = vihr.parentNode.parentNode.rowIndex;
			var jVert = vihr.parentNode.cellIndex;
		
			if(((iVert-1)<= iIndex && iIndex<=(iVert+1))&&((jVert-1)<= jIndex && jIndex<=(jVert+1))){
				valittu.appendChild(vihr);
				vihr.parentNode.replaceChild(oliVihrea,vihr);
				
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
						valittu.appendChild(vihr);
						
						
						
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

/*
Jos hyppäyksen jälkeen halutaan lopettaa vuoro tullaan tähän
*/
function lopetaVuoroPun(){
	var vuoroAlue=document.getElementById("vuoroAlue");
	vuoroAlue.removeChild(vuoroAlue.lastChild);
	
	var vuoroKuva = document.getElementById("vuoro");
	var blueVuoro = document.createElement("img");
	blueVuoro.src = "blue.svg";
	blueVuoro.alt ="blue";
	
	vuoroAlue.replaceChild(blueVuoro,vuoroKuva);
	blueVuoro.setAttribute("id","vuoro");
	
	var vihr = etsiVihrea();
	var oliVihrea;
	//nollaaVihrea(red,blue,oliVihrea, kuvat);
	
	oliVihrea=mikaVihreaOli(vihr);
	vihr.parentNode.replaceChild(oliVihrea,vihr);
}

	

/*
Tähän tullaan kun klikataan ja on sinisen vuoro.
TODO: tämän voisi yhdistää punaisen funktion kanssa
*/
function sinisenVuoro(valittu){
	var kuvat = document.getElementsByTagName("img");
	
	var iIndex = valittu.parentNode.rowIndex;
	var jIndex = valittu.cellIndex;
	
	var vihr;
	var oliVihrea;
	
	var vihr = etsiVihrea();
	var oliVihrea;

	if(vihr){
		oliVihrea=mikaVihreaOli(vihr);
		
	}

	if(document.getElementById("vuoronappi")){		//eli tämä tulee jos on hypätty
		var iVert = vihr.parentNode.parentNode.rowIndex;
		var jVert = vihr.parentNode.cellIndex;
		var iDelta = (iIndex-iVert)/2;
		var jDelta = (jIndex-jVert)/2;
		if((iDelta==-1 || iDelta==0 || iDelta==1)&&(jDelta==-1 || jDelta==0 || jDelta==1)){
			var rivit=valittu.parentNode.parentNode.getElementsByTagName("tr");
		    var theSolu = rivit[iVert+iDelta].getElementsByTagName("td")[jVert+jDelta];
			if(theSolu.firstChild){
				if(onkoMaaliAlueella(vihr,valittu,"blueMaali"))
					return;
				valittu.appendChild(vihr);
				
				tarkistaSin(); 
				
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
		return;
	}
	
	if(valittu.firstChild){
		
	var vaihdettava = valittu.firstChild;
	var bluegreen = document.createElement("img");
    bluegreen.src = "green.svg";
	bluegreen.alt ="bluegreen";
	if(vaihdettava.alt == "blue"){
		if(vihr){
		
			vihr.parentNode.replaceChild(oliVihrea,vihr);
		}
		valittu.replaceChild(bluegreen,vaihdettava);
	}
	
	}
	else{
		if(vihr){
			if(onkoMaaliAlueella(vihr,valittu,"blueMaali")) 
				return;
			var iVert = vihr.parentNode.parentNode.rowIndex;
			var jVert = vihr.parentNode.cellIndex;
			
			if(((iVert-1)<= iIndex && iIndex<=(iVert+1))&&((jVert-1)<= jIndex && jIndex<=(jVert+1))){
				valittu.appendChild(vihr);
				vihr.parentNode.replaceChild(oliVihrea,vihr);
				
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
						valittu.appendChild(vihr);
						
						tarkistaSin();
						
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

/*
Tullaan tähän kun sininen haluaa lopettaa vuoron.
TODO: yhdistä punaisen vastaavan funktion kanssa.
*/
function lopetaVuoroSin(){
	var vuoroAlue=document.getElementById("vuoroAlue");
	vuoroAlue.removeChild(vuoroAlue.lastChild);
	
	var vuoroKuva = document.getElementById("vuoro");
	var redVuoro = document.createElement("img");
	redVuoro.src = "red.svg";
	redVuoro.alt ="red";
	
	vuoroAlue.replaceChild(redVuoro,vuoroKuva);
	redVuoro.setAttribute("id","vuoro");
	
	var vihr = etsiVihrea();
	var oliVihrea;
	//nollaaVihrea(red,blue,oliVihrea, kuvat);
	
	oliVihrea=mikaVihreaOli(vihr);
	vihr.parentNode.replaceChild(oliVihrea,vihr);
}

/*
Tarkistaa onko punainen voittanut, eli onko kaikki nappulat
maalialueella*/
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

/*
Tarkistaa onko sininen voittanut, eli onko kaikki nappulat
maalialuella.
*/
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
Asettaa voittotekstin ja huolehtii että voiton jälkeen ei voi siirrellä nappuloita
*/
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
/*
Etsii mahdollisen valitun nappulan
*/
function etsiVihrea(){
	var vihr;
	var kuvat = document.getElementsByTagName("img");
	for(var i=0;i<kuvat.length;i++){
		if((kuvat[i].alt == "redgreen")|| (kuvat[i].alt == "bluegreen")){
			vihr = kuvat[i];
		}
		
	}
	return vihr;
}
/*
Kertoo mikä valittu nappula oli ennen
*/
function mikaVihreaOli(vihr){
	
	var red = document.createElement("img");
	red.src = "red.svg";
	red.alt ="red";
	
	var blue = document.createElement("img");
	blue.src = "blue.svg";
	blue.alt ="blue";
	
	var oliVihrea;
	if(vihr.alt =="redgreen"){
			oliVihrea = red;
		}
	if(vihr.alt =="bluegreen"){
			oliVihrea = blue;
	}
	return oliVihrea;
}

/*
Palauttaa tosi, jos siirrettävä on maalialueella ja siirron kohde ei.
Eli tällä voidaan estää siirto maalialueelta pois.
*/
function onkoMaaliAlueella(vihr,valittu,maali){
	return ((vihr.parentNode.title == maali) && (valittu.title != maali));
}

/*
Täällä olen yrittänyt saada skaalautuvuutta aikaan.
Tuli ongelmia noiden svg-pallojen kanssa, en saanut niitä millään
näkyviin taulukossa vaikka ne ilmestyivät selaimen dom-puuhun...
*/

/*
function luoPalloSvg(syote,vari){
	var pallo = document.createElement("svg");
	pallo.setAttribute("xmlns","http://www.w3.org/2000/svg");
	pallo.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");
	
	var leveys = 0.9*tutkiRuudunLeveys(syote);
	console.log(leveys);
	pallo.setAttribute("viewBox","0 0 "+leveys+" "+leveys);
	//pallo.setAttribute("viewbox","0 0 "leveys+" "+leveys);
	
	
	pallo.setAttribute("width",leveys+"px");
	pallo.setAttribute("height",leveys+"px");
	
	var ympyra= document.createElementNS("http://www.w3.org/2000/svg", "circle");
	/*ympyra.setAttribute("cx",leveys/2);
	ympyra.setAttribute("cy",leveys/2);
	ympyra.setAttribute("r",(leveys/2-1));
	
	ympyra.setAttributeNS(null, "cx", leveys/2);
    ympyra.setAttributeNS(null, "cy", leveys/2);
    ympyra.setAttributeNS(null, "r",  (leveys/2-1));
    //ympyra.setAttributeNS(null, "fill", "green"); 
	
	if(vari=="red"){
		ympyra.setAttributeNS(null,"style","stroke:#006600; fill:#ff0000");
	}
	if(vari=="blue"){
		ympyra.setAttributeNS(null,"style","stroke:#006600; fill:#0000ff");
	}
	if(vari=="green"){
		ympyra.setAttributeNS(null,"style","stroke:#006600; fill:#00ff00");
	}
	pallo.appendChild(ympyra);
	return pallo;
}
*/
/*
function luoPallo(syote,vari){
	var leveys=tutkiRuudunLeveys(syote)*0.9;
	if(vari=="red"){
		var red = document.createElement("img");
		red.src = "red.svg";
		red.alt ="red";
		red.setAttribute("style","width:"+leveys+"; height:"+leveys);
		return red;
	}
	if(vari=="blue"){
		var blue = document.createElement("img");
		blue.src = "blue.svg";
		blue.alt ="red";
		blue.setAttribute("style","width:"+leveys+"; height:"+leveys);
		return blue;
	}
	
}*/
/*
function tutkiRuudunLeveys(syote){
	var html = document.getElementsByTagName("html")[0];
	var h =document.getElementsByTagName("h1")[0];
	var p =document.getElementsByTagName("p")[0];
	var f =document.getElementsByTagName("form")[0];
	var ruutuLeveys;
	
	var nayttoLeveys = html.scrollWidth;
	var nayttoKorkeus = html.scrollHeight;
	
	var korkeusMuut = h.scrollHeight+p.scrollHeight+f.scrollHeight;
	var korkeusRuud = nayttoKorkeus - korkeusMuut;
	
	if(korkeusRuud < nayttoLeveys){
		ruutuLeveys =korkeusRuud/syote;
	}
	else{
		ruutuLeveys =nayttoLeveys/syote;
	}
	return ruutuLeveys;
}*/