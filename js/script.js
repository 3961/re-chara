$(function(){

  'use strict';

  var btnSwitch = $('.btn-switch');
  var btnCheck = $('.btn-check');
  var btnSubmit = $('.btn-submit');

  var str;
  var $outputCode;

  //いったん確認
  btnCheck.on('click', function(){

    $(this).addClass('is-on');

    getCode();
    $outputCode = $('#output-code');

    //タグは変換しない
    var tagDefault = (function(){
        var _character = {
            '&lt;': '<',
            '&gt;': '>',
            //&で変換してしまったタグの修正
            '&amp;lt;': '<',
            '&amp;gt;': '>'
        };
        return function(t) {
            return t.replace(/&lt;/g, function(c) {
              return _character[c];
            }).replace(/&gt;/g, function(c) {
              return _character[c];
            }).replace(/<br> /g, '\n ');
        };
    })();

    //
    str = $outputCode.html();
    $outputCode.text(tagDefault(str));
    // $outputCode.wrapInner('<pre />');

    var letterArr = ["～", "‘", "㎡", "\'"];
    var i = letterArr.length;

    str = str.replace(/^<[^>]*>|<[^>]*>$/g, ''); // 余計な文字列は削っておく

    while (i--) {
      if (str.indexOf(letterArr[i]) !== -1) {
          $outputCode.html(str
            .replace(/〜/g, "<span class=\"choice\">〜</span>")
            .replace(/‘/g, "<span class=\"choice\">‘</span>")
            .replace(/㎡/g, "<span class=\"choice\">㎡</span>")
            .replace(/\'/g, "<span class=\"choice\">\'</span>")
            // .replace(/&/g, "<span class=\"choice\">&</span>") //要確認。。
          );
        break;
      }
    }

  });

  btnSubmit.on('click', function(){
    //確認してほしいから
    if( !$('.btn-check').hasClass('is-on') ){
      alert("いったん確認して");
    }
    else{

      getCode();
      $outputCode = $('#output-code');

      var entityify = (function(){
          var _character = {
              '〜': '&#12316;',
              '‘': '&lsquo;',
              '&': '&amp;',
              '㎡': '&#13217;',
              '\'': '&#39;',
              //&で変換してしまったタグの修正
              '&amp;lt;': '<',
              '&amp;gt;': '>'
          };
          return function(t) {
              return t.replace(/[〜‘'&㎡]/g, function(c) {
                  return _character[c];
              }).replace(/&amp;lt;/g, function(c) {
                return _character[c];
              }).replace(/&amp;gt;/g, function(c) {
                return _character[c];
              }).replace(/<br> /g, '\n ');
          };
      })();

      str = $outputCode.html();
      $outputCode.text(entityify(str));
      // $outputCode.wrapInner('<pre />');

    }

  });

  function getCode(){
    //テキストエリアの値取得
    var codeVal;
    // codeVal = document.form.code.value;
    codeVal = $('#id_code').val();

console.log(codeVal);

    //表示先
    // var $output = document.getElementById("output-code");

    if( codeVal === "" ){
      alert("テキストボックスに入力してください");
    }
    else{
      $('#output-code').text(codeVal);
      // $('#output-code').wrapInner('<pre />');
    }
  }

});
