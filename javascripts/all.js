'use strict';

var query_params = {
  client_id: 'ec785a206765320f86b119cf1401678cfefc9077c0edc73d7ed5b8e1e18b6e09',
  access_token: '5729baa9cef525e8d90fb6758dd1d890ef984a157c0687c6ad9b352ec978b72f',
  redirect_uri: 'http://codepen.io/'
};

var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
}

function safe_tags_replace(str) {
    return str.replace(/[&<>]/g, replaceTag);
}


function parseString(string) {
  var string = string;
  var newString = string.replace(/^(?=.*>)[^<]+$/g, '&lt;');

  return safe_tags_replace(newString);
}

function displayArray(object) {
  let array = [];
  let tpl = '';
  object.forEach( (e, s) => {
    array.push({name:e.name, url: e.profile_url ? e.profile_url : `http://producthunt.com/topics/${e.slug}`});
  })

  array.forEach( (e, s) => {
    tpl += `<a href="${e.url}">${e.name}</a>`
  });

  return tpl;
}

$.ajax({
  url: 'https://api.producthunt.com/v1/collections/152079',
  type: 'GET',
  data: query_params,
  crossDomain: true,
  dataType: 'JSON',
  success: function success(data) {
    console.log(data);



    data.collection.posts.forEach( (e, s) => {
      let template = `
<div class="card">
  <span class="post-votes">${e.votes_count}</span>
  <figure><img src="${e.thumbnail.image_url}"></figure>
  <div class="post__title">
    <h3>${e.name}</h3>
  </div>
  <div class="post__description">
    <p>${parseString(e.tagline)}</p>
  </div>
  <div class="post__makers">
    ${displayArray(e.makers)}
  </div>
  <div class="post__infos">
    <span class="post-comments">${e.comments_count} &#128172;</span> |
    <span class="post-topics">${displayArray(e.topics)}</span>
  </div>
  <div class="post__footer">
    <a href="${e.discussion_url}" class="button">See on Product-Hunt</a>
  </div>

</div>`;

        document.querySelector('#showcase').innerHTML += template
    })
  },
  error: function error() {
    console.log('Failed!');
  }
});
