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
                const previousSelectedItem = document.querySelector('.leftside-item--selected');
                if (previousSelectedItem) {
                    previousSelectedItem.classList.remove('leftside-item--selected');
                    if (previousSelectedItem.classList.contains('leftside-item--top')) {
                        previousSelectedItem.classList.remove('leftside-item--selected-blue');
                    }
                }
                // Apply selected style
                leftsideItem.classList.add('leftside-item--selected');
                if (leftsideItem.classList.contains('leftside-item--top')) {
                    leftsideItem.classList.add('leftside-item--selected-blue');
                }
            })
        })
    }
};

document.addEventListener('DOMContentLoaded', app.init);