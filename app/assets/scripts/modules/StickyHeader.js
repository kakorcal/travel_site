import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
  constructor() {
    this.lazyImages = $('.lazyload');
    this.siteHeader = $('.site-header');
    this.headerTriggerElement = $('.large-hero__title');
    this.createHeaderWaypoint();
    this.pageSections = $('.page-section');
    this.createPageSectionWaypoints();
    this.headerLinks = $('.primary-nav a');
    this.addSmoothScroll({speed: 600});
    this.refreshWaypoints();
  }
  
  // waypoints will trigger at wrong time cause of the lazyloading, the image doesn't exist so the height is screwed up
  // so everytime an image loads we can refresh the waypoints
  refreshWaypoints() {
    this.lazyImages.on('load', function(){
      // Waypoint is in the global scope cause that's how the author created it so we don't have to do this on RevealOnScroll.js
      Waypoint.refreshAll();
    });
  }

  addSmoothScroll() {
    this.headerLinks.smoothScroll();
  }

  createHeaderWaypoint() {
    var that = this;
    new Waypoint({
      element: this.headerTriggerElement[0], // can't be a jquery element, has to be native to have to add [0]
      handler: function(direction) {
        if(direction === 'down') {
          that.siteHeader.addClass('site-header--dark');
        }else {
          that.siteHeader.removeClass('site-header--dark');
        }
      }
    });
  }

  createPageSectionWaypoints() {
    var that = this;
    that.pageSections.each(function(){
      var currentPageSection = this;
      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if(direction === 'down') {
            var matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
            that.headerLinks.removeClass('is-current-link');
            $(matchingHeaderLink).addClass('is-current-link');            
          }
        },
        offset: '18%'
      });

      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if(direction === 'up') {
            var matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
            that.headerLinks.removeClass('is-current-link');
            $(matchingHeaderLink).addClass('is-current-link');            
          }
        },
        offset: '-40%'
      });
    });
  }
}

export default StickyHeader;