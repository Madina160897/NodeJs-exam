const usersBlock = document.querySelector(".users_block");

let user = JSON.parse(localStorage.getItem('user'))
if(user == null){
    window.location.href = "./authorization.html"
}

function logOut() {
    localStorage.removeItem("user")
    document.location.href = "./authorization.html"
}

const BASE_URL = "http://localhost:8080";
const loadData = async () => {
    const response = await fetch(BASE_URL + "/emails");
    return await response.json();
}

const postData = async (route, payload) => {
    fetch(
        BASE_URL + route,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: payload
        },
    )
    .then(() => console.log("parsed"))
    .catch(() => console.log("Error sending request"));
};

const drawUsers = async () => {
    usersBlock.innerHTML = ""
    let user = JSON.parse(localStorage.getItem('user'))
    const users = await loadData("/emails");
    const userFollowed = user.follows
    let usersAll = users.filter(item => item._id !==  user._id)
    
    console.log(usersAll);
    console.log(userFollowed);
    console.log(user._id);

    usersAll.forEach(acc => {
   
        if(userFollowed.includes(acc._id)){
            usersBlock.innerHTML += `
        <div class="table-user">
            <div class="img-sn">
                <div>
                    <img class="img-user" src="./img/png-transparent-computer-icons-user-user-icon.png">
                </div>

                <div class="name-sn">
                    <b class="surname-user ml-5"> ${acc.surname} </b> <b class="name-user ml-5"> ${acc.name}  </b>
                </div>
            </div>

            <div class="btn-user">
            <button onclick="unFollowAuthor('${acc._id}')" class="btn-reg"> Отписаться </button>
               
            </div>
        </div>
            `
        }else{
            usersBlock.innerHTML += `
            <div class="table-user">
            <div class="img-sn">
                <div>
                    <img class="img-user" src="./img/png-transparent-computer-icons-user-user-icon.png">
                </div>

                <div class="name-sn">
                    <b class="surname-user ml-5"> ${acc.surname} </b> <b class="name-user ml-5"> ${acc.name}  </b>
                </div>
            </div>

            <div class="btn-user">
            <button onclick="followAd('${acc._id}')" class="btn-reg"> Подписаться </button>
            </div>
        </div>
            `
        }  
    })
};

const followAd = (followedUserId) => {
    const userId = JSON.parse(localStorage.getItem("user"));
    const payload = {
        userId: userId._id,
        followedUserId: followedUserId
    }
    const jsonPayload = JSON.stringify(payload);
    postData("/emails/follow", jsonPayload);
    userId.follows.push(followedUserId)
    localStorage.setItem("user", JSON.stringify(userId))
    drawUsers();
}

const unFollowAuthor = (followedUserId) => {
    const userId = JSON.parse(localStorage.getItem("user"));
    
    const payload = {
        userId: userId._id,
        followedUserId: followedUserId
    }
    const jsonPayload = JSON.stringify(payload);
    postData("/emails/unfollow", jsonPayload);
    userId.follows = userId.follows.filter((id) => id != followedUserId)
    console.log(userId);
    localStorage.setItem("user", JSON.stringify(userId))
    drawUsers();
}
drawUsers()