import {newsStorage} from "../model/newsStorage";

export async function fetchNewsData(category) {
    fetch(`http://api.mediastack.com/v1/news?access_key=a116d29292351eb4af3343caa85d9bb3&categories=${category}&sources=en`)
        .then((response) => response.json())
        .then((json) => {
            newsStorage.setPendingNews(false);
            newsStorage.setNews(category, json.data);
        })
        .catch((error) => {
            console.error(error);
        });
}


