(() => {
    const main = document.querySelector('#main');
    const header = document.querySelector('#header');
    const dots = document.querySelector('.dot');
    const sectionList = Array.from(main.children);
    class categories {
        constructor(elm) {
            this._selectedElm = elm.parentNode.querySelector('.active');
            this._category = {
                selectElm(elm) {
                    this._selectedElm = elm;
                },
                select(elm) {
                    elm.classList.add('active');
                    this.selectElm(elm);
                },
                unselect(elm) {
                    elm.classList.remove('active');
                },
            };
        };
        
        oneOfThem(elm) {
            if(this._selectedElm) {
                this._category.unselect(this._selectedElm);
            }
            this._category.select(elm);    
        };
    };



    function headerClickHandler(e) {
        let target = e.target;
        if(target.nodeName === 'A') {
            target = target.parentNode;
            const category = target.dataset.category;
            scrollIntoView(category);
        }

        if(target.nodeName ==='BUTTON') {
            header.classList.toggle('show');
            if(target.parentNode.classList.contains('show')) {
                target.innerText = 'close';
            } else {
                target.innerText = 'open';
            }
        }
    }

    function sectionAnimation() {
        const observerOption = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        }        
        const observerCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        }

        const observer = new IntersectionObserver(observerCallback, observerOption);
        for (const section of sectionList) {
            observer.observe(section);
        }
    }
    sectionAnimation();

    function scrollSectionObserve() {
        const observerOption = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3,
        }
        const observerCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if(!entry.isIntersecting && entry.intersectionRatio > 0) {
                    scrollMenuActive(entry);
                } 
            });
        }
        const observer = new IntersectionObserver(observerCallback, observerOption);
        for (const section of sectionList) {
            observer.observe(section);
        }
    }
    scrollSectionObserve();

    function scrollMenuActive(entry) {
        const sectionList = Array.from(main.children);
        const index = sectionList.map(x => x.id).indexOf(`${entry.target.id}`);
        let selectedIndex;
        if (entry.boundingClientRect.y < 0) {
            selectedIndex = index + 1;
        } else {
            selectedIndex = index - 1;
        }
        const navItem = document.querySelector(`.nav-list-item[data-category="#${sectionList[selectedIndex].id}"]`);
        const dotItem = document.querySelector(`.dot-item[data-category="#${sectionList[selectedIndex].id}"]`);
        const navCategory = new categories(navItem);
        const dotCategory = new categories(dotItem);
        navCategory.oneOfThem(navItem);
        dotCategory.oneOfThem(dotItem);
    }

    function scrollIntoView(elem){ 
        const scrollTo = document.querySelector(elem);
        const topValue = scrollTo.offsetTop;
        window.scrollTo({top: topValue, behavior: 'smooth'});
    }

    function scrollHandler() {
        const yOffset = window.pageYOffset;
        const height = main.children[0].clientHeight;
        const stickyLocationY = height - header.clientHeight;
        if(yOffset > stickyLocationY) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }

    function dotClickHandler(e) {
        let target = e.target;
        console.log(target);
        if(target.nodeName === 'LI') {
            scrollIntoView(target.dataset.category);
        }
    }

    function init() {
        window.addEventListener('scroll', scrollHandler);
        header.addEventListener('click',headerClickHandler);   
        dots.addEventListener('click',dotClickHandler);
    }
    init();
})();