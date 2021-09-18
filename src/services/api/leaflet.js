import axios from 'axios'

export default {
    getMedia() {
        return axios.get('https://api.lib.byu.edu/leaflet/item')
            .then( response => {
                return response.data;
            })
    },

    postFeedback(payload, userid) {
        var path = 'https://api.lib.byu.edu/leaflet/users/' + userid + '/ratings';
        return axios.post(path, payload);
    }
}