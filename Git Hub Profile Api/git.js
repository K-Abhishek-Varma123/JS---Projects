
const search1 = document.querySelector(".search-but");
search1.addEventListener("click",(e)=>{
    e.preventDefault();
    fetchGit();
});
async function fetchGit()
{
    try{
       
        const search = document.querySelector(".search-bar").value.trim();
        if(search === "")
        {
            alert("Enter username");
            return;
        }
        const responce = await fetch(`https://api.github.com/users/${search}`);
        if(!responce.ok)
        {
            alert("User Not Found");
            return;
        }
        const data = await responce.json();
        const image = document.querySelector(".image");

        image.src = data.avatar_url;
        
        const par_name = document.querySelectorAll(".basic-cont");
        const locate_name = document.querySelectorAll(".locate-cont");
        const foll_name = document.querySelectorAll(".followers-cont");

        if(data.name!=null)
            par_name[0].children[0].textContent = "Name:- " + data.name;
        else par_name[0].children[0].textContent = "Name:- Not Available";

        if(data.bio!=null)
            par_name[0].children[1].textContent = "Bio:- " + data.bio;
        else par_name[0].children[1].textContent = "Bio:- Not Available";

        if(data.location!=null)
            locate_name[0].children[0].textContent = "Location:- " + data.location;
        else 
            locate_name[0].children[0].textContent = "Location:- Not Available";


        /* locate_name[0].children[0].textContent = "Location:- " + (data.location||"Unavilable");  single line replace*/

        if(data.company!=null)
            locate_name[0].children[1].textContent = "Company:- " + data.company;
        else
            locate_name[0].children[1].textContent = "Company:- Not Available";

        if(data.public_repos!=null)
            foll_name[0].children[0].textContent = "Public_Repositories:- " + data.public_repos;
        else
            foll_name[0].children[0].textContent = "Public_Repositories:- Not Available";
        if(data.followers!=null)
            foll_name[0].children[1].textContent = "Followers:- " + data.followers;
        else
            foll_name[0].children[1].textContent = "Followers:- Not Available";
        if(data.following!=null)
            foll_name[0].children[2].textContent = "Following:- " + data.following;
        else
            foll_name[0].children[2].textContent = "Following:- Not Available";
    }
    catch(error)
    {
        alert("Some thing went wrong");
        console.error(error);
    }
}