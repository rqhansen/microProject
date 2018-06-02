const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 上滑的偏移动画
 */
const toslideUp = () =>{
  let animation = wx.createAnimation({
    duration: 1500,
    timingFunction: 'ease',
    delay: 0
  })
  animation.translateY(-15).step();
  animation.translateY(0).step();
  return animation;
}
module.exports = {
  formatTime: formatTime,
  toslideUp: toslideUp
}
