import BScroll from 'better-scroll'
const handler = (e) => {
  e.preventDefault()
}
export const roll = {
  componentUpdated(el, binding) {
    if (binding.value instanceof Array) {
      const visible = binding.value.some(e => e); // 当视图所有控制弹层的变量存在一个是true，即可阻止touchmove事件
      if (visible) {
        document.getElementsByTagName('body')[0].addEventListener('touchmove', handler, { passive: false });

        let scroll = new BScroll(el, {
          scrollY: true,
          click: true,
          bounce: false,
          mouseWheel: true
        })
      } else {
        document.getElementsByTagName('body')[0].removeEventListener('touchmove', handler, { passive: false });
      }
    } else if (typeof binding.value === 'boolean') {
      if (binding.value) {
        document.getElementsByTagName('body')[0].addEventListener('touchmove', handler, { passive: false });
        let scroll = new BScroll(el, {
          scrollY: true,
          click: true,
          bounce: false,
          mouseWheel: true
        })
      } else {
        document.getElementsByTagName('body')[0].removeEventListener('touchmove', handler, { passive: false });
      }
    }
  }
}