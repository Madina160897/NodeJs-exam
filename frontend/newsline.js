const postsBlock = document.querySelector(".posts_block");

const BASE_URL = "http://localhost:8080";
const loadData = async () => {
    const responsePosts = await fetch(BASE_URL + "/post");
    const posts = await responsePosts.json();

    postsBlock.innerHTML = "";

    for (const post of posts) {
        postsBlock.innerHTML += `
        <div class="post-block-box">

                    <div class="img-sn">

                        <div>
                            <img class="img-user" src="./img/png-transparent-computer-icons-user-user-icon.png">
                        </div>

                        <div class="name-sn">
                           <p> <b class="surname-user ml-5"> ${post.surname || ""} </b> <b class="name-user ml-5"> ${post.name || ""}
                            </b> </p>
                            <p class="text_date"><i>${post.date}</i></p>
                        </div>
                    </div>
                    <div class="post-like">
                        <h2 class="post-title">${post.title}</h2>
                        <div class="post">${post.post}</div>
                        <img class="post-img" src="${post.img}" alt=""> <br>

                    <div>
                        <div>
                            <button onclick="likePost('${post._id}')">  <img class="acc" src="./img/free-icon-thumb-up-3193028.png">
                            ${post.like}</button>
                            <button onclick="unlikePost('${post._id}')"><img class="acc" src="./img/dislike.png">
                            ${post.like}</button>
                        </div> 
                </div>
                    </div>
                </div>
            `;
    }
};
loadData();

const likePost = async (postId) => {
    await fetch(BASE_URL + `/post/like/${postId}`);
    loadData();
    
}
const unlikePost = async (postId) =>{
    await fetch(BASE_URL + `/post/unlike/${postId}`);
    loadData();
}
