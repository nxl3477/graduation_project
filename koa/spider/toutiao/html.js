

/**
 * 解析头条类型标签
 * @returns
 */
exports.fontTypeScript = () => {
  var $ = window.$
  var baseUrl = window.location.href
  var typesList = $('.top_menu_list').find('.btn')
  var list = []
  $(typesList).each((index, item) => {
    var type_name = $(item).text()
    var article = `${baseUrl}?${$(item).attr('data-query')}`
    list.push({
      type_name,
      article
    })
  })
  return list
}


/**
 *
 * 西瓜视频类型解析
 * @returns
 */
exports.videoTypeScript = () => {
  var $ = window.$
  var baseUrl = window.location.href
  var typesList = $('.top_menu_list').find('.btn')
  var lists = []
  $(typesList).each( (index, item) => {
    var type_name = $(item).text()
    var video = `${baseUrl}?${$(item).attr('data-query')}`
    lists.push({
      type_name,
      video
    })
  })
  return lists
}






/**
 * 文字类列表信息解析
 *
 * @returns
 */
exports.fontListsScript = async () => {
  var sleep = (time) => new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve(true)
    }, time)
  })


  var $ = window.$
  var infoList = []
  for ( var i = 0; i < 5; i++) {
    var bodyHeight = document.body.scrollHeight;
    window.scrollTo(0, bodyHeight);
    window.dispatchEvent( new Event('DOMMouseScroll'))
    await sleep(3000)
  }

  var lists = $('.list_content').find('.has_action')

  $(lists).each( (index, item) => {
    var title = $(item).find('.dotdot').text().trim()
    var img_holder = $(item).find('.list_img_holder').map( (pos, img) => $(img).find('img').attr('src')).get().join(',')
    var auther = $(item).find('.src').text().trim()
    var com_number = $(item).find('.cmt').text().replace('评论 ', '')
    var group_id = $(item).attr('data-group-id').trim()
    var item_id = $(item).attr('data-item-id').trim()
    var create_time = Math.round(new Date().getTime()/1000) 

    infoList.push({
      title,
      auther,
      com_number,
      img_holder,
      group_id,
      item_id,
      create_time
    })
  })

  return infoList
}





/**
 * 视频类列表信息解析
 *
 */
exports.videoListsScript = async () => {
  var sleep = (time) => new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve(true)
    }, time)
  })

  var $ = window.$
  var infoList = []
  
  for ( var i = 0; i < 20; i++) {
    var bodyHeight = document.body.scrollHeight;
    var pos = 0
    var crit = 500
    var diff = () => bodyHeight - crit 
    while( pos < diff() ){
      pos += (bodyHeight - pos) / 3
      if( pos > diff() ) pos = bodyHeight
      await sleep(500)
      window.scrollTo(0,  pos );
    }
    await sleep(1000)
  }
  

  var lis = $('.list_content').find('.has_action')
  $(lis).each( (index, item) => {
    var info = $(item).find('.item_info')
    var img_holder = $(item).find('img').attr('src')
    var title = $(item).find( '.dotdot').text().trim()
    var auther = $(info).find('.src').text().trim()
    var com_number = $(info).find('.cmt').text().replace('评论 ', '')
    var group_id = $(item).attr('data-group-id')
    var item_id = $(item).attr('data-item-id')
    var create_time = Math.round(new Date().getTime()/1000) 

    if(img_holder) {
      infoList.push({
        title,
        img_holder,
        auther,
        com_number,
        group_id,
        item_id,
        create_time
      })
    }
    
  })
  return infoList
}









/**
 * 文字类处理内容页的html 解析
 *
 * @returns
 */
exports.fontDetailScript = async () => {
  var $ = window.$
  var sleep = (time) => new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve(true)
    }, time)
  })
  $('.unflod-field__mask').click()
  await sleep(1500)
  var wrap = $('.article')

  var title = $(wrap).find('.article__header .article__title').text()
  var avatar = $(wrap).find('.article__header img').attr('src')
  var auther = $(wrap).find('.article__header .author-name').text()
  var create_time = $(wrap).find('.article-info .new-style-test-article-publish-time').text()
  var com_number = $(wrap).find('.article-info .new-style-test-article-comment').text().replace('评论', '')
  var body = $(wrap).find('.article__content').html()

  return { title, avatar, auther, body, create_time,  com_number }
}


/**
 *  解析视频类详情页
 *
 * @returns
 */
exports.videoDetailScript = () => {
  var $ = window.$
  
  var wrap = $('.container')
  var title = $(wrap).find('.abstract .title').text()
  var soure = $(wrap).find('.player-wrap video').attr('src')
  var digg = $(wrap).find('.share .digg').text().replace(/[^0-9]/g, '')
  var bury = $(wrap).find('.share .bury').text().replace(/[^0-9]/g, '')
  var avatar = $(wrap).find('.info .avatar img').attr('src')
  var auther = $(wrap).find('.info .name').text()
  // var open_times = $(wrap).find('.info .sum em').text()
  return {
    title,
    soure,
    digg,
    bury,
    avatar,
    auther
    // open_times
  }
}
