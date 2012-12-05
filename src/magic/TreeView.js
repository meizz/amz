///import magic;
///import magic.Base;

///import amz.event;
///import amz._extend;
///import amz.isElement;
///import amz.base.Class;
///import amz.createClass;
///import amz.base.inherits;

/**
 * @description 树控件
 *
 * @author meizz
 * @create 2012-11-29
 *
 * @Class
 * @name magic.TreeView
 * @grammer new magic.TreeView([options]);
 */
magic.TreeView = magic.TreeView || (function(){
    var TreeView = amz.createClass(function(options){
        var me = this;

        me.nodes = {};
        me.divider = "_";
        me.dataSource = false;

        me.defaultUrl = "#";
        me.defaultTarget = "_self";
        me.iconPath = "";

        me.showPlus = true;
        me.showLines = true;
        me.showToolTip = true;
        me.showNodeIcon = true;

        me.autoSort = false;
        me.hotkey = true;
        me.useCheckbox = false;
        me.autoFocused = false;
        me.useContextMenu = false;
        me.convertRootIcon = true;
        me.calOperate = false;

        amz._extend(this, options);
    }, {
        type: "magic.TreeView"
        ,superClass: magic.Base
    }).extend({
        render: function(container){
            var html = [
                 "<div id=\"", this.getId() ,"\" "
                ," onclick=\"amzInstance('",this.guid,"').clickHandler(event)\""
                ," ondblclick=\"amzInstance('",this.guid,"').dblClickHandler(event)\""
                ,">"
                    ,"<div id=\"", this.getId("content") ,"\"></div>"
                ,"</div>"
            ].join("");

            return this._render(html, container);
        }
        ,afterRender: function(){}
        /**
         * @description 取 TreeNode
         * @param   {DOM|String}    obj     DOM元素，或者元素ID
         */
        ,getNode: function(obj){}
        ,clickHandler: function(e){
            var target = amz.event(e).target;
            var node = this.getNode(target);

            switch( node.nodeName.toUpperCase() ) {
                case "IMG" :
                    break;
                case "A" :
                    break;
            }
        }
        ,dblClickHandler: function(e){
            var target = amz.event(e).target;
            var node = this.getNode(target);

            node.toggle();
            this.fire("dblclick", {target:node});
        }
        ,_buildPrefix: function(prefix){}
        ,focus: function(){}
        ,expandLevel: function(level){}
    });

    //[static]
    TreeView.icons = {
        line: {}
        ,collapse: {}
        ,expand: {}
    };
    TreeView.setIcon = function(icon, src){};




















    /*
     * @description TreeView树控件节点对象
     * @Class
     * @name TreeNode
     * @grammer new TreeNode()
     */
    function TreeNode(dataNode, treeview) {
        var me = this;
        me._decontrol_ = true;
        magic.Base.call(me);

        me.checked = false;
        me.expanded = false;
        me._master_ = treeview;
        me.childPrefix = "";
        me.childNodes = false;

        me.id = dataNode.id;
        me.index = dataNode.index;
        me.dataNode = dataNode;
        treeview.nodes[me.guid] = this;
    }
    amz.base.inherits(TreeNode, magic.Base, "magic.TreeNode").extend({
        render: function(container){}
        ,get: function(){}
        ,parentNode: function(){}
        ,build: function(){}
        ,buildChildNodes: function(){}
        ,toggle: function(){}
        ,expand: function(){}
        ,expandLevel: function(){}
        ,collapse: function(){}
        ,focus: function(){}
        ,check: function(){}
        ,upCheck: function(){}
        ,linkClick: function(){}
    });

    return TreeView;
})();

/*
 这一版本不再实现 DataTree，而是将它的逻辑直接合在 TreeView 里实现
*/