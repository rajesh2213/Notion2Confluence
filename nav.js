
const createNav = () => {
    let nav = document.querySelector('.navbar')

    nav.innerHTML = `
<div class="wrapper">
<nav>
<input type="checkbox"  id="show-search">
<input type="checkbox"  id="show-menu">
<label for="show-menu" class="menu-icon"><i class="fas fa-bars"></i></label>

<div class="nav">

    <div class="nav-items">
    <label for="show-search" class="search-icon"><i class="fas fa-times" onclick="removeBrand()" id="close-logo"></i>

    <label for="show-search" class="search-icon"><i class="fas fa-search" onclick="removeBrand()" id="search-logo"></i>
    <div class="search">
            <input type="text" class="search-box" placeholder="  search vaccination centers">
            <button class="search-btn">search</button>

    </div>
    </label>
        <a><img src="../images/user.png" id="user-img" alt=""></a>
        <div class="login-logout-popup hide">
            <p class="account-info1">welcome,</p>
                <p class="account-info">Log in as, name</p>
                <li class="dd-item"><a href="/" class="link">home</a></li>
                 <li class="dd-item"><a href="#" class="link"></a></li>
                <button class="btn" id="user-btn">Log out</button>
        </div>
          <a href="/cart"><i class="fas fa-shopping-cart" id="cart-logo"></i>
          <img src="../images/cart.png" class="cart-img"alt=""></a>
    </div>
</div>
<div class="links-container">
    
    <li class="link-item"><a href="http://localhost:2000/" class="link">home</a></li>
        
    </li>
    <li class="link-item"><a href="/search/center" class="link">Converter</a>
        
    </li>
    

</div>

    
</div>
</nav>
</div>

    `;
}



createNav();


function removeBrand() {
    var search = document.querySelector('.search')
    var searchLogo = document.getElementById("search-logo")
    var closeLogo = document.getElementById("close-logo")
    var cartLogo = document.getElementById("cart-logo");
    var searchCheckBox = document.getElementById("show-search");
    var brandLogo = document.querySelector('.brand-logo')
    if(!searchCheckBox.checked == true){
        brandLogo.style.cssText = 'display: none;';
        cartLogo.style.cssText = 'display:none;';
        closeLogo.style.cssText = 'display:block;';
        searchLogo.style.cssText = 'display:none;';
        search.style.cssText = "display:block;";

        console.log('1')
    }else{
        search.style.cssText = "display:none;";

        brandLogo.style.cssText = 'display: block;';
        closeLogo.style.cssText = 'display:none;';
        cartLogo.style.cssText = 'display:block;';
        searchLogo.style.cssText = 'display:block;';

        console.log('2')
    }
   // document.querySelector('.brand-logo').style.cssText = 'opacity: 0; color: white; font-size: 44px';
}




if(location.pathname.split('/')[1]=='')
{
gsap.from('.link-item', {opacity:0, duration:5, delay:.7, x:30, ease:'expo.out'})
gsap.from('.brand-logo', {opacity:0, duration:5, delay:.5, x:-30, ease:'expo.out'})
gsap.from('.content', {opacity:0, duration:5, delay:1.3, y:60, ease:'expo.out'})
// gsap.from('#men-tshirts-products', {opacity:0, duration:5, delay:1.3, y:60, ease:'expo.out'})

}
// nav popup

const userImageButton = document.querySelector('#user-img');
const userPop = document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.account-info');
const popuptext1 = document.querySelector('.account-info1');
const actionBtn = document.querySelector('#user-btn');

userImageButton.addEventListener('click', () => {
    userPop.classList.toggle('hide');
})

window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null);
    if(user != null){
        //user is logged in
        popuptext.innerHTML = `logged in as, ${user.name}`;
        actionBtn.innerHTML = `log out`
        popuptext1.innerHTML = '';
        actionBtn.addEventListener('click', () =>{
            sessionStorage.clear();
            location.reload();

        })
    }else{
        //user is not logged in
        popuptext.innerHTML = 'To access account and manage applications';
        actionBtn.innerHTML =  'log in';
        actionBtn.addEventListener('click', () => {
            location.href = '/login';
        })
    }
}

//search box
const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search-box');
searchBtn.addEventListener('click', () => {
    if(searchBox.value.length){
        location.href = `/search/${searchBox.value}`
    }
})


// animation scroll

const sr = ScrollReveal({
    duration: 2500,
    reset: true
})
sr.reveal('.section__text', {origin: 'bottom', distance: '70px',delay:100})
sr.reveal('.section__text1', {origin: 'top', distance: '70px',delay:200})
sr.reveal('.section__title', {origin: 'right', distance: '70px',})
sr.reveal('.elec-img', {origin: 'left', distance: '70px',delay:300})

const sr1 = ScrollReveal({
    duration: 2500,
    reset: false
})
sr1.reveal('#men-tshirts-products', {origin: 'bottom', distance: '150px'})
sr1.reveal('#men-tshirts-products-3', {origin: 'bottom', distance: '150px'})
sr1.reveal('#men-tshirts-products-2', {origin: 'bottom', distance: '150px'})
