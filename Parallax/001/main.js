(() => {
    const navbar = document.querySelector('.navbar');

    function headerClickHandler(e) {
        let target = e.target;
        if(target.nodeName === 'A') {
            const category = target.dataset.category;
            scrollIntoView(category);
        }
    }

    function scrollIntoView(elem){ 
        const scrollTo = document.querySelector(elem);
        const topValue = scrollTo.offsetTop;
        window.scrollTo({top: topValue, behavior: 'smooth'});
    }

    function init() {
        navbar.addEventListener('click',headerClickHandler);   
    }
    init();
})();