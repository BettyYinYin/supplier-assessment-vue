import router from '@/router'
import * as dd from "dingtalk-jsapi";

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')
    .replace(/\+/g, ' ') +
    '"}'
  )
}

export function setRight() {
  if (dd.version) {
    dd.ready(() => {
      dd.biz.navigation.setRight({
        show: true, //控制按钮显示， true 显示， false 隐藏， 默认true
        control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
        text: '更多', //控制显示文本，空字符串表示显示默认文本
        onSuccess: function (result) {
          //如果control为true，则onSuccess将在发生按钮点击事件被回调
          /*
          {}
          */
          dd.ready(() => {
            dd.device.notification.actionSheet({
              // title: "谁是最棒哒？", //标题
              cancelButton: '取消', //取消按钮文本
              otherButtons: ["版本日志", "帮助中心"],
              onSuccess: function (result) {
                //onSuccess将在点击button之后回调
                /*{
                    buttonIndex: 0 //被点击按钮的索引值，Number，从0开始, 取消按钮为-1
                }*/
                if (result.buttonIndex === 0) {
                  router.push({
                    path: '/version'
                  })
                } else if (result.buttonIndex === 1) {
                  router.push({
                    path: '/help'
                  })
                }
              },
              onFail: function (err) {}
            })
          })
        },
        onFail: function (err) {}
      });
    })
  }
}

export function setTitle(title) {
  if (dd.version) {
    dd.ready(function () {
      dd.biz.navigation.setTitle({
        title: title, //控制标题文本，空字符串表示显示默认文本
        onSuccess: function (result) {},
        onFail: function (err) {}
      });
    });
  }
}


export function chosen(source, onSuccess) {
  if(dd.version){
    dd.ready(function () {
      dd.biz.util.chosen({
        // source:[{
        //     key: '选项1', //显示文本
        //     value: '123' //值，
        // },{
        //     key: '选项2',
        //     value: '234'
        // }],
        source,
        selectedKey: '', // 默认选中的key
        onSuccess
        //  onSuccess : function(result) {
        //   //onSuccess将在点击完成之后回调
        //       /*
        //       {
        //           key: '选项2',
        //           value: '234'
        //       }
        //       */
  
        //   },
      })
    })
  }
  

}