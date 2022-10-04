'use strict'

//Theme Change
function lightMode() {
    let setTheme = document.body

    setTheme.classList.toggle('light-mode')

    let theme;
    let themeIcon;

    if (setTheme.classList.contains('light-mode')) {
        theme = 'LIGHT'
        themeIcon = 'light_icon'

        document.getElementById('darkIcon').style.display = 'block'
        document.getElementById('lightIcon').style.display = 'none'

        const iconLink = document.querySelectorAll('.icon-link')
        iconLink.forEach((icon) => {
            icon.setAttribute('style', 'color: #100720')
        })

    } else {
        theme = 'DARK'
        themeIcon = 'dark_icon'
        document.getElementById('lightIcon').style.display = 'block'
        document.getElementById('darkIcon').style.display = 'none'

        const iconLink = document.querySelectorAll('.icon-link')
        iconLink.forEach((icon) => {
            icon.setAttribute('style', 'color: #white')
        })
    }

    localStorage.setItem('THEME', theme)
    localStorage.setItem('THEME_ICON', themeIcon)
}

let getTheme = localStorage.getItem('THEME')
let getThemeIcon = localStorage.getItem('THEME_ICON')

if (getTheme === 'LIGHT' || getThemeIcon === 'light_icon') {
    document.body.classList = 'light-mode'
    document.getElementById('lightIcon').style.display = 'none'
    document.getElementById('darkIcon').style.display = 'block'
    const iconLink = document.querySelectorAll('.icon-link')
    iconLink.forEach((icon) => {
        icon.setAttribute('style', 'color: #100720')
    })
}

function hamburgerMenu() {
    const iconHamburgerMenu = document.getElementById('hamburger-menu')
    const iconCloseMenu = document.getElementById('close-menu')
    const navMenu = document.querySelector('.hader__nav-menu')

    iconHamburgerMenu.addEventListener('click', () => {
        navMenu.style.right = "0"
        iconCloseMenu.style.display = 'block'
        iconHamburgerMenu.style.display = 'none'
    })

    iconCloseMenu.addEventListener('click', () => {
        navMenu.style.right = "-100%"
        iconCloseMenu.style.display = 'none'
        iconHamburgerMenu.style.display = 'block'
    })

}
hamburgerMenu()

function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);
