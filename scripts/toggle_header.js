function toggle_header_links() {
    const header_links = document.getElementById("header-links")
    const expand_nav_button = document.getElementById("expand-nav-button")
    const contract_nav_button = document.getElementById("contract-nav-button")

    header_links.classList.toggle("d-none")
    expand_nav_button.classList.toggle("d-none")
    contract_nav_button.classList.toggle("d-none")
}

document.addEventListener('DOMContentLoaded', injectGhButton)

function injectGhButton() {
    const ghButtonContainer = document.getElementById("gh-button-container")
    if (ghButtonContainer !== null) {
        const url = "https://api.github.com/users/97amarnathk"
        fetch(url)
            .then(data => { return data.json() })
            .then(response => {
                ghButtonContainer.innerHTML += getGhButtonHTML(response.followers)
            })
    }
}

function getGhButtonHTML(followersCount) {
    return `
        <a class="social-count" href="https://github.com/97amarnathk/followers">${followersCount}</a>
    `
}