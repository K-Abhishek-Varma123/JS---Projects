
// fetchPokemon();
const but = document.querySelector(".but-search");
but.addEventListener("click",()=>{
    fetchPokemon();
});
async function fetchPokemon()
{
    try{
        const search = document.querySelector(".inp-search").value.trim();
        if(search==""){
            alert("Enter pokemon name");
            return;
        }
        const responce =  await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
    
        if(!responce.ok)
        {
            alert("choose correct Pokemon");
            return;
        }
        const data = await responce.json();

        const details = document.querySelectorAll(".meta-data");
        details[0].children[0].textContent = "ID: " + data.id;
        details[0].children[1].textContent = "Height: " + data.height/10 + " m";
        details[0].children[2].textContent = "weight: " + data.weight/10 + " Kg";
        
        const pokeImage = document.querySelectorAll(".imag-cont");
        pokeImage[0].children[0].src = data.sprites.front_default;
        pokeImage[0].style.display = "block";
    }
    catch(error)
    {
        console.error(error);
    }

}