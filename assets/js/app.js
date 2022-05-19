// window.addEventListener('scroll', function () {
//     let header = document.querySelector('header');
//     let windowPosition = window.scrollY > 0;
  
//     header.classList.toggle('scrolling-active', windowPosition);
//   })

// const $ = (s, o = document) => o.querySelector(s);
// const $$ = (s, o = document) => o.querySelectorAll(s);

// $$('.button').forEach(button => {

//     let icon = $('.icon', button),
//         arrow = $('.icon > svg', button),
//         line = $('.icon div svg', button),
//         svgPath = new Proxy({
//             y: null
//         }, {
//             set(target, key, value) {
//                 target[key] = value;
//                 if(target.y !== null) {
//                     line.innerHTML = getPath(target.y, .25, null);
//                 }
//                 return true;
//             },
//             get(target, key) {
//                 return target[key];
//             }
//         });

//     svgPath.y = 12;

//     button.addEventListener('click', e => {
//         if(!button.classList.contains('loading')) {

//             button.classList.add('loading');

//             gsap.timeline({
//                 repeat: 2
//             }).to(svgPath, {
//                 y: 17,
//                 duration: .17,
//                 delay: .03
//             }).to(svgPath, {
//                 y: 12,
//                 duration: .3,
//                 ease: Elastic.easeOut.config(1, .35)
//             });

//             gsap.timeline({
//                 repeat: 2,
//                 repeatDelay: .1,
//                 onComplete() {
//                     gsap.to(arrow, {
//                         '--y': -17.5,
//                         duration: .4
//                     });
//                     setTimeout(() => button.classList.add('complete'), 200);
//                 }
//             }).to(arrow, {
//                 '--y': 9,
//                 duration: .2
//             }).to(arrow, {
//                 '--y': -9,
//                 duration: .2
//             });

//             gsap.timeline().to(icon, {
//                 y: 4,
//                 duration: .2
//             }).to(icon, {
//                 y: 8,
//                 duration: .2,
//                 delay: .2
//             }).to(icon, {
//                 y: 12,
//                 duration: .2,
//                 delay: .2
//             }).to(icon, {
//                 y: 18,
//                 duration: .2,
//                 delay: .2
//             });

//         }
//         e.preventDefault();
//     });

// });

// function getPoint(point, i, a, smoothing) {
//     let cp = (current, previous, next, reverse) => {
//             let p = previous || current,
//                 n = next || current,
//                 o = {
//                     length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
//                     angle: Math.atan2(n[1] - p[1], n[0] - p[0])
//                 },
//                 angle = o.angle + (reverse ? Math.PI : 0),
//                 length = o.length * smoothing;
//             return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
//         },
//         cps = cp(a[i - 1], a[i - 2], point, false),
//         cpe = cp(point, a[i - 1], a[i + 1], true);
//     return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
// }

// function getPath(update, smoothing, pointsNew) {
//     let points = pointsNew ? pointsNew : [
//             [2, 12],
//             [12, update],
//             [22, 12]
//         ],
//         d = points.reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${getPoint(point, i, a, smoothing)}`, '');
//     return `<path d="${d}" />`;
// }


$('.dl-button').on('click', e => {

    let btn = $(e.currentTarget),
        label = btn.find('.label'),
        counter = label.find('.counter');

    if(!btn.hasClass('active') && !btn.hasClass('done')) {

        btn.addClass('active');

        setLabel(label, label.find('.default'), label.find('.state'));

        setTimeout(() => {
            counter.addClass('hide');
            counter.animate({
                width: 0
            }, 400, function() {
                label.width(label.find('.state > span').width());
                counter.removeAttr('style');
            });
            btn.removeClass('active').addClass('done');
        }, getComputedStyle(btn[0]).getPropertyValue('--duration'));

    }

    return false;

});

$('.restart').on('click', e => {

    let btn = $('.dl-button'),
        label = btn.find('.label'),
        counter = label.find('.counter');

    setLabel(label, label.find('.state'), label.find('.default'), function() {
        counter.removeClass('hide');
        btn.removeClass('done');
    });

    return false;

});

function setLabel(div, oldD, newD, callback) {
    oldD.addClass('hide');
    div.animate({
        width: newD.outerWidth()
    }, 200, function() {
        oldD.removeClass('show hide');
        newD.addClass('show');
        div.removeAttr('style');
        if(typeof callback === 'function') {
            callback();
        }
    });
}
