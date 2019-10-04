const searchResult = document.getElementById('search-result');
const searchInput = document.getElementById('search__input');

const targetHtml = `               
<div class="search-result__item">
    <div class="profile__shape--small">
        <img src="img/woman.jpg" alt="" class="search-result__item--img">
    </div>
    <div class="search-result__item--info">
        <span class="search-result__item--name">%name%</span>
    </div>
</div>`;

const searchList = ['saegeullee', 'louieslee', 'somi', 'saein',
    'youngsoon', 'yountae', 'gina', 'sam', 'rafael', 'federer'];

searchInput.addEventListener('keyup', (event) => {

    searchResult.innerText = "";

    let textHtml = "";
    const result = [];
    searchList.forEach(el => {
        el.startsWith(event.target.value) ? result.unshift(el) : result.push(el);
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

        searchResult.insertAdjacentHTML('beforeend',
            targetHtml.replace("%name%", textHtml));
    })

    if (event.target.value !== '') {
        searchResult.style.display = "block";
    } else {
        searchResult.style.display = "none";
    }
})

