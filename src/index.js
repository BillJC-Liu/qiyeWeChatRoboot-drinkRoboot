const schedules = require('node-schedule')
const axios = require('axios')
const _ = require('lodash')
const wx = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key="
const key = "d161497a-c3e8-4294-bcba-732acf558210"
const time = [
  { time: '6:30', value: '这个时间因为刚睡醒，喝一杯水排毒又养颜' },
  { time: '8:30', value: '这个时候想必很多人已经坐在了自己的工作岗位上。来一杯茶水来提提神，一上午都会神清气爽哦' },
  { time: '11:00', value: '工作了一上午，喝杯水放松一下，解解乏吧' },
  { time: '12:50', value: '这个时间点我相信很多人都已经吃过饭并且离吃午饭已经有20分钟的间隔了。切记不要在刚吃完饭就喝水哦' },
  { time: '15:00', value: '最困的时候，喝杯水提提神，醒醒脑吧。工作效率会更高的哦' },
  { time: '18:30', value: '快到下班吃晚饭的时间了。喝杯水消化又吸收' },
  { time: '19:00', value: '这个时间点是人体的新陈代谢时间。喝杯水排泄又解毒' },
  { time: '21:00', value: '9点以后就尽量少饮水或者不饮水了。提前两个小时饮水，可以预防血稠哦' }
];

const startSchedule = () => {
  let status = ''
  const t = schedules.scheduleJob("* * * * * *", async () => {
    const now = new Date()
    const hours = now.getHours()
    const min = now.getMinutes()
    const timeStr = `${hours}:${min}`
    let t = _.find(time, { time: timeStr })
    if (t && status !== timeStr) {
      await sendRobootMsg(t);
      status = timeStr
    }
  });
}

const sendRobootMsg = (value) => {
  let url = wx + key
  let content = {
    "msgtype": "text",
    "text": {
      "content": `现在是${t.time}，${t.value}`
    }
  }
  axios.post(
    url,
    content,
  )
}

module.exports = startSchedule;