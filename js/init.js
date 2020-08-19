document.addEventListener("DOMContentLoaded", () => {
    // activate sidenav
    let elems = document.querySelector(".sidenav");
    M.Sidenav.init(elems);
    elems = document.querySelectorAll('.parallax');
    M.Parallax.init(elems);
    loadNav();

    //load page content
    let page = window.location.hash.substr(1);
    if (!page) page = "home";
    loadPage(page);

    function loadNav() {
        fetch("navs.html")
            .then(result => result.text())
            .then(responseText => {
                // load menu items
                document.querySelectorAll(".topnav, .sidenav, .footer-nav").forEach(element => {
                    element.innerHTML = responseText;
                });

                // add event listener to each menu
                document.querySelectorAll(".topnav a, .sidenav a,.footer-nav a, a.brand-logo").forEach(element => {
                    element.addEventListener("click", clickRedirect);
                });
            })
            .catch(err => console.error(`uhh ohh error happened ${err}`));
    }

    function loadPage(page) {
        fetch(`pages/${page}.html`)
            .then(response => Promise.all([response.status, response.text()]))
            .then(responseObj => {
                const content = document.querySelector("#content");
                if (responseObj[0] === 200) {
                    content.innerHTML = responseObj[1];
                    content.querySelectorAll("a.btn, a.breadcrumb, a").forEach(element => {
                        element.addEventListener("click", clickRedirect);
                    });

                    M.AutoInit();

                } else if (responseObj[0] === 404) {
                    loadPage(404);
                } else {
                    content.innerHTML = `<p>Ups... halaman tidak dapat diakses.</p>`;
                }
            })
            .catch(err => console.error(`uhh ohh error happened, need help overhere! ${err}`));
    }

    function clickRedirect() {
        //close sidenav each time menu item is clicked
        let sidenav = document.querySelector(".sidenav");
        M.Sidenav.getInstance(sidenav).close();
        // load menu based on href
        page = event.target.getAttribute("href").substr(1);
        loadPage(page);
    }
});