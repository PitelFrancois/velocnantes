class veloc {
	constructor() {
		this.slider = new Slider() ;
		this.carte = new Carte("https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=63608600c439883149902c2e22f6a7fc7795f954") ;
		this.canvas = new canvas() ;
		this.timer = new timer() ;
		this.remplissageDeChamps() ;
		this.selectionDeStation() ;
		this.annulerLaReservation() ;
	};

	// Fonction pour la réservation

	selectionDeStation() {
		let bouton = document.querySelector("#bouton_reservation") ;																// On retourne la div "#bouton-reservation" dans une variable
		let boutonValider = document.querySelector("#valider") ;																	// On retourne la div "#valider" dans une variable
		let Footer = document.querySelector("#footer") ;																			// On retourne la div "#footer" dans une variable
		let info = document.querySelector("#information_réservation");																// On retourne la div "#information_reservation" dans une variable
		let canvas = document.querySelector(".signature") ;																			// On retourne la div ".signature" dans une variable
		let map = document.querySelector("#mapid") ;																				// On retourne la div "#mapid" dans une variable
		bouton.addEventListener("click",() => {																						// On clique sur le bouton réservation 
			if (this.carte.dataSelection === undefined) {																			// Si aucune station n'est sélectionner 
				alert("Veuillez sélectionner une station afin de pouvoir réserver !")												// Création d'un message d'alerte
			} else if (this.carte.dataSelection[0].available_bikes == 0) {															// Si aucun vélo n'est disponible
				alert("Désolé, cette station n'a plus de vélos disponibles pour le moment. Veuillez choisir une autre station !")	// Création d'un message d'alerte
			} else if (this.carte.dataSelection[0].status == "FERMÉE") {															// Si la sation est fermée
				alert("Désolé, cette station est fermée pour le moment. Veuillez choisir une autre station.")						// Création d'un message d'alerte
			} else if (document.querySelector("#nom").value && document.querySelector("#prenom").value) {							// Si le nom et le prénom sont présent 
				document.querySelector(".signature").style.display = "block" ;														// Donne un display "block" à la div ".signature"
				document.querySelector("#mapid").style.display = "none" ;															// Donne un display "none" à la div "#mapid"
				this.carte.dataSelection.push(document.querySelector("#nom").value) ;												// Ajoute le "nom" dans un tableau
				this.carte.dataSelection.push(document.querySelector("#prenom").value) ; 											// Ajoute le "prénom" dans un tableau
			} else {																												// Sinon
				alert("Vous devez entrer un nom et un prénom afin de pouvoir réserver")												// Apparition d'un message d'alerte
			} 
		}) ;
		
		boutonValider.addEventListener("click", () => {																				// On clique sur le bouton valider
        if (this.canvas.confirm === undefined) {																					// Si le canvas est vide
            alert("Vous devez signer afin de pouvoir réserver !") ;																	// Apparition d'un message d'alerte
        } else {																													// Sinon
          	localStorage.setItem('prenom',this.carte.dataSelection[2]) ;															// On stocke la clé/valeur dans le localStorage
          	localStorage.setItem('nom',this.carte.dataSelection[1]) ;																// On stocke la clé/valeur dans le localStorage
          	Footer.style.display= "block";																							// Donne un display "block" à la div "#footer"
          	canvas.style.display = "none" ;																							// Donne un display "none" à la div ".signature"
          	info.innerHTML = `<p> Vélo réservé à la station :<span class="span1"> ${this.carte.dataSelection[0].name}</span> par <span> ${this.carte.dataSelection[2]} ${this.carte.dataSelection[1]}</span>.</p>`; // Création du texte
          	map.style.display = "block" ;																							// Donne un display "block" à la div "#mapid"
          	this.canvas.effacer() ;																									// Efface le canvas	
          	this.timer.effacerDecompte() ;																							// Efface le décompte
          	this.timer.tempsStorage() ;																								// Stocke dans le storage																											
          	this.timer.decompte() ;																									// Exécution du décompte 
          	sessionStorage.setItem('Station',this.carte.dataSelection[0].name) ;													// On stocke la clé/valeur dans le sessionStorage
          	for(let i= 0; i < this.carte.data.length; i++){																			// Création d'un boucle afin de parcourir les données
       	  	if (this.carte.data[i] === this.carte.dataSelection[0] ) {																// Si une station est sélectionner alors
          		this.carte.data[i].available_bikes--;																				// On décrémente le nombre de vélos disponibles
          		this.carte.data[i].bike_stands++;																					// On incrémente le nombre de places disponibles
          		this.carte.chargementMarqueurs();																					// On met les marqueurs à jour
        		} ;
      		} ;
        } ;
        }) ;
	} ;

	// Fonction pour remplir automatiquement les champs "nom" et "prénom"

	remplissageDeChamps() {
		document.querySelector("#prenom").value = localStorage.getItem("prenom") ;													// On retourne la valeur stocké dans le tableau dans le localStorage
		document.querySelector("#nom").value = localStorage.getItem("nom") ;														// On retourne la valeur stocké dans le tableau dans le localStorage
	} ;

	// Fonction pour annuler la réservation

	annulerLaReservation() {
		let boutonAnnulation = document.querySelector("#annulation") ;																// On retounre la div "#annulation" dans une variable
		let Footer = document.querySelector("#footer") ;																			// On retounre la div "#footer" dans une variable
		boutonAnnulation.addEventListener('click', () => {																			// On clique sur le bouton "#annulation"
     		this.timer.effacerDecompte() ;																							// On efface le décompte
     		footer.style.display= "none" ;																							// Donne un display "none" à la div "#footer"
     		for(let i= 0; i < this.carte.data.length; i++) {																		// Création d'un boucle afin de parcourir les données
       	  	if (this.carte.data[i]=== this.carte.dataSelection[0] ) {																// Si une station est sélectionner alors
          		this.carte.data[i].available_bikes++ ;																				// On incrémente le nombre de vélos disponibles
          		this.carte.data[i].bike_stands-- ;																					// On décrémente le nombre de places disponibles
          		this.carte.chargementMarqueurs() ;																					// On met les marqueurs à jour
        		} ;
      		} ;								
     	});
     };
} ;

addEventListener("load", () => {
	new veloc() ;
}) ;

