import axios from 'axios';

function upData(path, userForm) {
    const params = new FormData();
    for (let i in userForm) {
        params.append(i, userForm[i]);
    }
    return axios.post(path, params, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export default upData;
