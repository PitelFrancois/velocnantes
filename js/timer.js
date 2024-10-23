class timer {
	constructor() {
		this.minutes = 20 ;
		this.secondes = 0 ;
		this.decompteDiv = document.querySelector("#timer") ;
		this.tempsStorage() ;
	} ;

	// Fonction pour stocké dans le sessionStorage

	tempsStorage() {
		sessionStorage.setItem("tempsMinute",this.minutes) ;															// On stocke le temps dans le sessionStorage					
		sessionStorage.setItem("tempsSeconde",this.secondes) ;															// On stocke le temps dans le sessionStorage				
	} ;

	// Fonction pour exécution le décompte

	decompte() {
		let min = sessionStorage.getItem("tempsMinute") ;																// On crée une variable qui va retourner la valeur					
		let sec = sessionStorage.getItem("tempsSeconde") ;																// On crée une variable qui va retourner la valeur
		let footerDiv = document.querySelector("#footer") ;																// On crée une variable qui va cibler "#footer"						
		this.timerInterval = setInterval( () => {																		// On fait appel à la méthode "setInterval"        
     		if ((min>0) || (sec>0)) {																					// Si min ou sec sont supérieurs à 0 alors
      			sec-- ;																									// On décrémente d'une seconde
      			sessionStorage.removeItem('tempsMinute') ;																// On supprime le temps dans le sessionStorage
      			sessionStorage.removeItem('tempsSeconde') ;																// On supprime le temps dans le sessionStorage
      			sessionStorage.setItem('tempsMinute', min) ;															// On stocke le nouveau temps dans le sessionStorage
      			sessionStorage.setItem('tempsSeconde', sec) ;															// On stocke le nouveau temps dans le sessionStorage
     		} if (sec===-1) {																							// Si sec est égal à -1 alors
      			sec = 59 ;																								// Sec est égal à 59 
      			min-- ;																									// On décrémente d'une minute
      			sessionStorage.removeItem('tempsSeconde') ;																// On supprime le temps dans le sessionStorage
      			sessionStorage.removeItem('tempsMinute') ;																// On supprime le temps dans le sessionStorage
      			sessionStorage.setItem('tempsSeconde', sec) ;															// On stocke le nouveau temps dans le sessionStorage
      			sessionStorage.setItem('tempsMinute', min) ;															// On stocke le nouveau temps dans le sessionStorage
     		} if((sessionStorage.getItem('tempsSeconde') ==='0') && ( sessionStorage.getItem('tempsMinute') ==='0')) {	// Si le min est égal à 0 et que sec est égal à 0 alors
            	this.effacerDecompte() ;																				// On fait appel à la fonction "effacerDecompte"
            	alert("Votre réservation a expiré !") ;																	// Création d'un message d'alerte
            	footerDiv.style.display = "none" ;																		// On donne un display "none" au footer
            }
            this.decompteDiv.innerHTML=`<p> Temps  restant : <span>${min} minutes et ${sec} secondes</span></p>` ;		// Création du texte
         	}, 1000);																									// 1000 millisecondes égales à une seconde
	} ;

	// Fonction pour effacer le decompte

	effacerDecompte()  {
		clearInterval(this.timerInterval) ;																				// On arrête le setInterval
        sessionStorage.clear() ;																						// On efface le sessionStorage									
	};
};