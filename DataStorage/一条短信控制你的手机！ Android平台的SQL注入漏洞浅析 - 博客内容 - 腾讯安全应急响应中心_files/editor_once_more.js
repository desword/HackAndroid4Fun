/**
 * 编辑器初始化
 */
function InitEditor(element, callback, _tools, clean, manual_url) {
    var plugins_style = "<style>pre{margin-left:2em;border-left:3px solid #CCC;padding:0 1em;}</style>";
    var allPlugin = {
        TSRCUploadImg: {
            c: "xhe_plugin_tsrcUploadImg",
            t: "\u52a0入图片 (Ctrl+1)",
            s: "ctrl+1",
            h: 1,
            e: function() {
                var _this = this;
                if (manual_url) {
                    var htm = '<div>插入图片(远程url或者本地上传<300k)</div><div><label for="xheImgUrl">图片文件: </label><input type="text" id="xheImgUrl" value="http://" class="xheText" placeholder="选择你要插入的截\u56fe" disabled /></div><div style="text-align:right;"><input type="button" id="xheSave" value="插入" /></div>'
                } else {
                    var htm = '<div>插入图片(远程url或者本地上传<300k)</div><div><label for="xheImgUrl">图片文件: </label><input type="text" id="xheImgUrl" value="http://" class="xheText" placeholder="选择你要插入的截\u56fe" /></div><div style="text-align:right;"><input type="button" id="xheSave" value="插入" /></div>'
                }
                var jTest = $(htm);
                var jUrl = $("#xheImgUrl", jTest),
                jSave = $("#xheSave", jTest);
                _this.uploadInit(jUrl, "/index.php/myuploadimg", "jpg,jpeg,gif,png");
                jSave.click(function() {
                    _this.loadBookmark();
                    var a = jUrl.val();
                    if (a.length < 8) {
                        return true
                    }
                    _this.pasteHTML('<img src="' + _this.domEncode(a) + '"/><br />');
                    _this.hidePanel();
                    return false
                });
                _this.saveBookmark();
                _this.showDialog(jTest)
            }
        },
        TSRCUploadFile: {
            c: "xhe_plugin_tsrcUploadFile",
            t: "添加附件 (Ctrl+2)",
            s: "ctrl+2",
            h: 1,
            e: function() {
                var _this = this;
                if (manual_url) {
                    var htm = '<div>添加附件(远程url或者本地上传<50m)</div><div><label for="xheImgUrl">附件上传: </label><input type="text" id="xheFileUrl" value="http://" class="xheText" placeholder="选择你要插入的截\u56fe" disabled /></div><div>附件名称：<input id="xheFileName" type="text"></div><div style="text-align:right;"><input type="button" id="xheFileSave" value="插入" /></div>'
                } else {
                    var htm = '<div>添加附件(远程url或者本地上传<50m)</div><div><label for="xheImgUrl">附件上传: </label><input type="text" id="xheFileUrl" value="http://" class="xheText" placeholder="选择你要插入的截\u56fe" /></div><div>附件名称：<input id="xheFileName" type="text"></div><div style="text-align:right;"><input type="button" id="xheFileSave" value="插入" /></div>'
                }
                var jTest = $(htm),
                    jUrl  = $("#xheFileUrl", jTest),
                    jSave = $("#xheFileSave", jTest);
                _this.uploadInit(jUrl, "/index.php/myupload/upload/1", "ppt,pdf,zip,rar");
                jSave.click(function() {
                    _this.loadBookmark();
                    var a = jUrl.val();
                    if (a.length < 8) {
                        return true
                    }
                    var jName = $('#xheFileName').val(); // 必须限制为只允许字母和数字和中文字符
                    var pattern = /^[\u4e00-\u9fa5a-zA-z0-9]+[\u4e00-\u9fa5a-zA-z0-9]$/g;
                    if (jName.length > 10 || jName.length < 2) {
                        alert('附件名称不能大于10个字符，不能小于2个字符');
                        return false;
                    }
                    if (!pattern.test(jName)) {
                        alert('附件名称只支持中文、字母、数字');
                        return false;
                    }
                    _this.pasteHTML('<a href="'+_this.domEncode(a)+'">'+jName+'</a>')
                    _this.hidePanel();
                    return false
                });
                _this.saveBookmark();
                _this.showDialog(jTest)
            }
        },
        btnCode: {
            c: "xhe_plugin_btnCode",
            t: "插入代码 (Ctrl+3)",
            s: "ctrl+3",
            h: 1,
            e: function() {
                var _this = this;
                var htmlCode = '<div><select id="xheCodeType"><option value="markdown">其他</option><option value="http">HTTP</option><option value="xml">HTML/XML</option><option value="css">CSS</option><option value="javascript">Javascript</option><option value="json">JSON</option><option value="java">Java</option><option value="php">PHP</option><option value="cpp">C/C++</option><option value="python">Python</option><option value="sql">SQL</option></select></div><div><textarea id="xheCodeValue" wrap="soft" spellcheck="false" style="width:300px;height:100px;" /></div><div style="text-align:right;"><input type="button" id="xheSave" value="确定" /></div>';
                var jCode = $(htmlCode),
                jType = $("#xheCodeType", jCode),
                jValue = $("#xheCodeValue", jCode),
                jSave = $("#xheSave", jCode);
                jSave.click(function() {
                    _this.loadBookmark();
                    _this.pasteHTML('<pre><code class="' + jType.val() + '">' + _this.domEncode(jValue.val()) + "</code></pre>");
                    _this.hidePanel();
                    return false
                });
                _this.saveBookmark();
                _this.showDialog(jCode)
            }
        }
    };
    if (typeof element == "string") {
        element = $(element)
    }
    if (!clean) {
        clean = 1
    }
    if (!_tools) {
        _tools = "Cut,Copy,Paste,Pastetext,|,FontSize,Bold,Italic,Underline,FontColor,Removeformat,|,Align,List,Outdent,Indent,Link,Unlink,Hr,/,Emot,Table,TSRCUploadImg,btnCode,Fullscreen,Preview,Source"
    }
    element.xheditor({
        shortcuts: {
            "ctrl+enter": callback
        },
        html5Upload: false,
        editorRoot: "http://security.tencent.com/js/",
        disableContextmenul: true,
        showBlocktag: true,
        clickCancelDialog: false,
        plugins: allPlugin,
        tools: _tools,
        loadCSS: plugins_style,
        cleanPaste: clean,
        emotPath: "http://security.tencent.com/js/xheditor_emot/",
        forcePtag: false
    });
    $(".xhe_plugin_tsrcUploadImg").css({
        "background": "transparent url(/js/xheditor/xheditor_skin/default/img/icons.gif) no-repeat 20px 20px",
        "background-position": "-440px 0px"
    });
    $(".xhe_plugin_tsrcUploadFile").css({
        "background": "transparent url(/js/xheditor/xheditor_skin/default/img/icons.gif) no-repeat 20px 20px",
        "background-position": "-380px 0px"
    });
    $(".xhe_plugin_btnCode").css({
        "background": "transparent url(/js/xheditor/xheditor_skin/default/img/code.gif) no-repeat 20px 20px",
        "background-position": "2px 2px"
    })
};