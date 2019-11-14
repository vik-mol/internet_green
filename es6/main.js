document.addEventListener('DOMContentLoaded', ()=>{
    
    const navbar = document.getElementById('nav-bar');
    const header = document.getElementById('header')
    const menuToggler = document.getElementById('header-toggle-btn');

    menuToggler.addEventListener('click', function (e){
        if(document.documentElement.clientWidth > 520) return;
        navbar.classList.toggle('open');
        this.classList.toggle('open');

    });



     

});