class canvas {
	constructor() {
		this.canvas = document.getElementById("canvas") ;
		this.canvas.strokeStyle = "black" ;
		this.canvas.lineWidth = 1.5 ;
		this.canvas.lineCap = "round" ;
		this.context = this.canvas.getContext("2d") ;
		this.lastPos = null ;
		this.fermeture() ;
		this.effacer() ;
		this.mouvementDeLaSouris() ;
		this.mouvementDuDoigt() ;
		this.effacerLeCanvas() ;
	} ;
	
	/* Ecoute les événements dans le canvas via la souris */

	mouvementDeLaSouris() {
		this.canvas.addEventListener("mousedown", (e) => {
			if (e.buttons === 1) this.start(this.positionSouris(e)) ;
		}) ;
		this.canvas.addEventListener("mouseup", (e) => {
			this.stop(this.positionSouris(e)) ;
		}) ;
		this.canvas.addEventListener("mousemove", (e) => {
			this.mouvement(this.positionSouris(e)) ;
		}) ;
		this.canvas.addEventListener("mouseleave", (e) => {
			this.stop(this.positionSouris(e)) ;
		}) ;
		this.canvas.addEventListener("mouseenter", (e) => {
			if (e.buttons === 1) this.start(this.positionSouris(e)) ;
		}) ;
	} ;

	/* Exécute les événements dans le canvas via l'écran tactile */

	mouvementDuDoigt(){
		this.canvas.addEventListener("touchstart", (e) => {
			e.preventDefault() ;
			if (e.touches.length > 0) this.start(this.positionToucher(e)) ;
		}) ;
		this.canvas.addEventListener("touchend", (e) => {
			e.preventDefault() ;
			if (e.touches.length > 0) this.stop(this.positionToucher(e)) ;
		}) ;
		this.canvas.addEventListener("touchmove", (e) => {
			e.preventDefault() ;
			if (e.touches.length > 0) this.mouvement(this.positionToucher(e)) ;
		}) ;
	} ;

  	/* Défini la position du canvas */

  	position(pos) {
  		const rect = this.canvas.getBoundingClientRect() ; 
  		pos.x = (pos.x - rect.left) / (rect.right - rect.left) * this.canvas.width ; 
  		pos.y = (pos.y - rect.top) / (rect.bottom - rect.top) * this.canvas.height ; 
  		return pos;
  	} ;

  	/* Défini la position de la souris */
  
  	positionSouris(e) {
  		return this.position({
  			x : e.clientX ,
  			y : e.clientY
  		}) ; 
  	} ;

  	/* Défini la position sur l'écran tactile */

 	positionToucher(e) {
 		return this.position({
 			x : e.touches[0].clientX ,
 			y : e.touches[0].clientY
 		}) ; 
 	} ;

 	/* Ecriture dans le canvas */

   	dessiner(pos1, pos2) {
   		this.context.moveTo(pos1.x , pos1.y) ; 
   		this.context.lineTo(pos2.x , pos2.y) ; 
   		this.context.stroke() ;
   	} ;

   	/* Récupération de la position dans le canvas */

   	start(pos) {
   		this.lastPos = pos ; 
   		this.confirm = 1 ;
    } ;

    /* Arret de lécriture dans le canvas */

   	stop(pos) {
   		if (this.lastPos) { 
   			this.dessiner(this.lastPos, pos) ;
   			this.lastPos = null ; 
		} ;
   	} ;

   	/* Mouvement dans le canvas */

    mouvement(pos) {
  		if (this.lastPos) {
  			const newPos = pos ;
  			this.dessiner(this.lastPos, newPos) ;
  			this.lastPos = newPos ; 
		} ;
  	} ;

   	/* Efface le canvas */

   	effacer() {
   		this.canvas.width = this.canvas.width ;
   		this.confirm = undefined ;
   	} ;

   	/* Efface le canvas via le bouton "effacer" */

  	effacerLeCanvas() {
  		const bouttonClear = document.querySelector("#effacer") ;
  		bouttonClear.addEventListener("click", this.effacer.bind(this)) ;
  	} ;

  	/* Ferme la fenêtre du canvas */
  	
  	fermeture() {
		let bouton = document.querySelector(".fa-window-close") ;
		bouton.addEventListener("click",() => {
			document.querySelector("#mapid").style.display = "block" ;
			document.querySelector(".signature").style.display = "none" ;
		this.effacer()
		}) ;
	} ;
} ;
