
import {observable, action, computed, makeObservable} from 'mobx';


class NewsStorage {
    @observable
    news = [];
    @observable
    pendingNews;
    @observable
    favorites = [];
    @observable
    pendingFavorites = false;
    @observable
    isLogin = false;


    constructor() {
        makeObservable(this);
    }

    @action
    setNews = (category, news) => {
        this.news[category] = news;
    };
    @action
    getNews = (category) =>{
        return this.news[category] || [] ;
    };
    @action
    setPendingNews = (val) => {
        this.pendingNews = val;
    };
    @action
     fetchNewsData = (category) => {
        fetch(`http://api.mediastack.com/v1/news?access_key=a116d29292351eb4af3343caa85d9bb3&categories=${category}&languages=en`)
        .then((response) => response.json())
        .then((json) => {
            this.news[category] = json.data;
            this.pendingNews=false;
        })
        .catch((error) => {
            console.error(error);
        });
    };

    @action
    addFavorite = (fav) => {
        const index = this.favorites.findIndex((item) => item.title === fav.title);
        if (index === -1)
             this.favorites.push(fav);
    };
    @action
    checkFavorite = (fav) => {
        const index = this.favorites.findIndex((item) => item.title === fav.title);
        console.log("find fav = "+fav.title+ " , "+index);
        return index !== -1;

    };

    @action
    removeFavorite = (fav) => {
        const index = this.favorites.findIndex((item) => item.title === fav.title);
        if (index > -1)
            this.favorites.splice(index,1);
    };
    @action
    setLogin = (val) => {
        this.isLogin = val;
    }
}

export const newsStorage = new NewsStorage();
