
const remind_that_day = (remind_date, remind_repeat, date) => {
  //每天
  if (remind_repeat == -1) {
    return true;
  }
  //不重复
  if (remind_repeat == 0) {
    let d = new Date(remind_date);
    if (d.getFullYear() == date.getFullYear() && d.getMonth() == date.getMonth() && d.getDate() == date.getDate()) {
      return true;
    }
    return false;
  }
  //周一 ~ 周日单独设置
  if (remind_repeat >= 1 && remind_repeat <= 7) {
    if (remind_repeat % 7 == date.getDay()) {
      return true;
    }
    return false;
  }
  //周一到周五
  if (remind_repeat == 8) {
    if (date.getDay() >= 1 && date.getDay() <= 5) {
      return true;
    }
    return false;
  }
  //周六周日
  if (remind_repeat == 9) {
    if (date.getDay() == 0 || date.getDay() == 6) {
      return true;
    }
    return false;
  }
  //每月该天
  if (remind_repeat == 10) {
    if (Number(remind_date.slice(-2)) == date.getDate()) {
      return true;
    }
    return false;
  }
  //每年该天
  if (remind_repeat == 11) {
    if (Number(remind_date.slice(5, 6)) == date.getMonth() + 1 && Number(remind_date.slice(-2)) == date.getDate()) {
      return true
    }
  }
  return false;
}


//今天
const remind_today = (remind_date, remind_repeat) => {
  let now = new Date();
  return remind_that_day(remind_date, remind_repeat, now);
}

//本周内
const remind_this_week = (remind_date, remind_repeat) => {
  let now = new Date();
  let week = now.getDay();
  if (week == 0) {
    week = 7;
  }
  for (let index = 0; index <= 7 - week; index++) {
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + index);
    if (remind_that_day(remind_date, remind_repeat, date)) {
      return true;
    }
  }
  return false;
}


//一周内
const remind_in_a_week = (remind_date, remind_repeat) => {
  let now = new Date();
  for (let index = 0; index < 7; index++) {
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + index);
    if (remind_that_day(remind_date, remind_repeat, date)) {
      return true;
    }
  }
  return false;
}

//本月
const remind_this_month = (remind_date, remind_repeat) => {
  let date = new Date();
  let start = date.getDate();
  let end_day = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  let end = end_day.getDate();
  for (let index = start; index <= end; index++) {
    date.setDate(index);
    if (remind_that_day(remind_date, remind_repeat, date)) {
      return true
    }
  }
  return false;
}

//一个月内
const remind_in_a_month = (remind_date, remind_repeat) => {
  let now = new Date();
  for (let index = 0; index <= 30; index++) {
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + index);
    if (remind_that_day(remind_date, remind_repeat, date)) {
      return true;
    }
  }
  return false;
}

//三个月内
const remind_in_three_month = (remind_date, remind_repeat) => {
  let now = new Date();
  for (let index = 0; index <= 90; index++) {
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + index);
    if (remind_that_day(remind_date, remind_repeat, date)) {
      return true;
    }
  }
  return false;
}

//半年内
const remind_in_half_a_year = (remind_date, remind_repeat) => {
  let now = new Date();
  for (let index = 0; index <= 180; index++) {
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + index);
    if (remind_that_day(remind_date, remind_repeat, date)) {
      return true;
    }
  }
  return false;
}

//今年内
const remind_this_year = (remind_date, remind_repeat) => {
  let now = new Date();
  for (let index = 0; index <= 365; index++) {
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + index);
    if (date.getFullYear() != now.getFullYear()) {
      break;
    }
    if (remind_that_day(remind_date, remind_repeat, date)) {
      return true;
    }
  }
  return false;
}

//一年内
const remind_in_a_year = (remind_date, remind_repeat) => {
  let now = new Date();
  for (let index = 0; index <= 365; index++) {
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + index);
    if (remind_that_day(remind_date, remind_repeat, date)) {
      return true;
    }
  }
  return false;
}

//remind_date, remind_repeat
const cpt = (list) => {
  let nums = {
    today: 0,
    thisWeek: 0,
    inAWeek: 0,
    thisMonth: 0,
    inAMonth: 0,
    inThreeMonth: 0,
    inHalfAYear: 0,
    thisYear: 0,
    inAYear: 0
  }
  list.forEach(e => {
    if (!e.deleted && !e.done && e.set_remind) {
      if (remind_today(e.remind_date, e.remind_repeat)) {
        nums.today++;
      }
      if (remind_this_week(e.remind_date, e.remind_repeat)) {
        nums.thisWeek++;
      }
      if (remind_in_a_week(e.remind_date, e.remind_repeat)) {
        nums.inAWeek++;
      }
      if (remind_this_month(e.remind_date, e.remind_repeat)) {
        nums.thisMonth++;
      }
      if (remind_in_a_month(e.remind_date, e.remind_repeat)) {
        nums.inAMonth++;
      }
      if (remind_in_three_month(e.remind_date, e.remind_repeat)) {
        nums.inThreeMonth++;
      }
      if (remind_in_half_a_year(e.remind_date, e.remind_repeat)) {
        nums.inHalfAYear++;
      }
      if (remind_this_year(e.remind_date, e.remind_repeat)) {
        nums.thisYear++;
      }
      if (remind_in_a_year(e.remind_date, e.remind_repeat)) {
        nums.inAYear++;
      }
    }
  });
  return nums;
}


export default cpt;