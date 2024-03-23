export function showModal(modal, willOpen) {
    modal.style.display = willOpen ? "grid" : "none";
}

function trimString(str,max) {
    if(str.length < max) return str;

    return str.slice(0, max) + "...";
}

export function renderMails(outlet, data) {
    if(!data) return;
    outlet.innerHTML=data.map(
        (mail) => `
        <div class="mail" id="mail" data-id=${mail.id}>
        <div class="left">
            <input type="checkbox">
            <span class="bi bi-star${mail.stared ? "-fill" : ""}"></span>
            <span>${mail.receiver}</span>
        </div>
        <div class="right">
            <p class="message-title">${trimString(mail.title, 20)}</p>
            <p class="message-description">${trimString(mail.message, 20)}</p>
            <p class="message-date">${mail.date}</p>
            <div class="delete">
                <i class="bi bi-trash"></i>
            </div>
        </div>
    </div> `
    )
    .join(" ");
}

export function renderCategories(outlet, data, selectCategory) {
    outlet.innerHTML = "";
    data.forEach((category)=> {
        const categoryItem = document.createElement("a");
        categoryItem.dataset.name = category.title;
        console.log(categoryItem);
        categoryItem.className = selectCategory === category.title && "active";

        categoryItem.innerHTML = `
        <i class="${category.class}"></i>
        <span>${category.title}</span>`;
        outlet.appendChild(categoryItem);
    });
}