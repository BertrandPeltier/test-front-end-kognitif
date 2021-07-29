const app = {
    init: () => {
        document.querySelectorAll('a').forEach(anchor => {
            anchor.addEventListener('click', (event) => {
                event.preventDefault();
            })
        })
    }
};

document.addEventListener('DOMContentLoaded', app.init);