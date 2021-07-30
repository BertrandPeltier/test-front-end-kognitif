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
                // Unselect previous sub-menu
                app.unselectPreviousSubMenu();
                // Show sub-menu
                app.showSubMenu(leftsideItem.target);
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

    unselectPreviousSubMenu: () => {
        const previousSubMenu = document.querySelector('.is-active');
        if (previousSubMenu) {
            previousSubMenu.classList.add('is-hidden');
            previousSubMenu.classList.remove('is-active');
        }
    },

    showSubMenu: (target) => {
        const subMenu = document.getElementById(target);
        subMenu.classList.remove('is-hidden');
        subMenu.classList.add('is-active');
    }

};

document.addEventListener('DOMContentLoaded', app.init);