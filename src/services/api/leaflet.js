import axios from 'axios'

export default {
    getMedia() {
        return axios.get('/item')
            .then( response => {
                return response.data;
            })
    },

    postFeedback(payload, userid) {
        path = '/users/' + userid + '/ratings';
        return axios.post(path, payload);
    }
}