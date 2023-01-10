const data = [
    {
        slug: 'title1',
        title: 'Title1',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ad rerum in excepturi, nobis ab error assumenda quos a porro cupiditate veritatis. Quaerat quis blanditiis ducimus corporis illum minima magni accusamus totam nihil? Odio voluptates possimus error quidem rerum, earum nihil a reiciendis sit, vero nisi qui ullam. Officia nulla similique molestiae, saepe maxime magnam ipsam esse quisquam maiores distinctio quidem, vitae cumque laudantium. Voluptatibus eum quas animi, maxime non fugit deserunt? Iure, culpa vel numquam, mollitia officia fugiat adipisci animi assumenda porro distinctio rerum dignissimos sint quae odio, ipsa harum excepturi nam ipsam. Incidunt atque aperiam deleniti ullam maiores.'
    },
    {
        slug: 'title2',
        title: 'Title2',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ad rerum in excepturi, nobis ab error assumenda quos a porro cupiditate veritatis. Quaerat quis blanditiis ducimus corporis illum minima magni accusamus totam nihil? Odio voluptates possimus error quidem rerum, earum nihil a reiciendis sit, vero nisi qui ullam. Officia nulla similique molestiae, saepe maxime magnam ipsam esse quisquam maiores distinctio quidem, vitae cumque laudantium. Voluptatibus eum quas animi, maxime non fugit deserunt? Iure, culpa vel numquam, mollitia officia fugiat adipisci animi assumenda porro distinctio rerum dignissimos sint quae odio, ipsa harum excepturi nam ipsam. Incidunt atque aperiam deleniti ullam maiores.'
    },
    {
        slug: 'title3',
        title: 'Title3',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ad rerum in excepturi, nobis ab error assumenda quos a porro cupiditate veritatis. Quaerat quis blanditiis ducimus corporis illum minima magni accusamus totam nihil? Odio voluptates possimus error quidem rerum, earum nihil a reiciendis sit, vero nisi qui ullam. Officia nulla similique molestiae, saepe maxime magnam ipsam esse quisquam maiores distinctio quidem, vitae cumque laudantium. Voluptatibus eum quas animi, maxime non fugit deserunt? Iure, culpa vel numquam, mollitia officia fugiat adipisci animi assumenda porro distinctio rerum dignissimos sint quae odio, ipsa harum excepturi nam ipsam. Incidunt atque aperiam deleniti ullam maiores.'
    },
    {
        slug: 'title4',
        title: 'Title4',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ad rerum in excepturi, nobis ab error assumenda quos a porro cupiditate veritatis. Quaerat quis blanditiis ducimus corporis illum minima magni accusamus totam nihil? Odio voluptates possimus error quidem rerum, earum nihil a reiciendis sit, vero nisi qui ullam. Officia nulla similique molestiae, saepe maxime magnam ipsam esse quisquam maiores distinctio quidem, vitae cumque laudantium. Voluptatibus eum quas animi, maxime non fugit deserunt? Iure, culpa vel numquam, mollitia officia fugiat adipisci animi assumenda porro distinctio rerum dignissimos sint quae odio, ipsa harum excepturi nam ipsam. Incidunt atque aperiam deleniti ullam maiores.'
    }
];

document.addEventListener('DOMContentLoaded', function () {
    const navList = document.querySelector('#navbarNav');
    const content = document.querySelector('#content');
    const header = document.querySelector('header');
    const toTopBtn = document.querySelector('#toTopBtn');

    const fragmentNavItems = document.createDocumentFragment();
    const fragmentSections = document.createDocumentFragment();
    data.forEach((item, index) => {
        const navItem = document.createElement('li');
        navItem.classList.add('nav-item');
        navItem.innerHTML = `<a class="nav-link" href="#${item.slug}">${item.title}</a>`;
        fragmentNavItems.appendChild(navItem);

        const section = document.createElement('section');
        section.classList.add('content');
        section.setAttribute('id', item.slug);
        section.innerHTML = `
            <div>
                <h2>${item.title}</h2>
                <p>${item.text}</p>
            </div>
        `;
        fragmentSections.appendChild(section);
    });
    navList.appendChild(fragmentNavItems);
    content.appendChild(fragmentSections);

    window.addEventListener('scroll', function () {
        const scrollPos = window.scrollY;
        const sections = document.querySelectorAll('section.content');
        sections.forEach((section) => {
            const sectionId = section.getAttribute('id');
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos+200 >= sectionTop && scrollPos+200 < sectionTop + sectionHeight) {
                document.querySelector('a.nav-link.active')?.classList.remove('active');
                document.querySelector(`a.nav-link[href="#${sectionId}"]`).classList.add('active');
                section.classList.add('active');
            }
            else {
                section.classList.remove('active');
            }
        });
        // show toTopBtn when scroll is more than the half of first section
        if (scrollPos > sections[0].offsetTop + sections[0].offsetHeight / 2) {
            toTopBtn.classList.add('active');
            header.classList.add('fixed-top');
        }
        else {
            toTopBtn.classList.remove('active');
            header.classList.remove('fixed-top');
        }
    });
    document.querySelectorAll('a.nav-link').forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href');
            document.querySelector(sectionId).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });
    });
    toTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });

});