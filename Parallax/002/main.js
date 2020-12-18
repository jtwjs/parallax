'use strict';

(() => {
    const currentPixel = document.querySelector('.current-pixel');
    const scrollPixels = document.querySelectorAll('.scroll-pixel');
    const main = document.querySelector('#main');
    const sectionList = Array.from(main.children);
    let yOffset;
    let currentScene = 0;
    let prevScrollHeight;
    let scrollTopArr = [];


    function setLayout() {
        currentPixel.innerText = window.pageYOffset;
        for (const section of sectionList) {
            scrollTopArr.push(section.offsetTop);
        }
        scrollPixels.forEach((pixel, idx) => {
             pixel.innerText = scrollTopArr[idx];
        })
    }

    function setPixels() {
        currentPixel.innerText = Math.round(yOffset);
    }

    function scrollLoop() {
        
            console.log(currentScene);
            console.log(sectionList[currentScene].offsetTop);
        if(yOffset > sectionList[currentScene].offsetTop) {
            if (currentScene < sectionList.length - 1){
                prevScrollHeight = sectionList[currentScene].offsetTop;
                scrollPixels[currentScene].parentNode.classList.add('active');
                currentScene++;
            } else {
                prevScrollHeight = sectionList[currentScene].offsetTop;
                scrollPixels[currentScene].parentNode.classList.add('active');
            }
        }
         if(yOffset < prevScrollHeight) {
            if(currentScene === 0) return;
            if(prevScrollHeight === sectionList[sectionList.length - 1].offsetTop) {
                scrollPixels[currentScene].parentNode.classList.remove('active');    
                currentScene--;
                return;
            }
            currentScene--;
            scrollPixels[currentScene].parentNode.classList.remove('active');
            
        }

        
        
        
    }
    
    function init() {
        setLayout();
        window.addEventListener('scroll', () => {
            yOffset = window.pageYOffset;
            setPixels();
            scrollLoop();
        })

    }

    init();
})();