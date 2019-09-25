/* feedreader.js
 *
 * Written by: Akin Jackson Campbell
 * Date: 9/24/2019
 */

/* I'm placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Test suite: RSSfeeds definitions, the allFeeds variable in our application. */
    describe('RSS Feeds', function() {
        /* tests to make sure that the allFeeds variable has been
         * defined and that it is not empty. Experiment with
         * this before you get started on the rest of this project.
         * What happens when you change allFeeds in app.js to be an
         * empty array and refresh the page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('url defined', function() {
           //Loop through each feed entry's url to test if url is undefined/empty
            allFeeds.forEach(function(feed){
              expect(feed.url).not.toBe('');
              expect(feed.url).toBeDefined();
            });
         });


        /* test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name defined', function() {
           //Loop through each feed entry's url to test if url is undefined/empty
            allFeeds.forEach(function(feed){
              expect(feed.name).not.toBe('');
              expect(feed.name).toBeDefined();
            });
         });
    });


    /* Test suite: "The menu" */
    describe('The menu', function() {

        /* test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('hidden default', function() {
           let $body = $(document.body);
           expect($body.hasClass('menu-hidden')).toBe(true);
         });

         /* test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('menu click', function() {



            let $body = $(document.body);
            $(".menu-icon-link").click(); //click menu icon once
            expect($body.hasClass('')).toBe(true); //Check if menu-hidden is not there => menu open
            $(".menu-icon-link").click(); //click menu icon once, again
            expect($body.hasClass('menu-hidden')).toBe(true); //Check if menu-hidden is there => menu closed

          });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container
         */
         beforeEach(function(done) {
           loadFeed(0,done);
         });
         it('work complete', function() {
           const feed = document.querySelector('.feed');
           let entryEls = feed.querySelectorAll('.entry');
           expect(entryEls.length > 0).toBe(true);
         });

    });

    /* Test suite: "New Feed Selection" */
    describe('News Feed Selection', function() {
        const feed = document.querySelector('.feed');
        const firstFeed = [];
        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         beforeEach(function(done){
              loadFeed(0, function(){
                  Array.from(feed.children).forEach(function(entry){
                    firstFeed.push(entry.innerText);
                  });
                  loadFeed(1, function(){
                     // all variables initialised, can begin tests
                    done();
                 });
             });
          });
         it('content changes', function(){
           Array.from(feed.children).forEach(function(entry,index) {
             console.log(entry.innerText, firstFeed[index], entry.innerText === firstFeed[index]);
             expect(entry.innerText === firstFeed[index]).toBe(false);
           });
         });




    });

}());
