function toggle_header_links() {
    const header_links = document.getElementById("header-links")
    const expand_nav_button = document.getElementById("expand-nav-button")
    const contract_nav_button = document.getElementById("contract-nav-button")
    
    header_links.classList.toggle("d-none")
    expand_nav_button.classList.toggle("d-none")
    contract_nav_button.classList.toggle("d-none")
}