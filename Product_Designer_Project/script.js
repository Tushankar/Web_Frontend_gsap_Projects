const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
  var tl = gsap.timeline();
  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.3,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}
firstPageAnim();
//Jab mouse move ho tab hum log skew kar paye 
//Apne mini cricle ko which is moving with our mouse movement
//max skew and min skew we can define and set
//Jab mouse move ho to kitna chapta ho skew ko value bade aur jab mouse chalna 
//band hojaye to remove skey

function circleChaptaKaro(){
  //definne default scale value;
  var xscale = 1;
  var yscale = 1;
  var xprev = 0;
  var yprev = 0;
  
  window.addEventListener("mousemove", function(dets){
    //now we will chapta based on differences if value -42 came means huge difference we will make small .8 ball
    //clamp-availabale in gsap
    //i want to map the values between .8 to 1.2 with the size of miniBalls
    xscale = gsap.utils.clamp(.7, 1.3,  dets.clientX - xprev);//These are the values of scale
    yscale = gsap.utils.clamp(.7, 1.3, dets.clientY - yprev);//X value me kitna scale karna hai aur y value me kitna
  
    //we can chapta in x direction or in y direction
    //x chapta and y chapta
    //it give the value of mouse
  
    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale); //Humne circle mouse follower ko x scale
    //aur yscale ki value bhejdi kitna scale karna hai kahape 
  })
}
circleChaptaKaro();

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}
circleMouseFollower();

//teeno element ko select karo 
//aur teeno par mouse move lagao
//jab mouse move ho tab ye pata karo mouse kaha se kaha par he
//jiska matlab hai mouse ki x and y position pata karo,
//ab mouse ki us image ke badle us image ko show karo and usimage ko move karo
//move karte waqt rotate karo
//jese mouse teej chale rotation bhi teej ho
document.querySelectorAll('.elem').forEach(function(elem){
   var rotate = 0;
   var diffRot = 0;


   //Apne mouseMove pe lagadi
   //mouse leave me opacity zero mardooo bhaijaaaaannn
   elem.addEventListener("mouseleave", function(details){
    gsap.to(elem.querySelector("img"),{
     opacity: 0,
     duration: 0.5,
    })
})

  //pehli baar pehla elem ayega uske baad dusra uske baad 3sraaa
  elem.addEventListener("mousemove", function(details){
    // first elem ko select kardoooooooo guysssssss not only document . query selector
    //Mouse border ke line se kitna niche he
    var diff = details.clientY-elem.getBoundingClientRect().top;
    //rotation ki kahani
    diffRot = details.clientX - rotate;
    rotate = details.clientX;

    gsap.to(elem.querySelector("img"), {
    opacity: 1,
    ease: Power3,
    //top ki position ap use karenge us differnce se 
    //so that the img lies only in that boundary only
    top: diff,
    left: details.clientX,
    //i want max to max 15 se 20 degree image rotate ho
    rotate: gsap.utils.clamp(-20, 20, diffRot*0.8),
   })



  })

})
