<?php
	include("../../header.inc");
?>

	<style type="text/css">
	.x-axis-scale {border-bottom:1px solid #EEE; position:absolute; width:90%; left:30px; line-height:20px; color:#CCC;}
	.y-axis-scale {border-left:1px solid #EEE; position:absolute; height:270px; top:10px; color:#CCC; vertical-align: baseline;}
	.y-axis-scale span{position:absolute; bottom:0px;}
	#drawarea{position: absolute; width:600px; height:260px; left:60px; top:0px; vertical-align: bottom;}
	#drawarea div{position: absolute; bottom:0px; width:1px; height:0px; background-color: #AAA;}
	</style>

	<article>
		<header class="entry-header">
			<title>amz.fx.transition</title>
		</header>
		<div class="entry-content">

			<div id="canvas" style="position:relative; height:300px; background-color:#F7F7F7;">
				<div id="x-axis" style="position:absolute; left:60px; top:20px; height:260px; background-color:#333; width:1px;"></div>
				<script type="text/javascript">
				for (var i=12; i>0; i--) {
					document.write('<div class="x-axis-scale" style="top:'+ ((i-1) * 20) +'px">'+ ((13-i)/10).toFixed(1) +'</div>');
				}
				</script>
				<div id="y-axis" style="position:absolute; left:40px; top:260px; height:1px; background-color:#333; width:90%;"></div>
				<script type="text/javascript">
				for (var i=1; i<=10; i++) {
					document.write('<div class="y-axis-scale" style="left:'+ (60 + i * 40) +'px"><span>'+ (i/10).toFixed(1) +'</span></div>');
				}
				</script>
				<div id="drawarea">
					<script type="text/javascript">
					for (var i=1; i<=400; i++) {
						document.write('<div id="line'+ i +'" style="left:'+ i +'px"></div>');
					}
					</script>
				</div>
				<div style="position:absolute; left:360px; top:2px;">
					<select id="transition-selecter">
						<option>请选择线型</option>
					</select>
				</div>
				<script type="text/javascript">
				var Amz = Using;
				Amz("amz.fx.Timeline", function(){
					var transitions = {
					    none : "return 0"
					    ,full : "return 1"
					    ,linear : "return percent"  // 斜线
					    ,reverse : "return 1 - percent" // 反斜线
					    ,parabola : "return Math.pow(percent, 2)"   // 抛物线
					    ,antiparabola : "return 1 - Math.pow(1 - percent, 2)"   // 反抛物线
					    ,sinoidal : "return (-Math.cos(percent * Math.PI)/2) + 0.5" // 正弦波
					    ,wobble : "return (-Math.cos(percent * Math.PI * (9 * percent))/2) + 0.5"   // 摇晃
					    ,spring : "return 1 - (Math.cos(percent * 4.5 * Math.PI) * Math.exp(-percent * 6))" // 弹性阴尼
					};
					var selector = document.getElementById("transition-selecter");
					for (var type in transitions) {
						var op = new Option(type, type, true, true);
						selector.add(op);
					}
					selector.selectedIndex = 0;
					selector.onchange = function() {
						var index = this.selectedIndex;
						if (index == 0) {
							drawLine("none");
							return;
						}
						drawLine(this.options[index].value);
					}
					function drawLine(type){
						for (var i=1; i<=400; i++) {
							document.getElementById("line"+ i).style.height = "0px";
						}
						var old = 1;
						var fn = new Function("percent", transitions[type]);
						var handler = function(e){
							var percent = e.target.schedule * 400;
							var n = Math.ceil(percent);
							for(var i=old; i<n; i++) {
								var line = document.getElementById("line"+ i);
								if (line) {
									var height = fn(i/400) * 200;
									line.style.height = parseInt(height) +"px";
								}
							}
							old = Math.floor(percent);
						};
						var tl = new amz.fx.Timeline();
						tl.onupdate = tl.onafterfinish = handler;
						tl.play();
					}
				});
				</script>
			</div>

		</div>
		<footer class="entry-footer"></footer>
	</article>

<?php
	include("../../footer.inc");
?>