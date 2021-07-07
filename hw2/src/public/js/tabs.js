export function Tabs() {
    let navMenuItems = document.getElementsByClassName('navigationMenu')[0].getElementsByTagName("a");
    let tabItems = document.getElementById('tabs').getElementsByClassName('tab-item');

    const loopTabItems = (job, tabItems, className) => {
        for (var i = 0, len = tabItems.length; i < len; i++) {
            switch (job) {
                case 'active':
                    if (tabItems[i].classList.contains(className))
                        tabItems[i].classList.add('active');

                    break;
                case 'hide':
                    tabItems[i].classList.remove('active');

                    break;
            }
        }
    }

    const loopNavLinks = (job, navMenuItems) => {
        for (var i = 0, len = navMenuItems.length; i < len; i++) {
            switch (job) {
                case 'click':
                    navMenuItems[i].addEventListener('click', function (e) {
                        e.preventDefault();
                        loopNavLinks('hide', navMenuItems);
                        e.target.classList.add('active');
                        loopTabItems('hide', tabItems);
                        loopTabItems('active', tabItems, e.target.getAttribute('href').substring(1));
                    })

                    break;
                case 'hide':
                    navMenuItems[i].classList.remove('active');

                    break;

            }
        }
    }

    loopNavLinks('click', navMenuItems);
}