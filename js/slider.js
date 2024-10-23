class Slider{
	constructor() {
		this.sliderImages = document.querySelectorAll(".slide") ;
		this.flecheDroite = document.querySelector(".bouton_droite") ;
		this.flecheGauche = document.querySelector(".bouton_gauche") ;
		this.boutonPause = document.querySelector(".bouton_pause") ;
		this.boutonLecture = document.querySelector(".bouton_lecture") ;
		this.current = 0 ;
		this.reset() ;
		this.startSlide() ;
		this.slideSuivante() ;
		this.slidePrecedente() ;
		this.slideAuto() ;
		this.clicDroite() ;
		this.clicGauche() ;
		this.slideTimerReset() ;
		this.clicPause() ;
		this.clicLecture() ;
		this.touchesDirectionnelles() ;

	};
	
	/* Initie toutes les ".slide" en leurs donnant un diplay "none" */
	
	reset() {
		for (let i = 0 ; i < this.sliderImages.length ; i++) {		// Création de la boucle afin de cibler toutes les images
			this.sliderImages[i].style.display = "none" ;			// Donne le display "none"
		} ;
	} ;

	/* Donne le display "block" à une ".slide" en fonction du compteur */
	
	startSlide() {
		this.reset() ;												// Donne le display "none" à toutes les images
		this.sliderImages[this.current].style.display = "block" ;	// Donne le display "block" à la première image 
	} ;
	
	/* Donne un display "block" à la ".slide" suivante */

	slideSuivante() {
		this.reset() ;												// Donne le display "none" à toutes les images
		this.current++ 												// Donne le display "block" à l'image suivante 
		if (this.current === this.sliderImages.length ) {           // Remet le "current" à 0 après la dernière images
				this.current = 0 ;
		} ;
		this.startSlide() ;											// Relance la fonction startSlide()	
	} ;

	/* Donne un display "block" à la ".slide" précédente */
	
	slidePrecedente() {			
		this.reset () ;												// Donne le display "none" à toutes les images
		this.current -- ;											// Donne le display "block" à l'image précédente
		this.startSlide() ;											// Relance la fonction startSlide()
	} ;

	/* Active la function "SlideSuivante" toute les 5 secondes ( 5000 millisecondes ).*/

	slideAuto() {
		 this.slideInterval = setInterval( () => {					
    		this.slideSuivante() ; 									// Passe à la ".slide" suivante  		
    	}, 5000) ;
    };

    /* Passe à la ".slide" suivante quand on clique sur le chevron droit */

    clicDroite() {
 		let that = this ;
  		this.flecheDroite.addEventListener("click", function() {   
    		that.slideSuivante() ;									// Passe à la ".slide" suivante
    		that.slideTimerReset() ;								// Remet le compteur à 0 
    		that.boutonPause.style.display = "block";				// Donne un display "block" au ".bouton_pause"
    		that.boutonLecture.style.display = "none" ;				// Donne un display "none" au ".bouton_lecture"
    	}) ;

    } ;

	/* Passe à la ".slide" précédente quand on clique sur le chevron gauche */

	clicGauche() {
		let that = this ;
  		this.flecheGauche.addEventListener("click", function() { 	  
    		if (that.current === 0) {                               // Recommence le tableau à 0
    			that.current = that.sliderImages.length ;           
			} ;                                   
    		that.slidePrecedente() ; 								// Passe à la ".slide" précédente
    		that.slideTimerReset() ; 								// Remet le compteur à 0 
    		that.boutonPause.style.display = "block";				// Donne un display "block" au ".bouton_pause"
    		that.boutonLecture.style.display = "none" ;				// Donne un display "none" au ".bouton_lecture"                              
		}) ;
		
	} ;

	/* Remet le compteur de "setInterval" à 0 */

	slideTimerReset() {
		clearInterval(this.slideInterval) ;							// Remet le timer à 0
		this.slideAuto() ;											// Relance la fonction "slideAuto()"
	} ;

	/* Met la slide en pause quand on clicque sur le bouton pause */

	clicPause() {
		this.boutonPause.addEventListener("click",() => {
			this.boutonPause.style.display = "none" ;				// Donne un display "none" au ".bouton_pause"
			this.boutonLecture.style.display = "block" ;			// Donne un display "block" au ".bouton_lecture"
			clearInterval(this.slideInterval) ;						// Remet le timer à 0
		}) ;
	} ;

	/* Remet la slide en automatique */

	clicLecture() {
		this.boutonLecture.addEventListener("click",() => {
			this.boutonPause.style.display = "block" ;				// Donne un display "block" au ".bouton_pause"
			this.boutonLecture.style.display = "none" ;				// Donne un display "none" au ".bouton_lecture"
			this.slideAuto() ;										// Relance la fonction "slideAuto()"
		}) ;
	} ;

	/* Passe à la ".slide" suivante ou précédente via les touches directionnelles "gauche" et "droite" */

	touchesDirectionnelles() {
		document.addEventListener("keyup", touche => {				
			if ( touche.keyCode === 39 ) {							// "keyCode 39" = la touche directionnelle de doite
				this.slideSuivante() ;                              // Passe à la ".slide" suivante
				this.slideTimerReset() ;							// Remet le compteur à 0
				this.boutonPause.style.display = "block" ;          // Donne un display "block" au ".bouton_pause"
				this.boutonLecture.style.display = "none" ;			// Donne un display "none" au ".bouton_lecture"
			} if ( touche.keyCode === 37 ) {						// "keyCode 37" = la touche directionnelle de gauche
				if (this.current === 0 ) {							// Recommence le tableau à la fin
					this.current = this.sliderImages.length ;
				} ;
				this.slidePrecedente() ;							// Passe à la ".slide" précédente
				this.slideTimerReset() ;							// Remet le compteur à 0 
				this.boutonPause.style.display = "block" ;			// Donne un display "block" au ".bouton_pause"
				this.boutonLecture.style.display = "none" ;			// Donne un display "none" au ".bouton_lecture"
			} ;
		}) ;
	} ;
	
} ;

let newSliderImages = new Slider  ;


