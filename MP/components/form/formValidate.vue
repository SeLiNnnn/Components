<!--
 * @Author: SeLiNnnn
 * @Description: Go for my goal and go for the life I want.
 * @Date: 2019-05-23 22:59:21
 * @LastEditTime: 2019-05-23 23:10:03
 -->

<template>
  <div class="form">
    <form @submit="checkForm">
      <van-cell-group>
        <van-radio-group
          :value="form.type"
          @change="changeType"
          name="type"
        >
          <van-cell
            title="选项1"
            clickable
          >
            <van-radio
              checked-color="#07c160"
              name="0"
            />
          </van-cell>
          <van-cell
            title="选项2"
            clickable
          >
            <van-radio
              checked-color="#07c160"
              name="1"
            />
          </van-cell>
        </van-radio-group>
        <van-field
          :value="form.name"
          label="姓名"
          placeholder="姓名"
          name="name"
        />

      </van-cell-group>

      <div class="btn-area">
        <button form-type="submit">提交</button>
      </div>
    </form>
  </div>

</template>

<script>
import WxValidate from './WxValidate.js'

export default {
  onLoad: function() {
    this.initValidate()
  },
  data() {
    return {
      //绑定表单值
      form: {
        type: '0',
        name: ''
      },
      // 验证规则
      rules: {
        name: {
          required: true,
          minlength: 2
        }
      },
      // 验证错误提示
      messages: {
        name: {
          required: '姓名不能为空',
          minlength: '姓名不少于2个字符'
        }
      }
    }
  },
  methods: {
    changeType(e) {
      //切换单选
      this.form.type = e.mp.detail
    },
    // 1 check init 初始化验证方法
    initValidate() {
      this.WxValidate = new WxValidate(this.rules, this.messages)
    },
    // 2check form 验证表单数据
    checkForm(e) {
      const formDetail = e.mp.detail.value
      console.log(e.mp.detail.value, '验证表单,携带数据')

      // 传入表单数据 调用验证方法
      if (this.WxValidate.checkForm(formDetail)) {
        let formJson = formDetail
        delete formJson[0]
        delete formJson[1]
        this.submitForm(formJson) // 全部验证通过才提交
      } else {
        const error = this.WxValidate.errorList[0].msg
        console.log(this.WxValidate.errorList)
        showModal(error)
      }
    },
    // 3submit form 提交表单 调用接口
    async submitForm(data) {
      // write your axios code below...
      this.form = {
        type: '0',
        name: ''
      }
      this.$forceUpdate() //清空表单数据
      console.log('clear form')
    }
  }
}
</script>

<style>
.btn-area {
  margin: 30rpx;
  width: 690rpx;
}
.btn-area button {
  background-color: #86c166;
  color: #fff;
  font-size: 14px;
  border-radius: 10rpx;
}
</style>


