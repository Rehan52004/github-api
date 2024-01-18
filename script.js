const loader = document.querySelector(".loader");
loader.style.display = "none";

const main = document.querySelector(".main");
main.style.display = "block";

async function searchUser() {
  const userName = document.getElementById("user-name");
  const userBio = document.getElementById("user-bio");
  const userFollowers = document.getElementById("user-followers");
  const userFollowing = document.getElementById("user-following");
  const imageBoundary = document.getElementById("image-boundary");
  const userInput = document.getElementById("exampleInputText");

  const user = userInput.value;

  imageBoundary.innerHTML = "";
  userName.innerText = "";
  userBio.innerText = "";
  userFollowers.innerText = "";
  userFollowing.innerText = "";

  const loaderParent = document.querySelector(".loader-parent");

  loader.style.display = "block";
  loaderParent.style.height = "100vh";
  main.style.display = "none";

  const response = await fetch(`http://api.github.com/users/${user}`);
  const data = await response.json();
  console.log(data);

  loader.style.display = "none";
  loaderParent.style.height = "";
  main.style.display = "block";

  const img = document.createElement("img");
  img.setAttribute("src", `${data.avatar_url}`);
  imageBoundary.appendChild(img);

  userName.innerText = data.name;
  userBio.innerText = data.bio;
  userFollowers.innerText = "Followers: " + data.followers;
  userFollowing.innerText = " | Following: " + data.following;

  userInput.value = "";
  userRepos(user);
}

async function userRepos(name) {
  const allRepos = document.getElementsByClassName("all-repos");
  allRepos[0].innerText = "";

  const response = await fetch(`https://api.github.com/users/${name}/repos`);
  const data = await response.json();
  console.log(data);

  data.length > 10 ? (iterate = 10) : (iterate = data.length);

  for (let i = 0; i < iterate; i++) {
    const myDiv = document.createElement("div");
    myDiv.setAttribute("class", "col col-12 col-lg-6");
    languages(name, data[i].name, i);
    myDiv.innerHTML = `<div class="repo border p-2"><h4 class="text-primary">${data[i].name}</h4><p>${data[i].description}</p></div>`;
    allRepos[0].append(myDiv);
  }
}

async function languages(userName, repoName, i) {
  const repoLang = document.getElementsByClassName("repo");
  const langRes = await fetch(
    `https://api.github.com/repos/${userName}/${repoName}/languages`
  );
  lang = await langRes.json();

  const div = document.createElement("div");
  div.innerHTML = "";

  let keys = [];
  keys = Object.keys(lang);
  console.log(keys);

  repoLang[i].appendChild(div);
  div.setAttribute("style", "display:flex;flex-wrap:wrap;");
  for (let i = 0; i < keys.length; i++) {
    const p = document.createElement("p");
    p.setAttribute(
      "style",
      "background-color:DodgerBlue;color:white;margin:5px;overflow-wrap:break-word;padding:2px 5px;border-radius:5px;"
    );
    p.innerHTML = `${keys[i]}`;
    div.appendChild(p);
  }
}

{
  /* <p class="language">${data[i].language}</p> */
}

// '<div class="h-100 d-flex justify-content-center align-items-center"><div class="spinner-border text-secondary" role="status"><span class="visually-hidden">Loading...</span></div></div>'

// for (const key in population) {
//     if (population.hasOwnProperty(key)) {
//       console.log(`${key}: ${population[key]}`);
//     }
//   }
