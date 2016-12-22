//#region NewsHandler
NewsHandler = {
    id: '',
    apiUrl: window.location.origin + '/sitecore/api/ssc/norra/',
    newsUrl: 'News/1337/GetNews',
    calendarUrl: 'Calendar/1337/GetCalendar',
    siteId: null,
    page: 2,
    pageSize: 3,
    $newsList: null,
    $newsItem: null,
    items: [],
    $loadmore: null,
    $filter: null,
    $filterLoader: null,
    $noResult: null,
    createNewList: false,
    init: function(SiteId, Id) {
        //get Site ID
        this.siteId = SiteId;
        this.id = Id;

        //get DOM template elements
        var _newsList = document.getElementById(Id + '-list-template');
        var _newsItem = document.getElementById(Id + '-item-template');

        //console.log(_newsItem)

        if (_newsList === null || _newsItem === null) {
            console.log('Associated DOM elements not found!');
            return;
        }

        this.$newsList = $(_newsList);
        this.$newsItem = $(_newsItem);

        //remove ID's
        this.$newsList.removeAttr('id');
        this.$newsItem.removeAttr('id');

        //remove from DOM
        this.$newsItem.remove();

        //push all current <li> into items Array
        var _li = _newsList.querySelectorAll('li');
        $.each(_li, function(i, item) {
            this.items.push(item);
        }.bind(this));


        //load more button
        var _loadmore = document.querySelector('.load-more');
        if (_loadmore !== null) {
            this.$loadmore = $(_loadmore);
            this.$loadmore.on('click', function(e) {
                //if already loading, stop
                if (this.$loadmore.hasClass('loading')) return false;

                this.createNewList = false;
                this.$loadmore.height(this.$loadmore.height());
                this.$loadmore.width(this.$loadmore.width());
                this.$loadmore.addClass('loading');

                //***********IMPORTANT!*********** remove timeout later, only for visual
                setTimeout(function() {
                    this.getNews(this.createNewsItems);
                }.bind(this), 600);
                return false;
            }.bind(this));
        }

        //filter dropdown
        var _filter = document.getElementById('select_year');
        if (_filter !== null) {
            this.$filter = $(_filter);
            this.$filterLoader = $(_filter.nextElementSibling);
            this.$filter.on('change', function(e) {
                //console.log('Selected year: ' + this.value);
                var year = (this.value == 'All') ? -1 : this.value;
                NewsHandler.createNewList = true;
                NewsHandler.page = 1;
                NewsHandler.$newsList.addClass('loading');
                NewsHandler.$filter.attr('disabled', 'disabled');
                NewsHandler.$filterLoader.addClass('show');
                //***********IMPORTANT!*********** remove timeout later, only for visual
                setTimeout(function() {
                    NewsHandler.getNews(NewsHandler.createNewsItems, year);
                }, 600);
                return false;
            });
        }

        //no result text
        var _noresult = document.querySelector('.no-result');
        if (_noresult !== null) {
            this.$noResult = $(_noresult);
        }
    },
    loadNewsList: function() {
        //get news
        this.getNews(this.createNewsItems);
    },
    loadNewsLatestList: function() {
        //get news
        this.getNews(this.createNewsLatestItems);
    },
    clearNewsList: function() {
        if (NewsHandler.items.length) {
            $.each(NewsHandler.items, function(i, item) {
                item.parentNode.removeChild(item);
            });
        }
        NewsHandler.items = [];
    },
    createNewsLatestItems: function(data) {
        if (data.length < NewsHandler.pageSize) {

        }

        //loop thru result and create new <li> DOM elements
        $.each(data, function(i, item) {
            var _clone = NewsHandler.$newsItem.clone()[0];

            //Title
            _clone.querySelector('.title').innerHTML = item.Title;

            //Date
            var date = new Date(item.Date);

            _clone.querySelector('.day').innerHTML = ('0' + date.getDate()).slice(-2);
            _clone.querySelector('.month').innerHTML = ('0' + (date.getMonth() + 1)).slice(-2);
            _clone.querySelector('.year').innerHTML = date.getFullYear();

            //Link
            _clone.querySelector('.title').setAttribute('href', window.location.origin + item.Link.replace('http://', ''));

            NewsHandler.items.push(_clone);
            NewsHandler.$newsList.append($(_clone));
        });

        if (NewsHandler.items.length) {
            if (!NewsHandler.$newsList.hasClass('show')) NewsHandler.$newsList.addClass('show');
        } else {
            if (!NewsHandler.$noResult.hasClass('show')) NewsHandler.$noResult.addClass('show');
        }
    },
    createNewsItems: function(data) {
        if (NewsHandler.createNewList) {
            NewsHandler.clearNewsList();
        }

        if (data.length < NewsHandler.pageSize) {
            //end reached, hide load more
            if (!NewsHandler.$loadmore.hasClass('hide')) NewsHandler.$loadmore.addClass('hide');
        } else {
            if (NewsHandler.$loadmore.hasClass('hide')) NewsHandler.$loadmore.removeClass('hide');
        }

        //loop thru result and create new <li> DOM elements
        $.each(data, function(i, item) {
            var _clone = NewsHandler.$newsItem.clone()[0];

            //Title
            _clone.querySelector('.title').innerHTML = item.Title;

            //Date
            var date = item.Date.split('-');
            _clone.querySelector('.day').innerHTML = date[2];
            _clone.querySelector('.month').innerHTML = date[1];
            _clone.querySelector('.year').innerHTML = date[0];

            //Summary
            var _summary = _clone.querySelector('.summary');
            if (ScreensizeHandler.isMdOrSmaller || !item.Summary) {
                _summary.parentNode.removeChild(_summary);
            } else {
                _summary.innerHTML = item.Summary;
            }

            //Link
            //_clone.querySelector('.text-link').setAttribute('href', window.location.origin + item.Link.replace('http://', ''));
            _clone.querySelector('.text-link').setAttribute('href', item.Link);

            //Background Image
            var _backgroundImage = _clone.querySelector('.background-image');

            if (ScreensizeHandler.isMdOrSmaller) {
                _backgroundImage.parentNode.removeChild(_backgroundImage);
            } else if (item.Image != 'none') {
                _backgroundImage.style.backgroundImage = item.Image.replace('"', '');
            }

            if (!NewsHandler.items.length) {
                $(_clone.querySelector('hr.minimal')).first().removeClass('hide');
            }

            NewsHandler.items.push(_clone);
            NewsHandler.$newsList.append($(_clone));
        });

        if (NewsHandler.$loadmore) {
            NewsHandler.$loadmore.height('');
            NewsHandler.$loadmore.width('');
            NewsHandler.$loadmore.removeClass('loading');
        }

        if (NewsHandler.$filter) {
            NewsHandler.$filter.removeAttr('disabled');
            NewsHandler.$filterLoader.removeClass('show');
        }

        if (NewsHandler.createNewList) {
            NewsHandler.createNewList = false;
        }

        if (NewsHandler.$newsList.hasClass('loading')) NewsHandler.$newsList.removeClass('loading');

        if (NewsHandler.items.length) {
            if (!NewsHandler.$newsList.hasClass('show')) NewsHandler.$newsList.addClass('show');
            if (NewsHandler.$noResult.hasClass('show')) NewsHandler.$noResult.removeClass('show');
        } else {
            if (NewsHandler.$newsList.hasClass('show')) NewsHandler.$newsList.removeClass('show');
            if (!NewsHandler.$noResult.hasClass('show')) NewsHandler.$noResult.addClass('show');
        }
    },
    patch: function() {
        // var newTitle = Math.random();

        // var xhr = new XMLHttpRequest();
        // xhr.open("PATCH", "http://norra.sitecore.teknikhuset.se/sitecore/api/ssc/item/4150975A-8277-4249-862C-FE68251252B4/");
        // xhr.setRequestHeader("Content-Type", "application/json");
        // xhr.onreadystatechange = function() {
        //     if (this.readyState == 4) {
        //         console.log('Status: ' + this.status + '\nHeaders:' + JSON.stringify(this.getAllResponseHeaders()) + '\nBody: ' + this.responseText);
        //     }
        // };
        // xhr.send("{ \"NewsTitle\":\"Sitecore Modified " + newTitle + "\" }");
    },
    getNews: function(handleData, year) {
        if (!year) year = -1;

        $.getJSON({
            type: 'GET',
            dataType: 'json',
            url: this.apiUrl + ((this.id == 'news') ? this.newsUrl : this.calendarUrl),
            data: {
                page: this.page,
                pageSize: this.pageSize,
                siteId: this.siteId,
                year: year
            },
            success: function(data) {
                console.log(data);
                handleData(data);
            },
            error: function(e) {
                console.log(e.message);
            }
        });

        this.page += 1; 
    }

};
//#endregion

(function() {
    if (typeof SiteId !== 'undefined') {
        if (typeof useNewsApi !== 'undefined' && useNewsApi) {
            NewsHandler.init(SiteId, 'news');
            //$(window).on('load', NewsHandler.loadNewsList());
        }
        else if (typeof useCalendarApi !== 'undefined' && useCalendarApi) {
            NewsHandler.init(SiteId, 'calendar');
            //$(window).on('load', NewsHandler.loadNewsList());
        }
        //if (typeof useNewsLatestApi !== 'undefined' && useNewsLatestApi) {
        //    NewsHandler.init(SiteId, 'news-latest');
        //    $(window).on('load', NewsHandler.loadNewsLatestList());
        //}
    }
})();
