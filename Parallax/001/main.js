(() => {
    const main = document.querySelector('#main');
    const header = document.querySelector('#header');
    const categories = {
        selectCategory(elm) {
            selectedCategory = elm;
        },
        select(elm) {
            elm.classList.add('active');
            this.selectCategory(elm);
        },
        unselect(elm) {
            elm.classList.remove('active');
        }

    };
    let selectedCategory = document.querySelector('.nav-list-item.active');

    function oneOfThem(elm) {
        if(selectedCategory) {
            categories.unselect(selectedCategory);
        }
        categories.select(elm);
    }

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

    function scrollMenuActive() {
        const sectionList = Array.from(main.children);
        const observerOption = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3,
        }
        const observerCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if(!entry.isIntersecting && entry.intersectionRatio > 0) {
                    const index = sectionList.map(x => x.id).indexOf(`${entry.target.id}`);
                    let selectedIndex;
                    if (entry.boundingClientRect.y < 0) {
                        selectedIndex = index + 1;
                    } else {
                        selectedIndex = index - 1;
                    }
                    const navItem = document.querySelector(`[data-category="#${sectionList[selectedIndex].id}"]`);
                    oneOfThem(navItem);
                } 
            });
        }
        const observer = new IntersectionObserver(observerCallback, observerOption);
        for (const section of sectionList) {
            observer.observe(section);
        }
    }
    scrollMenuActive();

    function scrollIntoView(elem){ 
        const scrollTo = document.querySelector(elem);
        const topValue = scrollTo.offsetTop;
        window.scrollTo({top: topValue, behavior: 'smooth'});
    }

    function init() {
        header.addEventListener('click',headerClickHandler);   
    }
    init();
})();