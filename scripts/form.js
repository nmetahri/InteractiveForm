document.addEventListener('DOMContentLoaded', () => {
	let prenom, nom;
	
	let form = document.querySelector("#register_form")
	
	let emoji = document.createElement("img")
	emoji.src = "style/emoji.svg"
	emoji.id = "card_emoji"
	document.querySelector("#card_header").prepend(emoji);
	
	form.fullname.addEventListener('keyup', () =>{

		document.querySelector("#card_name").innerText = form.fullname.value;
		if (form.fullname.value == "") document.querySelector("#card_name").innerText = "...";
	})
	
	form.fullname.addEventListener('focusout', ()=>{
		let name = form.fullname.value.split(" ");
		nom = name[0].toUpperCase();
		prenom = name[1];
		prenom = prenom[0].toUpperCase() + prenom.slice(1);
		document.querySelector("#card_name").innerText = nom + " " + prenom;
		
	})
	
	form.phone.addEventListener('keyup', () =>{
		let card_phone = document.querySelector("#card_phone");
		if (form.phone.value.length > form.phone.maxLength)
			form.phone.value = form.phone.value.slice(0, phone.maxLength);
		card_phone.innerText = form.phone.value;
		if (form.phone.value.length==0) card_phone.innerText= "...";

	})
	
	form.country.addEventListener('change', ()=>{
		document.querySelector("#card_phone_country").innerText = "(+" + form.country.value + ")";
	})
	
	
	function getID(){
		let url = "http://web.gregory-bourguin.fr/teaching/php/requests/ajax/02_generateUserID.php"
		
        let data = new FormData()
        data.append('firstname', prenom)
        data.append('lastname', nom)

        let options = {
            method: 'POST',
            body: data 
        }
        
		fetch(url, options).then(response => {
		if (response.ok) {
			response.json().then(data => { // json() parse les données
				form.id.value = data.id;
				document.querySelector("#card_id").innerText = data.id;
			})
		} 
		else {
			alert("ERREUR avec la requête.", response.statusText);
		}
        }).catch(error => {
            console.log("ERREUR avec le fetch.", error)
        })
	}
	
	let btnAuto = document.querySelector("#auto_get_id")
	btnAuto.addEventListener('click', ()=>{
		
		if (form.fullname.value != ""){
			let name = form.fullname.value.split(" ");
			prenom = name[0];
			nom = name[1];
			getID();
		}
		else alert("Remplissez le nom complet !")
	})
	
	let resetBtn = document.querySelector("#reset_btn");
	resetBtn.addEventListener('click', ()=>{
		document.querySelector("#card_id").innerText = "...";
		document.querySelector("#card_phone").innerText = "...";
		document.querySelector("#card_phone_country").innerText = "(+...)";
		document.querySelector("#card_name").innerText = "...";
		
	})
})
