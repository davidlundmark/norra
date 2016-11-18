//#region NewsHandler
NewsHandler = {
    initilized: false,
    apiUrl: window.location.origin + '/sitecore/api/ssc/Sitecore-Foundation-SitecoreExtensions-Controls/',
    siteId: null,
    page: 1,
    pageSize: 3,
    $newsList: null,
    $newsItem: null,
    items: [],
    $loadmore: null,
    init: function(SiteId) {
        this.siteId = SiteId;
        this.initilized = true;

        //get DOM template elements
        this.$newsList = $(document.getElementById('news-list-template'));
        this.$newsItem = $(document.getElementById('news-item-template'));

        //remove ID's
        this.$newsList.removeAttr('id');
        this.$newsItem.removeAttr('id');

        //remoe from DOM
        this.$newsItem.remove();

        //load more button
        var _loadmore = document.querySelector('.load-more');
        if (_loadmore !== null) {
            this.$loadmore = $(_loadmore);
            this.$loadmore.on('click', function(e) {
                this.getNews(this.createNewsItems);
                return false;
            }.bind(this));
        }
    },
    onload: function() {
        if (!this.initilized) return;
        //get news
        this.getNews(this.createNewsItems);
    },
    createNewsItems: function(data) {
        if (!NewsHandler.items.length) {
            NewsHandler.$newsList.removeClass('hide');
        }
        if (data.length < NewsHandler.pageSize) {
            //end reached
            NewsHandler.$loadmore.addClass('visibility-hidden');
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
            _clone.querySelector('.summary').innerHTML = item.Summary;

            //Summary
            _clone.querySelector('.card-link').setAttribute('href', window.location.origin + item.Link.replace('http://', ''));

            //Background Image
            _clone.querySelector('.background-image').style.backgroundImage = item.Image.replace('"', '');

            if (!NewsHandler.items.length) {
                $(_clone.querySelector('hr.minimal')).first().removeClass('hide');
            }

            NewsHandler.items.push(_clone);

            NewsHandler.$newsList.append($(_clone));
        });
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
    getNews: function(handleData) {
        if (!this.initilized) return;

        var $this = $(this);

        $.getJSON({
            type: 'GET',
            dataType: 'json',
            url: this.apiUrl + 'News/1337/GetPaged',
            data: {
                page: this.page,
                pageSize: this.pageSize,
                siteId: this.siteId
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
    } else {
        console.log('Variable SiteId or useNewsApi is undefined!');
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
