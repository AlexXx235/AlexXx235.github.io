let slide_time = 350;
let index = 0;
let list, items, item_width, count, fullscreen, dots, active_dot;

window.onload = () => {
    list = document.querySelector('.slider__list');
    items = document.querySelectorAll('.slider__item');
    count = items.length;
    document.querySelector('.slider__control_right').addEventListener('click', next);
    document.querySelector('.slider__control_left').addEventListener('click', prev);

    fullscreen = document.querySelector('.fullscreen');
    fullscreen.addEventListener('click', event => {
        fullscreen.firstElementChild.innerHTML = '';
        fullscreen.classList.remove('fullscreen_active');
    });
    items.forEach(item => {
        item.firstElementChild.addEventListener('click', event => {
            event.stopPropagation();
            console.log('click');
            const img = event.currentTarget;
            fullscreen.firstElementChild.appendChild(img.cloneNode(true));
            fullscreen.classList.add('fullscreen_active');
        })
    });

    dots = initDots(items.length);
    active_dot = dots[0];
};

function initDots(count) {
    const dots = document.querySelector('.slider__dots');
    const dots_list = [];
    for (let i = 0; i < count; ++i) {
        const dot = document.createElement('div');
        dot.classList.add('slider__dot');
        if (i === 0) {
            dot.classList.add('slider__dot_active');
        }
        dot.addEventListener('click', event => {
            event.stopPropagation();
            toIndex(i);
        });
        dots.appendChild(dot);
        dots_list.push(dot);
    }
    return dots_list;
}

function toIndex(newIndex) {
    item_width = items[0].clientWidth;
    list.classList.add('notransition');
    list.style.right = (newIndex * item_width) + 'px';
    list.offsetHeight;
    list.classList.remove('notransition');
    enableDot(newIndex);
    index = newIndex;
}

function enableDot(index) {
    active_dot.classList.remove('slider__dot_active');
    active_dot = dots[index];
    active_dot.classList.add('slider__dot_active');
}

function next(event) {
    event.stopPropagation();
    item_width = items[0].clientWidth;
    index += 1;
    if (index === count) {
        list.appendChild(items[0].cloneNode(true));
        list.style.right = (index * item_width) + 'px';
        index = 0;
        setTimeout(() => {
            list.classList.add('notransition');
            list.style.right = '0';
            list.offsetHeight;
            list.lastElementChild.remove();
            list.classList.remove('notransition');
        }, slide_time);
    } else {
        list.style.right = (index * item_width) + 'px';
    }
    enableDot(index);
}

function prev(event) {
    event.stopPropagation();
    item_width = items[0].clientWidth;
    index -= 1;
    if (index === -1) {
        list.classList.add('notransition');
        list.insertBefore(items[count - 1].cloneNode(true), list.firstChild);
        list.style.right = item_width + 'px';
        list.offsetHeight;
        list.classList.remove('notransition');
        list.style.right = '0';
        index = count - 1;
        setTimeout(() => {
            list.classList.add('notransition');
            list.style.right = (count - 1) * item_width + 'px';
            list.offsetHeight;
            list.firstElementChild.remove();
            list.classList.remove('notransition');
        }, slide_time);
    } else {
        list.style.right = (index * item_width) + 'px';
    }
    enableDot(index);
}
