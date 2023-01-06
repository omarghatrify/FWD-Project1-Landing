
$(function() {
    // Content data, probably from API / CMS
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
    
    // DOM elements to manipulate
    const navList = $('#navbarNav ul.navbar-nav');
    const content = $('#content');
    const navbar = $('nav.navbar');
    const navbarHeight = navbar.height();

    data.forEach((item, index) => {
        // Create nav item and append to nav list
        const navItem = $(`<li class="nav-item"><a class="nav-link" href="#${item.slug}">${item.title}</a></li>`);
        navList.append(navItem);

        // Create content section and append to #content div
        const section = $(`
        <section class="content" id="${item.slug}">
            <div class="col-12 col-lg-9">
                <h2>${item.title}</h2>
                <p>${item.text}</p>
            </div>
        </section>
        `);
        content.append(section);
    });

    // Smooth scroll
    $(window).on('scroll', function() {
        const scrollPos = $(window).scrollTop();
        const sections = $('section.content');
        sections.each(function() {
            const section = $(this);
            const sectionId = section.attr('id');
            const sectionTop = section.offset().top;
            const sectionHeight = section.height();
            // Check if section is in view
            if (scrollPos+200 >= sectionTop && scrollPos+200 < sectionTop + sectionHeight) {
                // Remove active class from all nav links and add to current
                $('a.nav-link').removeClass('active');
                $(`a[href="#${sectionId}"]`).addClass('active');
                // Remove active class from all sections and add to current
                sections.removeClass('active');
                section.addClass('active');
            }
        });
        // show navbar when scrolling and hide if not scrolling for 1 second
        clearTimeout($.data(this, 'scrollTimer'));
        navbar.slideDown({duration: 150, easing:'swing'});
        if(scrollPos > navbarHeight){
            $('#toTopBtn').fadeIn({duration: 500, easing:'swing'});
            navbar.addClass('fixed-top');
            $.data(this, 'scrollTimer', setTimeout(function() {
                navbar.slideUp({duration: 150, easing:'swing'});
            }, 1000));
        }
        else {
            navbar.removeClass('fixed-top');
            $('#toTopBtn').fadeOut({duration: 100, easing:'swing'});
        }
    });

    // Scroll to top button
    $('#toTopBtn').on('click', function() {
        $('html, body').animate({scrollTop: 0}, {duration: 0});
    });

});