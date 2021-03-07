const tabs = (headerSelector, tabSelector, contentSelector, classActive)=> {
    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);

        function hideTabContent() {
            content.forEach(item => {
                item.style.display = 'none';
            });
            tab.forEach(item => {
                item.classList.remove(classActive);
            });
        }

        function showTabsContent(i = 0) {
            content[i].style.display = 'block';
            tab[i].classList.add(classActive);
        }
        hideTabContent();
        showTabsContent();

    header.addEventListener('click',(e)=> {
        const target = e.target;
        if(target && (target.classList.contains(tabSelector.replace(/\./, '')) || 
        target.parentNode.classList.contains(tabSelector.replace(/\./, '')))){
            tab.forEach((item, i)=> {
                if(target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabsContent(i);
                }
                
            });
        }
    });
};

export default tabs;