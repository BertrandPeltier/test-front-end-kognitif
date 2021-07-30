const app = {
    init: () => {
        app.noRefresh();
        app.leftsideItemAction();
    },

    noRefresh: () => {
        document.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', (event) => event.preventDefault());
        })
    },

    leftsideItemAction: () => {
        const leftsideItems = document.querySelectorAll('.leftside-item');
        leftsideItems.forEach(leftsideItem => {
            leftsideItem.addEventListener('click', (event) => {
                if (leftsideItem.classList.contains('leftside-item--selected')) {
                    app.unselectPreviousItem(event);
                    if (leftsideItem.target) {
                        app.unselectPreviousSubmenu();
                        if (leftsideItem.classList.contains('leftside-item--bottom')) {
                            leftsideItem.querySelectorAll('i')[1].innerText = 'chevron_right';
                        }
                    }
                } else {
                    app.unselectPreviousItem(event);
                    app.stylingSelectedItem(leftsideItem);
                    if (leftsideItem.target) {
                        app.showSubmenu(leftsideItem.target);
                    } else {
                        app.unselectPreviousSubmenu();
                    }
                }
            })
        })
    },

    unselectPreviousItem: (event) => {
        const previousSelectedItem = document.querySelector('.leftside-item--selected');
        if (previousSelectedItem) {
            previousSelectedItem.classList.remove('leftside-item--selected');
            if (previousSelectedItem.classList.contains('leftside-item--bottom')) {
                previousSelectedItem.querySelectorAll('i')[1].innerText = 'chevron_right';
            } else if (previousSelectedItem.classList.contains('leftside-item--top')) {
                previousSelectedItem.classList.remove('leftside-item--selected-blue');
            }
        }
    },

    stylingSelectedItem: (item) => {
        item.classList.add('leftside-item--selected');
        if (item.classList.contains('leftside-item--top')) {
            item.classList.add('leftside-item--selected-blue');
        }
        if (item.classList.contains('leftside-item--bottom')) {
            item.querySelectorAll('i')[1].innerText = 'expand_more';
        }
    },

    unselectPreviousSubmenu: () => {
        const previousSubmenu = document.querySelector('.is-active');
        if (previousSubmenu) {
            previousSubmenu.classList.add('is-hidden');
            previousSubmenu.classList.remove('is-active');
        }
    },

    showSubmenu: (target) => {
        const submenu = document.getElementById(target);
        if (!submenu.classList.contains('is-active')) {
            app.unselectPreviousSubmenu();
            submenu.classList.remove('is-hidden');
            submenu.classList.add('is-active');
            // Submenu top
            if (submenu.classList.contains('submenu--top')) {
                app.handleWithTopSubmenu(submenu);
            } else if (submenu.classList.contains('submenu--bottom')) {
                app.handleWithBottomSubmenu(submenu);
            }

        }
    },

    handleWithTopSubmenu: (submenu) => {
        const subItems = submenu.querySelectorAll('li');
        const unselectOtherSubItems = (items) => {
            items.forEach(item => {
                if (item.classList.contains('submenu--selected-top')) {
                    item.classList.remove('submenu--selected-top');
                }
            });
        };
        unselectOtherSubItems(subItems);
        subItems[0].classList.add('submenu--selected-top');
        subItems.forEach(subItem => {
            subItem.addEventListener('click', () => {
                unselectOtherSubItems(subItems);
                subItem.classList.add('submenu--selected-top');
            });
        });
    },

    handleWithBottomSubmenu: (submenu) => {
        const subItems = submenu.querySelectorAll('li');
        subItems.forEach(subItem => {
            subItem.addEventListener('click', () => {
                subItem.firstChild.classList.remove('is-grey');
                subItem.firstChild.classList.add('is-yellow');
            })
        })
    }



};

document.addEventListener('DOMContentLoaded', app.init);