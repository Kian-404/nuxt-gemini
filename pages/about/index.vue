<template>
  <div class="about">
    <div class="card" @click="addAnimation" :class="className ? 'animationClass' : ''">
      <SvgItemSvgIcon class="item item1"></SvgItemSvgIcon>
      <SvgItemSvgIcon class="item item2"></SvgItemSvgIcon>
      {{ answer }}
    </div>
  </div>
</template>

<script setup lang="ts">
let answerList = [
  "别失望",
  "不必为你无法控制的事情担心",
  "不要忘记微笑",
  "阳光",
  "挥手道别",
  "你失去的某一天会以不同的方式归还于你",
  "你的状态很不对",
  "这是个麻烦",
  "或许需要突破",
  "放弃",
  "你唯一能做就是把握现在",
  "学会珍惜",
  "改变心情",
  "一直走下去",
  "优秀",
  "坚持不懈的努力",
  "不适合",
  "愉快生活",
  "终点",
  "换一个方向",
  "岁月静好",
  "放轻松这很简单",
  "早点儿开始",
  "不要后悔",
  "也许会迟到",
  "沉默",
  "好像平凡了点",
  "糊涂一点更好",
  "善待自己",
  "放手",
  "呼吸一下新鲜空气",
  "没有答案",
  "感恩，运气会越来越好",
  "原谅",
  "自我欣赏",
  "复杂的事情简单做",
  "学会自己保护自己",
  "奇迹",
  "给自己一个肯定",
  "甜",
  "摆正心态",
  "种下满足，收获幸福",
  "把握现在",
  "学会好奇",
  "最美丽的一天",
  "彼岸",
  "停止",
  "坚强",
  "永恒",
  "常常是最后一把钥匙打开了神殿门",
  "不要刻意隐藏",
  "停止悲伤",
  "不要刻意压抑",
  "背不动的就放下",
  "不要怕",
  "安静",
  "想念",
  "促足静立",
  "活下去",
  "去爱",
  "回家",
  "未解之谜",
  "相遇",
  "陌生人",
  "告别",
  "本能",
  "取暖",
  "重逢",
  "不要去忘记",
  "自信起来吧",
  "爱",
  "接受那些消失的",
  "到此为止",
  "一步之遥",
  "保存",
  "虚无的关系",
  "时间有限",
  "迷失的世界",
  "慢下来",
  "可怕",
  "了不起",
  "一个正在到来的晴天",
  "好天气",
  "旧梦",
  "挽留",
  "逆水行舟",
  "被排挤",
  "可以期待的未来",
  "平平安安",
  "挥别错的",
  "朴素",
  "成为了事实",
  "萌芽",
  "有一些重要的事",
  "让你泪流满脸的",
  "不知所措",
  "给人依赖",
  "对未知前途的期盼",
  "用平淡的心态去追求",
  "一切皆有可能",
  "控制自己的情绪",
  "一切顺其自然",
  "一条没有鲜花的道路",
  "得不到别人的认同",
  "暂且不要判断",
  "不要一成不变",
  "学会认错",
  "你祈求的一切顺利",
  "享受全心全意的付出",
  "站在最重要的地方",
  "捕风捉影",
  "欢天喜地",
  "轮回",
  "你无法继续沉睡",
  "得到了多数支持",
  "十分好的预感",
  "背叛",
  "盛开",
  "学会改变什么",
  "最划算的交换",
  "退后一厘米",
  "这真是一个奇怪的问题",
  "用力活着",
  "成长",
  "最好的事情正要发生",
  "没有什么是对的",
  "堕落",
  "多余",
  "必须努力奔跑起来",
  "会有人陪着你",
  "驾驭",
  "站起来去奋斗",
  "不要看轻别人",
  "对读一本书",
  "下一页才是你人生的答案",
  "出发",
  "差不多得了",
  "不要给人添麻烦",
  "一个人细水长流",
  "左边",
  "有人浪费你的时间",
  "最后什么都没改变",
  "对，去吧",
  "扔掉这些东西",
  "有些人开始慌乱",
  "找回自己",
  "重生",
  "慢些，我们会更快",
  "一个人的朝圣",
  "孤单",
  "下一个天亮",
  "独角戏",
  "平凡之路",
  "直面残酷",
  "泡沫",
  "你大概会受伤点",
  "远行",
  "一直在找什么",
  "回头看看",
  "唤醒沉睡的你",
  "也许会有好转",
  "烦恼快要消失",
  "一无所有",
  "显得有点唐突",
  "迷人的危险",
  "结束倒计时",
  "第二次被伤害的机会",
  "并不会让你高兴",
  "没什么放不下",
  "等待",
  "永远不会愈合的伤口",
  "骗不了自己",
  "悄悄躲开",
  "一场完美的悲剧",
  "寻寻觅觅",
  "不要做出任何决定",
  "开心的肯定",
  "浪费光阴",
  "保密",
  "被唾弃的决定",
  "停止向前",
  "有点儿意思",
  "谢谢",
  "再也不见",
  "完美时刻",
  "会让你痛苦的",
  "僵持不下",
  "必不可少",
  "对不起",
  "试着慷慨一点",
  "这不是能犹豫的事",
  "同意",
  "试着安静一会儿",
  "默默去闻",
  "虚空",
  "戒掉过分的急躁",
  "你要隐藏起来",
  "其实大家都知道",
  "会被一直依赖的",
  "全部给他",
  "坚持了不该坚持的",
  "你好像舍不得",
  "有点儿心疼",
  "轻而易举的伤害",
  "卑微的等待",
  "你有必要傻一点",
  "一成不变",
  "你会忘记它",
  "禁言",
  "只是一场梦",
  "你要勇敢的离开",
  "拼凑不了昨天",
  "容易被超控",
  "尽你最大的能力",
  "去忘记",
  "大家好像都不认同",
  "认真起来",
  "值得去做的事",
  "是",
  "白日梦",
  "转个身忘记吧",
  "你可能会比较悲伤",
  "这绝对是个好主意",
  "好的指引",
  "不是",
];
let answer = ref("点击获取答案");
let answerIndex = ref(0);

const getAnswer = () => {
  answerIndex.value = Math.floor(Math.random() * answerList.length);
  answer.value = answerList[answerIndex.value];
};
let className = ref(false);
const addAnimation = () => {
  answer.value = "";

  className.value = !className.value;
  if (className.value) {
    // className.value = false;
    setTimeout(() => {
      className.value = false;
      getAnswer();
    }, 4000);
  }
};
</script>

<style scoped lang="less">
.about {
  font-family: "Josefin Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  text-shadow: 4px 4px 4px #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 48px);
  .card {
    position: relative;
    cursor: pointer;
    width: 300px;
    height: 500px;
    box-shadow: 0px 0px 20px 0px #555;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
    .item {
      width: 50%;
      height: 10%;
      transition: all 0.5s;
      &:hover{
        transform: scale(1.1);
        transition: all 0.5s;
      }
      &.item1 {
        position: absolute;
        top: 10px;
      }
      &.item2 {
        position: absolute;
        bottom: 10px;
        transition: all 0.5s;
      }
    }
  }
}

@keyframes rotateCard {
  0% {
    transform: rotateY(0deg);
  }
  25% {
    transform: rotateY(360deg);
  }
  50% {
    transform: rotateY(0deg);
  }
  75% {
    transform: rotateY(290deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
.animationClass {
  animation: rotateCard 4s ease-in-out 1;
}
</style>
