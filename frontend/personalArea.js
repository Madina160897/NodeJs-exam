const porsBlock = document.querySelector(".pors_block");


const BASE_URL = "http://localhost:8080";

const fetchData = async (route) => {
    const response = await fetch(BASE_URL + route);
    return await response.json();
};

const drawUser = async () => {

    const user = JSON.parse(localStorage.getItem('user'))

    porsBlock.innerHTML = "";

    porsBlock.innerHTML = `
        <div class="area-info">
            <img class="per-img" src="./img/png-transparent-computer-icons-user-user-icon.png">
            <div class="per-info">
                <div>
                    <b class="user-info pThreeSurname">${user.surname}</b> <b class="user-info pThreeName">${user.name}</b>
                </div>
                <p class="pThreeAge">Возраст: ${user.age}</p>
                <button class="btn-red-info" onclick="editPro()">Pедактировать данные</button>
                <div class="fon-block">
                    <div class="block">
                        <span>Name:</span><br>
                        <input class="newName" type="text"><br>
                        <span>Surname:</span><br>
                        <input class="newSurname" type="text"><br>
                        <span>Age:</span><br>
                        <input class="newAge" type="text"><br>
                        <button onclick="save1()">Save</button><br>
                        <button onclick="close1()">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `
};
drawUser()

let div1 = document.querySelector('.fon-block');
let div2 = document.querySelector('.block');
let body = document.querySelector('body');
let blPost = document.querySelector(".edit-data2")
let bl2Post = document.querySelector(".back-block2")

function editPro() {
    div1.style.display = 'block';
    div2.style.display = 'block';
    div1.style.backgroundColor = "rgb(196, 193, 193, 0.5)";
}

function close1() {
    div1.style.display = 'none';
    body.style.backgroundColor = 'white';
}

function save1() {
    let users = JSON.parse(localStorage.getItem('Users'))
    let user = JSON.parse(localStorage.getItem('user'));
    let pThreeName = document.querySelector(".pThreeName");
    let pThreeSurname = document.querySelector(".pThreeSurname");
    let pThreeAge = document.querySelector(".pThreeAge");
    let newName = document.querySelector(".newName").value;
    let newSurname = document.querySelector(".newSurname").value;
    let newAge = document.querySelector(".newAge").value;

    user.name = (pThreeName.textContent = newName);
    user.surname = (pThreeSurname.textContent = newSurname);
    user.age = (pThreeAge.textContent = newAge);

    for (let i = 0; i < users.length; i++) {
        if (user.email == users[i].email) {
            users[i].name = user.name
            users[i].surname = user.surname
            users[i].age = user.age
        }
    }

    localStorage.setItem("Users", JSON.stringify(users))
    localStorage.setItem("user", JSON.stringify(user))
    div1.style.display = "none";

    const userId = user._id

    fetch(BASE_URL + `/emails/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(user)
    })
}
let user = JSON.parse(localStorage.getItem("user"))

function addPost() {

    const titlePost = document.querySelector("#post-title").value;
    const textPost = document.querySelector(".post-text").value;
    const imgPost = document.querySelector(".post-img-new").value;


    const payload = {
        email: user.email,
        title: titlePost,
        post: textPost,
        img: imgPost,
    }
    fetch(BASE_URL + "/post", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(payload)
    })
        .then(() => alert("post added!"))
        .then(() => drawMyPosts())

        .catch(() => alert("err"))
    localStorage.setItem("user", JSON.stringify(user))
}


const drawMyPosts = async () => {
    const myPosts = document.querySelector(".posts_block");

    const posts = await fetchData("/post");
    let myPostsOnly = []

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].email == user.email) {
            myPostsOnly.push(posts[i])
        }
    }
    myPosts.innerHTML = ""


    for (const post of myPostsOnly) {
        myPosts.innerHTML += `


        <div class="post-block-box">

            <div class="img-sn">

                <div>
                    <img class="img-user" src="./img/png-transparent-computer-icons-user-user-icon.png">
                </div>

                <div class="name-sn">
                    <b class="surname-user ml-5"> ${post.email}</b>
                </div>
            </div>
            <div class="post-like">
                <h2 class="post-title">${post.title}</h2>
                <div class="post">${post.post}</div>
                <img class="post-img" src="${post.img}" alt=""> <br>
                <div>
                <div>
                    <button>  <img class="acc" src="./img/free-icon-thumb-up-3193028.png">
                    ${post.like}</button> <br>
                </div> 
        </div>

                <button class="btn-red" onclick="changePost('${post._id}')">Редоктировать</button>
                        <button class="btn-red" onclick="deletePost('${post._id}')">Удалить</button>
            </div>
        </div>
               
        `

    }
};
drawMyPosts()

function deletePost(id) {
    fetch(BASE_URL + "/post/" + id, { method: "DELETE" })
        .then(() => alert("Delete"))
        .then(() => drawMyPosts())
        .catch(() => alert("err"))
}

function changePost(id) {
    bl2Post.style.display = "block";
    blPost.style.display = "block";
    bl2Post.style.backgroundColor = "rgb(196, 193, 193, 0.5)"

    localStorage.setItem("idChangePost", JSON.stringify(id))
}

let id = JSON.parse(localStorage.getItem("idChangePost"))

function saveNewPost() {
    const newTitle = document.querySelector("#edTitle").value
    const newPost = document.querySelector("#edPost").value
    const newImg = document.querySelector("#edImg").value

    const payload = {
        title: newTitle,
        post: newPost,
        img: newImg,

    }
    fetch(BASE_URL + "/post/" + id, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(payload)
    }).then(() => drawMyPosts())
        .then(() => alert("Ok"))
        .catch(() => alert("err"))
    bl2Post.style.display = "none";

}
router.get("/like/:id", async (req, res) => {
    const postId = req.params.id
    const post = await NewPostModel.findById(postId);
    await NewPostModel.findByIdAndUpdate(postId,{like: post.like + 1 })
    res.status(201).send("Ok");
});

router.get("/unlike/:id", async (req, res) => {
    const postId = req.params.id
    const post = await NewPostModel.findById(postId);
    await NewPostModel.findByIdAndUpdate(postId,{like: post.like - 1})
    res.status(201).send("Ok");
});
