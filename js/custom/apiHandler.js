//#region NewsHandler
NewsHandler = {
    initilized: false,
    apiUrl: window.location.origin + '/sitecore/api/ssc/norra/',
    newsUrl: 'News/1337/GetNews',
    siteId: null,
    page: 1,
    pageSize: 3,
    $newsList: null,
    $newsItem: null,
    items: [],
    $loadmore: null,
    loading: false,
    $filter: null,
    init: function(SiteId) {
        this.siteId = SiteId;
        this.initilized = true;

        //get DOM template elements
        this.$newsList = $(document.getElementById('news-list-template'));
        this.$newsItem = $(document.getElementById('news-item-template'));

        //remove ID's
        this.$newsList.removeAttr('id');
        this.$newsItem.removeAttr('id');

        //hide list
        this.$newsList.hide();

        //remoe from DOM
        this.$newsItem.remove();

        //load more button
        var _loadmore = document.querySelector('.load-more');
        if (_loadmore !== null) {
            this.$loadmore = $(_loadmore);
            this.$loadmore.on('click', function(e) {
                if (this.loading) return false;
                this.loading = true;

                this.$loadmore.height(this.$loadmore.height());
                this.$loadmore.width(this.$loadmore.width());

                $(_loadmore.querySelector('.text')).addClass('hide');
                $(_loadmore.querySelector('.loader')).removeClass('hide');

                this.getNews(this.createNewsItems);
                return false;
            }.bind(this));
        }

        //load more button
        var _filter = document.getElementById('select_year');
        var $this = $(this);
        if (_filter !== null) {
            this.$filter = $(_filter);
            this.$filter.on('change', function(e) {
                console.log('Selected year: ' + this.value);
                var year = (this.value == 'All') ? -1 : this.value;
                NewsHandler.clearNewsList();
                NewsHandler.getNews(NewsHandler.createNewsItems, year);
                return false;
            });
        }
    },
    onload: function() {
        if (!this.initilized) return;
        //get news
        this.getNews(this.createNewsItems);
    },
    clearNewsList: function() {
        NewsHandler.page = 1;
        $.each(NewsHandler.items, function(i, item) {
            item.parentNode.removeChild(item);
        });
        NewsHandler.items = [];
    },
    createNewsItems: function(data) {
        var fadeIn = false;
        if (!NewsHandler.items.length) {
            fadeIn = true;
            NewsHandler.$newsList.removeClass('hide');
        }
        if (data.length < NewsHandler.pageSize) {
            //end reached
            NewsHandler.$loadmore.addClass('hide');
        } else {
            NewsHandler.$loadmore.removeClass('hide');
        }
        $.each(data, function(i, item) {
            var _clone = NewsHandler.$newsItem.clone()[0];

            //Title
            _clone.querySelector('.title').innerHTML = item.Title;

            //Date
            var date = item.Date.split('-');
            _clone.querySelector('.day').innerHTML = date[0];
            _clone.querySelector('.month').innerHTML = date[1];
            _clone.querySelector('.year').innerHTML = date[2];

            //Summary
            var _summary = _clone.querySelector('.summary');
            if (ScreensizeHandler.isMdOrSmaller || !item.Summary) {
                _summary.parentNode.removeChild(_summary);
            } else {
                _summary.innerHTML = item.Summary;
            }


            //Link
            _clone.querySelector('.text-link').setAttribute('href', window.location.origin + item.Link.replace('http://', ''));

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

        $(NewsHandler.$loadmore[0].querySelector('.text')).removeClass('hide');
        $(NewsHandler.$loadmore[0].querySelector('.loader')).addClass('hide');
        NewsHandler.$loadmore.height('auto');
        NewsHandler.$loadmore.width('auto');
        NewsHandler.loading = false;

        if (fadeIn) {
            NewsHandler.$newsList.hide();
            NewsHandler.$newsList.fadeIn(600);
        }
    },
    patch: function() {
        var newTitle = Math.random();

        var xhr = new XMLHttpRequest();
        xhr.open("PATCH", "http://norra.sitecore.teknikhuset.se/sitecore/api/ssc/item/4150975A-8277-4249-862C-FE68251252B4/");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                console.log('Status: ' + this.status + '\nHeaders:' + JSON.stringify(this.getAllResponseHeaders()) + '\nBody: ' + this.responseText);
            }
        };
        xhr.send("{ \"NewsTitle\":\"Sitecore Modified " + newTitle + "\" }");
    },
    getNews: function(handleData, year = -1) {
        if (!this.initilized) return;

        var $this = $(this);

        $.getJSON({
            type: 'GET',
            dataType: 'json',
            url: this.apiUrl + this.newsUrl,
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
    if (typeof SiteId !== 'undefined' && typeof useNewsApi !== 'undefined' && useNewsApi) {
        NewsHandler.init(SiteId);
    }
})();

$(window).on("load", function() {
    NewsHandler.onload();
});

$(document).keydown(function(e) {
    //console.log('CTRL + m = get childrens')
    if (e.ctrlKey && e.keyCode == 77) {
        //ApiHandler.getNews(1, 1);
    }

    //console.log('CTRL + n = modifi')
    if (e.ctrlKey && e.keyCode == 188) {
        // $.ajax({
        //     type: 'PATCH',
        //     url: 'http://norra.sitecore.teknikhuset.se/sitecore/api/ssc/item/4150975A-8277-4249-862C-FE68251252B4',
        //     data: { NewsTitle: 'Lorem ipsum' },
        //     success: function(data) {
        //         console.log(data);
        //     }
        // });

        //ApiHandler.patch();
    }
});
