const usersBlock = document.querySelector(".users_block");

const BASE_URL = "http://localhost:8080";
const loadData = async () => {
    const responseUsers = await fetch(BASE_URL + "/emails");
    const users = await responseUsers.json();

    usersBlock.innerHTML = "";

    for (const user of users) {
        usersBlock.innerHTML += `
        <div class="table-user">

            <div class="img-sn">
            
                <div>
                    <img class="img-user" src="./img/png-transparent-computer-icons-user-user-icon.png">
                </div>

                <div class="name-sn">
                    <b class="surname-user ml-5"> ${user.surname} </b> <b class="name-user ml-5"> ${user.name}  </b>
                </div>
            </div>

            <div class="btn-user">
                <button class="btn-reg"> Подписаться </button>
                <button class="btn-reg"> Отписаться </button>
            </div>

            

        </div>
            `;
    }
};
loadData();