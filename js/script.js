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
                // Reset previous selected item
                app.unselectPreviousItem();
                // Apply selected style
                app.stylingSelectedItem(leftsideItem);
                // Show sub-menu
                if (leftsideItem.target) {
                    app.showSubmenu(leftsideItem.target);
                }
            })
        })
    },

    unselectPreviousItem: () => {
        const previousSelectedItem = document.querySelector('.leftside-item--selected');
        if (previousSelectedItem) {
            previousSelectedItem.classList.remove('leftside-item--selected');
            if (previousSelectedItem.classList.contains('leftside-item--top')) {
                previousSelectedItem.classList.remove('leftside-item--selected-blue');
            }
        }
    },

    stylingSelectedItem: (item) => {
        item.classList.add('leftside-item--selected');
        if (item.classList.contains('leftside-item--top')) {
            item.classList.add('leftside-item--selected-blue');
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
            if (submenu.classList.contains('submenu--top')) {
                app.handleWithTopSubmenu(submenu);
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



};

document.addEventListener('DOMContentLoaded', app.init);