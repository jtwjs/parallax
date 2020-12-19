'use strict';

(() => {
    const currentPixel = document.querySelector('.current-pixel');
    const scrollPixels = document.querySelectorAll('.scroll-pixel');
    const body = document.querySelector('body');
    const main = document.querySelector('#main');
    const sectionList = Array.from(main.children);
    const totalScrollHeight = body.clientHeight - window.innerHeight - 10;
    let yOffset;
    let currentScene = 0;
    let prevScrollHeight;
    let scrollTopArr = [];


    function setLayout() {
        scrollTopArr = sectionList.map(x => {
            if(x.offsetTop > totalScrollHeight) {
                return totalScrollHeight;
            }
            return x.offsetTop;
        });
        
        scrollPixels.forEach((pixel, idx) => {
             pixel.innerText = scrollTopArr[idx];
        });

        scrollTopArr.map((x) => {
            if(yOffset > x) {
                if(currentScene < scrollTopArr.length - 1) {
                    currentScene++;
                }
            }
        })
        console.log(currentScene);
        for (let i=0; i<currentScene; i++) {
            scrollPixels[i].parentNode.classList.add('active');
        }
    }


    function setPixels() {
        currentPixel.innerText = Math.round(window.pageYOffset);
    }

    function scrollLoop() {

        if(yOffset > scrollTopArr[currentScene]) {
            if (currentScene < scrollTopArr.length - 1){
                prevScrollHeight = scrollTopArr[currentScene];
                scrollPixels[currentScene].parentNode.classList.add('active');
                currentScene++;
            } else {
                prevScrollHeight = scrollTopArr[currentScene];
                scrollPixels[currentScene].parentNode.classList.add('active');
            }
        }

         if(yOffset < prevScrollHeight) {
            if(currentScene === 0) return;
            if(prevScrollHeight === scrollTopArr[sectionList.length - 1]) {
                scrollPixels[currentScene].parentNode.classList.remove('active');    
                currentScene--;
                return;
            }
            currentScene--;
            scrollPixels[currentScene].parentNode.classList.remove('active');
            
        }

        
        
        
    }
    
    function init() {
        window.addEventListener('load', () => {
            setLayout();
            setPixels();
            scrollLoop();
        })
        window.addEventListener('scroll', () => {
            yOffset = window.pageYOffset;
            setPixels();
            scrollLoop();
        })

    }

    init();
})();