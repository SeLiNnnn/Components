/*
 * @Author: SeLiNnnn
 * @Description: Go for my goal and go for the life I want.
 * @Date: 2019-05-23 22:59:48
 * @LastEditTime: 2019-05-23 23:00:18
 */

// 微信小程序http工具函数库
import config from "../config"
/*eslint-disable*/

// 定义get工具函数
export function get(url, data) {
  return request(url, "GET", data)
}

// post
export function post(url, data) {
  return request(url, "POST", data)
}

// 封装http请求方法
function request(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,

      success: function(res) {
        // success
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          showModal("提示", "失败")
          reject(res.data)
        }
      }
    })
  })
}

// 显示繁忙提示
export function showBusy(text) {
  wx.showToast({
    title: text,
    icon: "loading",
    duration: 10000
  })
}
// 显示成功提示图标
export function showSuccess(text) {
  wx.showToast({
    title: text,
    icon: "success"
  })
}

// 显示失败提示
export function showModal(title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false,
    fail(res) {
      console.log(res, "showModal fail")
    }
  })
}
