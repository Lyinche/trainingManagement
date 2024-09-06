import moment from 'moment/moment';
import 'moment/locale/zh-cn';
// 设置中文语言
moment.locale('zh-cn');

// 格式化时间
const formatTime = {
    getTime: data => {
        return moment(data).format('llll');
    },
};

export default formatTime;
