const header = document.querySelector('.main-header');
const path = window.location.pathname;
const show = ["/","/tat-ca-san-pham"]
if(show.indexOf(path)!=-1)
    window.addEventListener("scroll",()=>{
        const scrollPos = window.scrollY;
        if(scrollPos>10){
            header.classList.add('scrolled');   
            $("#rightSideCart").addClass("bg-white")  
            $("#img-cart").attr("src",`${URL_HOST}FE/img/core-img/bag-white.svg`);           
            $(".cart-area").addClass("bgr-black")
        }
        else{
            header.classList.remove('scrolled'); 
            $("#rightSideCart").removeClass("bg-white") 
            $("#img-cart").attr("src",`${URL_HOST}FE/img/core-img/bag.svg`);   
            $(".cart-area").removeClass("bgr-black")    
        }
    })
else
{
    $("#img-cart").attr("src",`${URL_HOST}FE/img/core-img/bag-white.svg`); 
    $(".cart-area").addClass("bgr-black")
    header.classList.add('scrolled')        
}