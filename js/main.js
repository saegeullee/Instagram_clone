const searchResult = document.getElementById("search-result");
const searchInput = document.getElementById("search__input");

const targetHtml = `               
<div class="search-result__item">
    <div class="profile__shape--small">
        <img src="img/woman.jpg" alt="" class="search-result__item--img">
    </div>
    <div class="search-result__item--info">
        <span class="search-result__item--name">%name%</span>
    </div>
</div>`;

const searchList = [
    "saegeullee",
    "louieslee",
    "somi",
    "saein",
    "youngsoon",
    "yountae",
    "gina",
    "sam",
    "rafael",
    "federer"
];

searchInput.addEventListener("keyup", event => {
    searchResult.innerText = "";

    let textHtml = "";
    const result = [];
    searchList.forEach(el => {
        el.startsWith(event.target.value)
            ? result.unshift(el)
            : result.push(el);
    });

    result.forEach(el => {
        if (el.startsWith(event.target.value)) {
            const targetVal = event.target.value;
            const targetValLength = targetVal.length;

            const blueText = el.slice(0, targetValLength);
            const restPart = el.slice(targetValLength, el.length);

            textHtml = `<span style="color:blue">${blueText}</span><span>${restPart}</span>`;
        } else {
            textHtml = `<span>${el}</span>`;
        }

        searchResult.insertAdjacentHTML(
            "beforeend",
            targetHtml.replace("%name%", textHtml)
        );
    });

    if (event.target.value !== "") {
        searchResult.style.display = "block";
    } else {
        searchResult.style.display = "none";
    }
});

const renderFeed = post => `
<section class="main-feed">
<div class="feed-header">
    <div class="feed-header__profile">
        <div class="profile__shape--small">
            <img src="img/woman.jpg" alt="" class="feed-header__profile--img">
        </div>
        <span class="feed-header__profile--name">name__skyblue</span>
    </div>
    <div class="feed-header__menu">
        <svg class="feed-header__menu--icon">
            <use xlink:href="img/sprite.svg#icon-dots-three-horizontal"></use>
        </svg>
    </div>
</div>
<img src="img/woman.jpg" alt="" class="feed-middle-img">

<div class="feed-bottom">
    <div class="feed-bottom__engage">
        <div class="feed-bottom__engage--left">
            <div class="feed-bottom__engage--like">
                <svg class="feed-bottom__engage--icon">
                    <use xlink:href="img/sprite.svg#icon-heart"></use>
                </svg>
            </div>
            <div class="feed-bottom__engage--comment">
                <svg class="feed-bottom__engage--icon">
                    <use xlink:href="img/sprite.svg#icon-bubble2"></use>
                </svg>
            </div>
            <div class="feed-bottom__engage--share">
                <svg class="feed-bottom__engage--icon">
                    <use xlink:href="img/sprite.svg#icon-share-alternitive"></use>
                </svg>
            </div>
        </div>
        <div class="feed-bottom__engage--right">
            <div class="feed-bottom__engage--bookmark">
                <svg class="feed-bottom__engage--icon">
                    <use xlink:href="img/sprite.svg#icon-bookmark"></use>
                </svg>
            </div>
        </div>
    </div>
    <div class="feed-bottom__likes">

        <div class="feed-bottom__likes--text">
            mmmmmmmmmahh님 <strong>외 79명</strong>이 좋아합니다
        </div>
    </div>

    <div class="feed-bottom__description">

        <div class="feed-bottom__description--name">
            name__skyblue
        </div>
        <div class="feed-bottom__description--content">
            ${post.description}
        </div>
    </div>

    <div class="feed-bottom__comments-group">
        ${post.comments.map(el => renderComments(el.comment)).join("")}
    </div>

    <div class="feed-bottom__time-notice">7시간전</div>
    <form action="" class="feed-bottom__form">
        <input type="text" placeholder="댓글 달기.." class="feed-bottom__comment-input" id="feed-bottom__comment-input">
        <a href="" class="feed-bottom__comment-btn" id="feed-bottom__comment-btn">게시</a>
    </form>
</div>
</section>
`;

const renderComments = comment => `
<div class="feed-bottom__comments">
    <div class="feed-bottom__comments--id">
        mmmmmmmmmahh
    </div>
    <div class="feed-bottom__comments--content">
        ${comment}
    </div>
</div>
`;

const attachElementsToHandleComments = () => {
    const commentInput = document.getElementsByClassName(
        "feed-bottom__comment-input"
    )[0];
    const commentBtn = document.getElementsByClassName(
        "feed-bottom__comment-btn"
    )[0];

    let inputVal = "";

    commentInput.addEventListener("keyup", event => {
        inputVal = event.target.value;
        if (inputVal !== "") {
            commentBtn.style.color = "#0988ff";
        } else {
            commentBtn.style.color = "#cbe4fb";
        }
    });

    commentBtn.addEventListener("click", () => {
        inputComment();
    });

    inputComment = () => {
        fetch(`http://localhost:8000/posts/comments`, {
            method: "POST",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ comment: inputVal })
        }).then(result => {
            console.log(result);
        });
    };
};

const feedTarget = document.getElementsByClassName("main")[0];

const getFeedItem = () => {
    fetch(`http://localhost:8000/posts`)
        .then(result => {
            console.log(result);
            return result.json();
        })
        .then(data => {
            post = data;
            console.log(post);

            feedTarget.insertAdjacentHTML(
                "beforeend",
                renderFeed(post.post_list)
            );

            attachElementsToHandleComments();
        });
};

getFeedItem();
