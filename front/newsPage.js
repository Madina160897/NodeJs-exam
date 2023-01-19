const postsContainer = document.querySelector(".posts");

let user = JSON.parse(localStorage.getItem('user'))
if(user == null){
    window.location.href = "./index.html"

}
const BASE_URL = "http://localhost:3000";

const fetchData = async (route) => {
    const response = await fetch(BASE_URL + route);
    return await response.json();
};


const drawCars = async () => {
    const posts = await fetchData("/posts");



    for (const post of posts) {
        postsContainer.innerHTML += `
            <div class="post_item">
            <h4>${post.email}</h4>
            <h3>${post.title}</h3>
            <p class="text_post">${post.post}</p>
            <div>
                <div>
                <img class="like-img" src="./img/like (1).png" alt="">
                ${post.like}
                </div> 
                <p class="text_date"><i>${post.date}</i></p>
                
            </div>
                
        
            </div>
               
        `

    }
};
drawCars()