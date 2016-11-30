function ModalCtrl($scope, $uibModal, $log, $rootScope,$http,$window) {
	
	$scope.modalActions = {
		'addConn': {'path':'/themes/adminLTE/unl_data/pages/modals/addConn.html', 'controller':'AddConnModalCtrl'},
		'addNode': {'path':'/themes/adminLTE/unl_data/pages/modals/addNode.html', 'controller':'AddNodeModalCtrl'},
		'addText': {'path':'/themes/adminLTE/unl_data/pages/modals/addText.html', 'controller':'AddTextModalCtrl'},
		'addShape': {'path':'/themes/adminLTE/unl_data/pages/modals/addShape.html', 'controller':'AddShapeModalCtrl'},
		'addNet': {'path':'/themes/adminLTE/unl_data/pages/modals/addNet.html', 'controller':'AddNetModalCtrl'},
		'editNode': {'path':'/themes/adminLTE/unl_data/pages/modals/editNode.html', 'controller':'editNodeModalCtrl'},
		'editNet': {'path':'/themes/adminLTE/unl_data/pages/modals/editNet.html', 'controller':'editNetModalCtrl'},
		'editLab': {'path':'/themes/adminLTE/unl_data/pages/modals/editLab.html', 'controller':'editLabModalCtrl'},
		'nodeList': {'path':'/themes/adminLTE/unl_data/pages/modals/nodeList.html', 'controller':'nodeListModalCtrl'},
		'netList': {'path':'/themes/adminLTE/unl_data/pages/modals/netList.html', 'controller':'netListModalCtrl'},
		'sysStat': {'path':'/themes/adminLTE/unl_data/pages/modals/sysStat.html', 'controller':'sysStatModalCtrl'},
		'startUpConfig': {'path':'/themes/adminLTE/unl_data/pages/modals/startUpConfig.html', 'controller':'startUpConfigModalCtrl'},
		'labDetails': {'path':'/themes/adminLTE/unl_data/pages/modals/labDetails.html', 'controller':'labDetailsModalCtrl'},
		'configObject': {'path':'/themes/adminLTE/unl_data/pages/modals/configObject.html', 'controller':'configObjectModalCtrl'},
		'default': {'path':'/themes/adminLTE/unl_data/pages/modals/wtf.html', 'controller':'ModalInstanceCtrl'}
  };
	
  	$scope.mouseOverMainDiv = function($event){
	}

	// $scope.topologyRefresh = function(){
	// 	jsPlumb.detachEveryConnection();
	// 	jsPlumb.reset();
	// 	initFullLab();
	// 	openrightHide();
	// 	// $scope.networkListRefresh();
	// 	// $scope.nodeListRefresh();
	// 	// for (i in $scope.node)
	// 	// {
	// 	// 	console.log('for scope node');
	// 	// 	var node = $scope.node[i];
	// 	// 	if (!$("#nodeID_" + node.id).length)
	// 	// 	{
	// 	// 		nodeInit(node);
	// 	// 		console.log('init node');
	// 	// 	}
	// 	// }
	// }


	$scope.openModal = function (action, size, $uibModalInstance) {
	var pathToModal = (action === undefined) ? 'default' :  action;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: $scope.modalActions[pathToModal]['path'],   
      controller: $scope.modalActions[pathToModal]['controller'],
      size: size,
      backdrop: true,
      resolve: {
        data: function () {
        	console.log("modal js linia 27");
        	// console.log("open modal 11111111111111111");
			switch(action) {
				case 'addConn':
						return {'src': $scope.addConnSrc, 'dst': $scope.addConnDst, 'path': $rootScope.lab, 'allNet':$scope.allNetworks};
						break;
				case 'addNode':
						return {'path': $rootScope.lab, 'object':$scope.addNewObject};
						break;
				case 'addNet':
						return {'path': $rootScope.lab, 'object':$scope.addNewObject};
						break;
				case 'addText':
						return {'path': $rootScope.lab, 'object':$scope.addNewObject};
						break;
				case 'addShape':
						return {'path': $rootScope.lab, 'object':$scope.addNewObject};
						break;
				case 'nodeList':
						return {'path': $rootScope.lab};
						break;
				case 'editNode':
						return {'path': $rootScope.lab, 'id' : $scope.tempEldata.id};
						break;
				case 'editNet':
						return {'path': $rootScope.lab, 'id' : $scope.tempEldata.id};
						break;
				case 'netList':
						return {'path': $rootScope.lab};
						break;
				case 'startUpConfig':
						return {'path': $rootScope.lab}
						break
				case 'labDetails':
						return {'path': $rootScope.lab}
						break
				case 'configObject':
						return {'path': $rootScope.lab}
						break
				case 'editLab':
						return {'path': $rootScope.lab}
						break
				default:
						return {'wtf': '123', 'path': '123'};
			}
        }
      }
    });
	switch(action) {
    case 'addConn':
		modalInstance.result.then(function (result) {
			console.log(result)
			if (result.result){
				if (result.connType == 'NoNe'){
					// console.log(result, '11111111111')
					var type = 'ethernet';
					var type = 'sereal';
					console.log(result)
					jsPlumb.connect({
						source:'nodeID_'+result.node.id,
						target:'networkID_'+result.net.id,
						parameters:{
							"interfSrc":result.node.ifname,
							"interfTrg":'',
							"type":type,
						},
						paintStyle: {strokeStyle: (type != 'serial') ? '#1e8151' : '#ffd11a', lineWidth: 2, outlineColor: "white", outlineWidth: 1},
						// connector : (type != 'serial') ? 'Bezier' : 'Straight',
						connector : "Straight",
						anchor: "Continuous",
						detachable : false,
						overlays:[
						[ "Label", {
							label:result.node.ifname, 
							id:'nodeID_'+result.node.id+'_'+result.node.ifname,
							cssClass: "aLabel",
							location:30}]
						]
					});
				} 
				if (result.connType == 'NoNo'){
				if (result.nodesData.type == 'ethernet'){
					var type = 'ethernet';
					// console.log(result, "22222222222")
					newConn=jsPlumb.connect({
						source:'nodeID_'+result.nodesData.src.id,
						target:'nodeID_'+result.nodesData.dst.id,
						parameters:{
							"interfSrc":result.nodesData.src.ifname,
							"interfTrg":result.nodesData.dst.ifname,
							"type":type,
						},
						paintStyle: {strokeStyle: (type != 'serial') ? '#1e8151' : '#ffd11a', lineWidth: 2, outlineColor: "white", outlineWidth: 1},
						connector : (type != 'serial') ? 'Bezier' : 'Straight',
						connector : "Straight",
						anchor: "Continuous",
						detachable : false,
						overlays:[
						[ "Label", {
							label:result.nodesData.src.ifname, 
							id:'nodeID_'+result.nodesData.src.id+'_'+result.nodesData.src.ifname,
							cssClass: "aLabel",
							location:30}]
						]
					});
					newConn.addOverlay(["Label", {
					label:result.nodesData.dst.ifname, 
					id:result.nodesData.dst.id+'_'+result.nodesData.dst.ifname,
					cssClass: "aLabel",
					location:-30
					}]); 
				} else if (result.nodesData.type == 'serial'){
					var type = 'serial';
					// console.log(result, '33333333333')
					newConn=jsPlumb.connect({
						source:'nodeID_'+result.nodesData.src.id,
						target:'nodeID_'+result.nodesData.dst.id,
						parameters:{
							"interfSrc":result.nodesData.src.ifname,
							"interfTrg":result.nodesData.dst.ifname,
							"type":type,
						},
						paintStyle: {strokeStyle: (type != 'serial') ? '#1e8151' : '#ffd11a', lineWidth: 2, outlineColor: "white", outlineWidth: 1},
						connector : (type != 'serial') ? 'Bezier' : 'Straight',
						// connector : "Straight",
						anchor: "Continuous",
						detachable : false,
						overlays:[
						[ "Label", {
							label:result.nodesData.src.ifname, 
							id:'nodeID_'+result.nodesData.src.id+'_'+result.nodesData.src.ifname,
							cssClass: "aLabel",
							location:30}]
						]
					});
					newConn.addOverlay(["Label", {
					label:result.nodesData.dst.ifname, 
					id:result.nodesData.dst.id+'_'+result.nodesData.dst.ifname,
					cssClass: "aLabel",
					location:-30
					}]); 
				}
				}
			$scope.ready=true;
		} else console.log('Error apeared. Sorry((')
		jsPlumb.repaintEverything();
	}
		, function () {
			$scope.ready=true;
		//function if user just close modal
		//$log.info('Modal dismissed at: ' + new Date());

		});

		break;
	case 'addNode':
		modalInstance.result.then(function (result) {
			if (result.result){
                console.log('modalInstance[addNode]',result.data)
				$http.get('/api/labs'+$rootScope.lab+'/nodes').then(function successCallback(response){
					console.log(response)
					$scope.node = response.data.data;
					var node=result.data;
					for (k in node.id)
					{
						if (k > 0)
						{
							node.top = node.top + 20;
							node.left = node.left + 20;
						}
						var id = node.id[k];
						$scope.node[node.id[k]].imageclass=node.icon.replace('.png','').replace(' ','')+'_sm';
						$scope.node[node.id[k]].loadclass=node.icon.replace('.png','').replace(' ','')+'_sm m-progress';
						$scope.node[node.id[k]].loadclassShow=false;
						$scope.node[node.id[k]].playstop=false;
						$scope.node[node.id[k]].playstopView=false;
						$scope.node[node.id[k]].upstatus=(node.status == 2) ? true : false;
						var elDIV=
							'<div id="nodeID_'+id+'" class="w element-menu" style="left: '+node.left+'px; top: '+node.top+'px;" ng-mousemove="node['+id+'].playstopView=true" ng-mouseleave="node['+id+'].playstopView=false">'+
							'<!--<div class="play-tag" ng-click="startstopNode('+id+');" ng-show="node['+id+'].playstopView && !node['+id+'].upstatus" title="Start node"><i class="fa fa-play play-icon" aria-hidden="true"></i></div>'+
							'<div class="stop-tag" ng-click="startstopNode('+id+');" ng-show="node['+id+'].playstopView && node['+id+'].upstatus" title="Stop node"><i class="fa fa-stop stop-icon" aria-hidden="true"></i></div>-->'+
							'<div class="tag" title="Connect to another node">'+
								'<i class="fa fa-plug plug-icon dropdown-toggle ep" ng-show="node['+id+'].playstopView" ng-click="getIntrfInfo('+id+')" data-toggle="dropdown"></i>'+
							'</div>'+
							'<div class="{{node['+id+'].loadclass}} m-progress" ng-show="node['+id+'].loadclassShow" style="position:absolute; z-index:2;"></div>'+
							'<a href="{{node['+id+'].url}}" ng-click="openNodeConsole('+id+', $event)" ng-mousedown="nodeTouching('+id+', $event)" ng-mousemove="nodeDragging('+id+', $event)" class="pointer">'+
							'<img ng-src="images/icons/{{node['+id+'].icon}}" class=" '+node.icon.replace('.png','').replace(' ','')+'_sm {{(!node['+id+'].upstatus) ? \'grayscale\' : \'\'}} {{(node['+id+'].loadclassShow) ? \'icon-opacity\' : \'\';}}"></a>'+
							'<figcaption class="figcaption-text '+node.icon.replace('.png','').replace(' ','')+'_sm_label">'+node.name+id+'</figcaption>'+
							'</div>';
							$scope.compileNewElement(elDIV, 'nodeID_'+id)
						}
					})
				} else {
					
				}
			}, function () {
			//function if user just close modal
			//$log.info('Modal dismissed at: ' + new Date());
			});
			break;

	case 'addText':
		modalInstance.result.then(function (result) {
			if (result.result){
				console.log('modalInstance[addText]',result.data)
				$http.get('/api/labs'+$rootScope.lab+'/textobjects').then(function successCallback(response){
					console.log("getText objects:",response)
					$scope.textElement = response.data.data;
					var textObj = new TextDecoderLite('utf-8').decode(toByteArray(result.data.data));
					try {
						textObj = JSON.parse(textObj)
					} catch(ex){
						console.log("Parsing text object error")
						textObj = {};
					}
					var id = textObj.id;
					var z_index = 1001;
					var coordinates = 'position:absolute;left:' + textObj['left'] + 'px;top:' + textObj['top'] + 'px;';
					var elDIV =
						'<div id="textID_'+textObj.id+'" class="w element-menu {{ (!node['+id+'].upstatus) ? \'mover\' : \'\'}}" style="left: '+textObj.left+'px; top: '+textObj.top+'px;" ng-mousemove="node['+id+'].playstopView=true" ng-mouseleave="node['+id+'].playstopView=false">'+
						'<div><p style="font-size:' + textObj.fontSize + 'px; color: ' + textObj.fontColor +';" ng-mousedown="textTouching('+id+', $event)" ng-mousemove="textDragging('+id+', $event)" class="pointer">'+
						// '<a><figcaption class="figcaption-text _sm_label" ng-bind="
						textObj['text'] + '</p>'+
						'</div></div>';
					$scope.compileNewElement(elDIV, 'textID_'+id)
				})
			} else {
				
			}
		}, function () {
		//function if user just close modal
		//$log.info('Modal dismissed at: ' + new Date());
		});
		break;
	case 'addShape':
		modalInstance.result.then(function (result) {
			if (result.result){
				console.log('modalInstance[addText]',result.data)
				$http.get('/api/labs'+$rootScope.lab+'/textobjects').then(function successCallback(response){
					console.log("getShape objects:",response)
					console.log("getShape 13123:",result.data)
					$scope.shapeElement = response.data.data;
					var shapeObj = new TextDecoderLite('utf-8').decode(toByteArray(result.data.data));
					try {
						console.log("string shapeObj", shapeObj)
						shapeObj = JSON.parse(shapeObj)
					} catch(ex){
						console.warn("Parsing shape object error:", ex)
						shapeObj = {};
					}
					var id = shapeObj.id;
					var z_index = 1001;
					var sideSize = shapeObj.shapeSideSize ? shapeObj.shapeSideSize : 150;

					console.log("shapeElement", shapeObj)
					var coordinates = 'position:absolute;left:' + shapeObj['left'] + 'px;top:' + shapeObj['top'] + 'px;';
					var elDIV = "";
					if(shapeObj.shapeType == 'square'){
						elDIV =
							'<div id="shapeID_'+shapeObj.id+'" class="w element-menu {{ (!node['+id+'].upstatus) ? \'mover\' : \'\'}}" ' +
							'style="left: '+shapeObj.left+'px; top: '+shapeObj.top+'px; width: " ' + sideSize + 'px; height: " ' + sideSize + 'px; ' +
							'ng-mousemove="node['+id+'].playstopView=true" ng-mouseleave="node['+id+'].playstopView=false">'+
								'<svg width="' + sideSize + '" height="' + sideSize + '">' +
									'<rect width="' + sideSize + '" ' +
									'height="' + sideSize + '" ' +
									'fill ="' + shapeObj.bgColor + '" ' +
									'stroke-width ="' + shapeObj.borderWidth + '" ' +
									'stroke ="' + shapeObj.borderColor + '" ' + shapeObj.borderType +
									'"/>' +
								'Sorry, your browser does not support inline SVG.' +
								'</svg>' +
							'</div>';
					} else {
						var radius = sideSize / 2 - shapeObj.borderWidth / 2;
						elDIV = 
							'<div id="shapeID_'+shapeObj.id+'" class="w element-menu {{ (!node['+id+'].upstatus) ? \'mover\' : \'\'}}" ' +
							'style="left: '+shapeObj.left+'px; top: '+shapeObj.top+'px; width: " ' + sideSize + 'px; height: " ' + sideSize + 'px; ' +
							'ng-mousemove="node['+id+'].playstopView=true" ng-mouseleave="node['+id+'].playstopView=false">'+
								'<svg width="' + sideSize + '" height="' + sideSize + '">' +
									'<ellipse cx="' + (radius + shapeObj.borderWidth / 2 ) + '" ' +
									'cy="' + (radius + shapeObj.borderWidth / 2 ) + '" ' +
									'rx="' + radius + '" ' +
									'ry="' + radius + '" ' +
									'stroke ="' + shapeObj.borderColor + '" ' +
									'stroke-width="' + shapeObj.borderWidth / 2 + '" ' + shapeObj.borderType +
									' fill ="' + shapeObj.bgColor + '" ' +
									'/>' +
								'Sorry, your browser does not support inline SVG.' +
								'</svg>' +
							'</div>';
					}
						// '<p style="font-size:' + shapeObj.fontSize + 'px; color: ' + shapeObj.fontColor +';" ng-mousedown="textTouching('+id+', $event)" ng-mousemove="textDragging('+id+', $event)" class="pointer">'+
						// shapeObj['text'] + '</p>'+
					$scope.compileNewElement(elDIV, 'shapeID_'+id)
				})
			} else {
				
			}
		}, function () {
		//function if user just close modal
		//$log.info('Modal dismissed at: ' + new Date());
		});
		break;
	case 'addNet':
		console.log("modal js linia 304")
			
		modalInstance.result.then(function (result) {
			console.log("modal js linia 307")
			
			if (result.result){
				console.log(result.data)
				var icon = (result.data.type == 'bridge') ? 'Switch.png' : 'Cloud.png';
				var elDIV='<div id="networkID_'+result.data.id+'" class="w element-menu network" style="left: '+result.data.left+'px; top: '+result.data.top+'px;" context-menu="netContext">'+
					'<a><img src="images/icons/'+icon+'" class="'+icon.replace('.png','')+'_sm'+'"></a>'+
					'<a class="pointer"><figcaption class="figcaption-text">'+result.data.name+'</figcaption></a>'+
				'</div>';
				$('#canvas').append(elDIV);
				$('#networkID_'+result.data.id).ready(function(){ jsPlumbNodeInit($('#networkID_'+result.data.id))/*console.log('networkID_'+networkObject['id']+' ready');*/ });
				
			} else {
				
			}
		}, function () {
		//function if user just close modal
		//$log.info('Modal dismissed at: ' + new Date());
		});
		break;
	case 'nodeList':
		modalInstance.result.then(function (result) {
			console.log(result)
		}, function (result) {
			console.log(result)
			$scope.nodeListRefresh();
			jsPlumb.repaintEverything();
			if (result) $window.location.reload();
		//function if user just close modal
		//$log.info('Modal dismissed at: ' + new Date());
		});
		break;
	case 'netList':
		modalInstance.result.then(function (result) {
			console.log(result)
		}, function (result) {
			console.log(result)
			$scope.networkListRefresh();
			if (result) $window.location.reload();
		//function if user just close modal
		//$log.info('Modal dismissed at: ' + new Date());
		});
		break;
	case 'editNet':
		modalInstance.result.then(function (result) {
			console.log(result)
			result.left = (parseInt(result.left)+50 < 0) ? 50 : parseInt(result.left)+50;
			result.top = (result.top < 0) ? 0 : result.top;
			$('div#networkID_'+result.id).offset({ left: result.left,  top: result.top})
			console.log($('div#networkID_'+result.id).offset())
			$scope.networkListRefresh();
			jsPlumb.repaintEverything();
		}, function (result) {
			console.log(result)
		//function if user just close modal
		//$log.info('Modal dismissed at: ' + new Date());
		});
		break;
	default:
        modalInstance.result.then(function () {
		}, function () {
		$log.info('Modal dismissed at: ' + new Date());
		});
	}
  };	
	
}
// $scope.closeModal = function ($uibModalInstance) {
//     $uibModalInstance.dismiss('cancel');
// }

function ModalInstanceCtrl($scope, $uibModalInstance) {

  	$scope.closeModal = function () {
		$uibModalInstance.dismiss('cancel');
	};
};

function AddConnModalCtrl($scope, $uibModalInstance, $http, $rootScope, data, $q) {
	
	$scope.allNet=data.allNet;
	//console.log(data)
	$scope.result={};
	$scope.srcfullIfList=[];
	$scope.dstfullIfList =[];
	$scope.result.result=false;
	$scope.src=data.src;
	$scope.dst=data.dst;
	$scope.nodeList={};
	$scope.src.name=$('div#'+data.src.id+' figcaption').text()
	$scope.dst.name=$('div#'+data.dst.id+' figcaption').text()
	$scope.src.icon=$('div#'+data.src.id+' img').attr('src')
	$scope.dst.icon=$('div#'+data.dst.id+' img').attr('src')
	$scope.src.iconClass=$('div#'+data.src.id+' img').attr('class');
	$scope.dst.iconClass=$('div#'+data.dst.id+' img').attr('class');
	$scope.src.type = (data.src.id.search('node') != -1) ? 'node' : 'network';
	$scope.dst.type = (data.dst.id.search('node') != -1) ? 'node' : 'network';
	$scope.src.eveID = ($scope.src.type == 'node') ? data.src.id.replace('nodeID_','') : data.src.id.replace('networkID_','');
	$scope.dst.eveID = ($scope.dst.type == 'node') ? data.dst.id.replace('nodeID_','') : data.dst.id.replace('networkID_','');
	$scope.src.if={}
	$scope.dst.if={}
	
	$http.get('/api/labs'+$rootScope.lab+'/nodes')
	.then(
		function successCallback(response){
			console.log(response);
			$scope.nodeList=response.data.data
		},
		function errorCallback(response){
			console.log('Server Error');
			console.log(response);
		}
	)
	$http.get('/api/list/networks').then(
		function successCallback(response){
			//console.log(response)
			$scope.netList=response.data.data
		}, function errorCallback(response){
			console.log('Server Error');
			console.log(response.data);
		}
	);

	
	if ($scope.src.type == 'node'){
		$http.get('/api/labs'+$rootScope.lab+'/nodes/'+$scope.src.eveID+'/interfaces').then(
			function successCallback(response){
				//console.log(response)
				$scope.src.if=response.data.data
				// console.log($scope.src.if);
				$scope.src.selectedIF='';
				if($scope.dst.type != 'node') $scope.src.if.serial=[];
				for( var key in $scope.src.if.ethernet ) {
					if ($scope.src.if.ethernet[key].network_id == 0) {$scope.src.selectedIF=key; break;}
					if ($scope.src.selectedIF == '') $scope.src.selectedIF=key;
				}
				for( var key in $scope.src.if.ethernet ) {
					$scope.srcfullIfList[key] = $scope.src.if.ethernet[key]
					console.log($scope.src.if.ethernet[key]);
				}
				for( var key in $scope.src.if.serial ) {
					$scope.srcfullIfList[key] = $scope.src.if.serial[key];
				}
				// $scope.srcfullIfList = $scope.src.if.ethernet;
				// jQuery.extend($scope.srcfullIfList, $scope.src.if.serial)
				//console.log($scope.src.selectedIF)
			}, function errorCallback(response){
				$scope.interfListCount = false;
				console.log('Server Error');
				console.log(response.data);
			}
		);
	}
	
	if ($scope.dst.type == 'node'){
		$http.get('/api/labs'+$rootScope.lab+'/nodes/'+$scope.dst.eveID+'/interfaces').then(
			function successCallback(response){
				console.log(response)
				$scope.dst.if=response.data.data
				if($scope.src.type != 'node') $scope.dst.if.serial=[];
				$scope.dst.selectedIF='';
				for( var key in $scope.dst.if.ethernet ) {
					if ($scope.dst.if.ethernet[key].network_id == 0) {$scope.dst.selectedIF=key; break;}
					if ($scope.dst.selectedIF == '') $scope.dst.selectedIF=key;
					console.log($scope.dst.selectedIF);
				}
				for( var key in $scope.dst.if.ethernet ) {
					$scope.dstfullIfList[key]=$scope.dst.if.ethernet[key]
				}
				for( var key in $scope.dst.if.serial ) {
					$scope.dstfullIfList[key]=$scope.dst.if.serial[key];
				}
				// $scope.dstfullIfList = $scope.dst.if.ethernet
				// jQuery.extend($scope.dstfullIfList, $scope.dst.if.serial)
				console.log($scope.dst.selectedIF)
			}, function errorCallback(response){
				$scope.interfListCount=false;
				console.log('Server Error');
				console.log(response.data);
			}
		);
	}

 	$scope.closeModal = function () {
    	$uibModalInstance.dismiss('cancel');
  	};
  
  	$scope.addConn = function () {
		// console.log($scope.dst.type+' '+$scope.dst.eveID+' '+$scope.dst.selectedIF)
		//console.log($scope.src.type+' '+$scope.src.eveID+' '+$scope.src.selectedIF)
		// if ( ($scope.dst.type == 'node' && $scope.src.type == 'network') || ($scope.dst.type == 'network' && $scope.src.type == 'node')){
		if (($scope.dst.type == 'network' && $scope.src.type == 'node')){
			var targetNodeID = ($scope.dst.type == 'node') ? $scope.dst.eveID : $scope.src.eveID;
			var targetNetID = ($scope.dst.type == 'network') ? $scope.dst.eveID : $scope.src.eveID;
			var targetIfID = ($scope.dst.type == 'node') ? $scope.dst.selectedIF : $scope.src.selectedIF;
			var targetIfName = ($scope.dst.type == 'node') ? $scope.dstfullIfList[targetIfID].name : $scope.srcfullIfList[targetIfID].name;
			var targetIfNet = ($scope.dst.type == 'node') ? $scope.dstfullIfList[targetIfID].network_id : $scope.srcfullIfList[targetIfID].network_id;
			if (targetIfNet != 0){toastr["error"]('Interface already used', "Error"); return;}
			console.log(targetNodeID+' '+' '+targetNetID+' '+targetIfID);
			var newConnData={};
			newConnData[''+targetIfID+'']=String(targetNetID);
			$http({
				method: 'PUT',
				url:'/api/labs'+$rootScope.lab+'/nodes/'+targetNodeID+'/interfaces',
				data: newConnData}).then(
				function successCallback(response){
					console.log(response)
					$scope.result.result=true;
					$scope.result.connType='NoNe';
					$scope.result.node={};
					$scope.result.net={};
					$scope.result.node.id=targetNodeID;
					$scope.result.node.ifname=targetIfName;
					$scope.result.net.id=targetNetID;
					$uibModalInstance.close($scope.result);
				}, function errorCallback(response){
					console.log('Server Error');
					console.log(response);
				}
			);
			jsPlumb.repaintEverything();
		}

		if ( ($scope.dst.type == 'node' && $scope.src.type == 'node')){
			if ($scope.srcfullIfList[$scope.src.selectedIF].network_id == 0)
			{
				if ($scope.dstfullIfList[$scope.dst.selectedIF].network_id === undefined)
				{
					toastr["error"]('Incompatible connection', "Error"); 
					return;
				}
				if ($scope.srcfullIfList[$scope.src.selectedIF].network_id != 0 || $scope.dstfullIfList[$scope.dst.selectedIF].network_id != 0)
				{
					console.log("d")
					toastr["error"]('Interface already used', "Error"); 
					return;
				}
				var newConnSrcData={};
				var newConnDstData={};
				var srcNodeID = $scope.src.eveID;
				var dstNodeID = $scope.dst.eveID;
				var srcIfID = $scope.src.selectedIF;
				var dstIfID = $scope.dst.selectedIF;
				var srcIfName = $scope.srcfullIfList[$scope.src.selectedIF].name;
				var dstIfName = $scope.dstfullIfList[$scope.dst.selectedIF].name;
				console.log('src node '+srcNodeID+' '+srcIfID+' '+srcIfName)
				console.log('dst node '+dstNodeID+' '+dstIfID+' '+dstIfName)
				console.log($scope.src.offsetLeft+' '+$scope.src.offsetTop+' '+$scope.dst.offsetLeft+' '+$scope.dst.offsetTop)
				var x1 = $scope.src.offsetLeft;
				var x2 = $scope.dst.offsetLeft;
				var y1 = $scope.src.offsetTop;
				var y2 = $scope.dst.offsetTop;
				var x3 = 0;
				var y3 = 0;
				var newNetName = 'Net_'+$scope.src.name+'_'+srcIfName;
				if (x2 !== x1) x3 = (x2 > x1) ? x1 : x2;
				if (y2 !== y1) y3 = (y2 > y1) ? y1 : y2;
				x3+=(Math.abs(x1-x2))/2; y3+=(Math.abs(y1-y2))/2;
				console.log('New net '+newNetName+' coordinates: ('+x3+','+y3+')')
				
				$scope.result.net = { 
					'name': newNetName,
					'left': x3,
					'top': y3,
					'type': 'bridge',
					'count': 1,
					'postfix': 0
				}
				
				$http.post('/api/labs'+$rootScope.lab+'/networks', $scope.result.net)
				.then(
					function successCallback(response){
						console.log(response)
						$scope.result.net.id=response.data.data.id;
						newConnSrcData[''+srcIfID+'']=String($scope.result.net.id);
						newConnDstData[''+dstIfID+'']=String($scope.result.net.id);
						var srcRequest = $http.put('/api/labs'+$rootScope.lab+'/nodes/'+srcNodeID+'/interfaces', newConnSrcData);
						var dstRequest = $http.put('/api/labs'+$rootScope.lab+'/nodes/'+dstNodeID+'/interfaces', newConnDstData);
						$q.all(srcRequest,dstRequest)
						.then(function(results){
							console.log(results);
							$scope.result.nodesData = {
								src : { 'id' : srcNodeID, 'ifname' : srcIfName},
								dst : { 'id' : dstNodeID, 'ifname' : dstIfName},
								type : 'ethernet'
							}
							$scope.result.result=true;
							$scope.result.connType='NoNo';
							$uibModalInstance.close($scope.result);	
						})
					}, function errorCallback(response){
						console.log('Server Error');
						console.log(response);
						//$uibModalInstance.close($scope.result);
					}
				);
			} else 
			{
				if ($scope.dstfullIfList[$scope.dst.selectedIF].remote_id === undefined)
				{
					toastr["error"]('Incompatible connection', "Error"); 
					return;
				}
				if ($scope.dstfullIfList[$scope.dst.selectedIF].remote_id !== 0 || $scope.srcfullIfList[$scope.src.selectedIF].remote_id !== 0)
				{
					toastr["error"]('Interface already used', "Error"); 
					return;
				}
				var srcNodeID = $scope.src.eveID;
				var dstNodeID = $scope.dst.eveID;
				var srcIfID = $scope.src.selectedIF;
				var dstIfID = $scope.dst.selectedIF;
				var srcIfName = $scope.srcfullIfList[$scope.src.selectedIF].name;
				var dstIfName = $scope.dstfullIfList[$scope.dst.selectedIF].name;
				var newConnSrcData={};
				newConnSrcData[''+srcIfID+'']=dstNodeID+':'+dstIfID;
				console.log('Serial connection')
				console.log(newConnSrcData)
				$http.put('/api/labs'+$rootScope.lab+'/nodes/'+srcNodeID+'/interfaces', newConnSrcData)
				.then(
					function successCallback(response){
						console.log(response)
						$scope.result.nodesData = {
							src : { 'id' : srcNodeID, 'ifname' : srcIfName},
							dst : { 'id' : dstNodeID, 'ifname' : dstIfName},
							type : 'serial'
						}
						$scope.result.result=true;
						$scope.result.connType='NoNo';
						$uibModalInstance.close($scope.result);	
					}
				)
			}
		}

  	};
  	jsPlumb.repaintEverything();

  	$scope.opacity = function(){
		$(".modal-content").toggleClass("modal-content_opacity");
	}
};

function AddNodeModalCtrl($scope, $uibModalInstance, $http, $rootScope, data) {
	console.log($rootScope.lab)
	$scope.templateData={};
	$scope.result={}
	$scope.tempList = [];
	$scope.result.result=false;
	$scope.result.data={}
	$scope.selectTemplate='';
	$scope.selectIcon='';
	$scope.viewTemplateSwitch=false;
	$scope.tempObject=data.object;
	$scope.numberNodes = 1;
	$scope.restrictSpace = '^[a-zA-Z0-9-_]+$';
	 
	$scope.select_image = function(x){
  		$scope.selectIcon = x;
  		$scope.show = false;
  	}
  	//console.log("aaa")

	$http.get('/api/list/templates/').then(
		function successCallback(response){
			console.log(response)
			var index = 0;
			for (var key in response.data.data){
				$scope.tempList[index]={ 'brname' : key, 'fullname' : response.data.data[key]}
				index++
			}
		}, function errorCallback(response){
			console.log('Server Error');
			console.log(response.data);
		}
	);
	
	$scope.viewTemplate = function($item, $model){
		$('#template').show();
		console.log($item.brname)
		$scope.templateData={};
		$scope.selectTemplate=$item.brname;
		if ($scope.selectTemplate == '') {$scope.viewTemplateSwitch = false; return;}
		
		$scope.viewTemplateSwitch = true;
		
		$http.get('/api/list/templates/'+$scope.selectTemplate).then(
		function successCallback(response){
			console.log(response)
			$scope.templateData=response.data.data
			$scope.selectIcon=$scope.templateData.options.icon.value
			$scope.selectImage = ($scope.templateData.options.image != undefined) ? $scope.templateData.options.image.value : '';
			$scope.selectSlot1 = ($scope.templateData.options.slot1 != undefined) ? $scope.templateData.options.slot1.value : '';
			$scope.selectSlot2 = ($scope.templateData.options.slot2 != undefined) ? $scope.templateData.options.slot2.value : '';
			$scope.selectConfig = ($scope.templateData.options.config != undefined) ? $scope.templateData.options.config.value : '';
			$scope.selectConsole = ($scope.templateData.options.console != undefined) ? $scope.templateData.options.console.value : '';
		}, function errorCallback(response){
			console.log('Server Error');
			console.log(response.data);
			console.log('image.tamplate' + response.data.data);
		}
		);
	}
	
	$scope.addNode = function () {
		
		$scope.result.data = { 
			'name': $scope.templateData.options.name.value,
			'left': $scope.tempObject.pageX,
			'top': $scope.tempObject.pageY,
			'icon': $scope.selectIcon,
			'template': $scope.selectTemplate
			
		}
		
		console.log($scope.templateData['type'])
		if ($scope.templateData.type != undefined) $scope.result.data.type = $scope.templateData.type;
		if ($scope.templateData.options.config != undefined) $scope.result.data.config = $scope.selectConfig;
		if ($scope.templateData.options.image != undefined) $scope.result.data.image = $scope.selectImage;
		if ($scope.templateData.options.delay != undefined) $scope.result.data.delay = $scope.templateData.options.delay.value;
		if ($scope.templateData.options.ram != undefined) $scope.result.data.ram = $scope.templateData.options.ram.value;
		if ($scope.templateData.options.nvram != undefined) $scope.result.data.nvram = $scope.templateData.options.nvram.value;
		if ($scope.templateData.options.console != undefined) $scope.result.data.console = $scope.selectConsole;
		if ($scope.templateData.options.cpu != undefined) $scope.result.data.cpu = $scope.templateData.options.cpu.value;
		if ($scope.templateData.options.ethernet != undefined) $scope.result.data.ethernet = $scope.templateData.options.ethernet.value;
		if ($scope.templateData.options.uuid != undefined) $scope.result.data.uuid = $scope.templateData.options.uuid.value;
		if ($scope.templateData.options.idlepc != undefined) $scope.result.data.idlepc = $scope.templateData.options.idlepc.value;
		if ($scope.templateData.options.slot1 != undefined) $scope.result.data.slot1 = $scope.selectSlot1;
		if ($scope.templateData.options.slot2 != undefined) $scope.result.data.slot2 = $scope.selectSlot2;
		if ($scope.templateData.options.serial != undefined) $scope.result.data.serial = $scope.templateData.options.serial.value;
		if ($scope.numberNodes != undefined) $scope.result.data.numberNodes = $scope.numberNodes;
		if (!$scope.formAddNode.name.$valid)
		{
			console.log("error1");
			toastr["error"]("Error", "Error");
			console.log("error2");
		}
		else
		{
			$http({
				method: 'POST',
				url:'/api/labs'+$rootScope.lab+'/nodes',
				data: $scope.result.data}).then(
				function successCallback(response){
					console.log(response)
					$scope.result.data.id=response.data.data.id;
					$scope.result.result=true;
					$uibModalInstance.close($scope.result);
				}, function errorCallback(response){
					console.log('Server Error');
					console.log(response);
					//$uibModalInstance.close($scope.result);
				}
			);
		}
	}
	$scope.closeModal = function () {
		$uibModalInstance.dismiss('cancel');
	};
  
};

function AddTextModalCtrl($scope, $uibModalInstance, $http, $rootScope, data) {
	
	var result={};
	$scope.textList={}
	$scope.textname='Text';
	$scope.tempObject=data.object;
	$scope.runningProgress = false;
	$scope.gotError = false;
	result.result=false;
	$scope.textProps = { 
		'text': '',
		'bgColor': 'white',
		'fontColor': 'black',
		'fontStyle': '',
		'fontSize': ''
	}
	$scope.closeModal = function () {
		$uibModalInstance.dismiss('cancel');
	};
	
	$scope.addText = function () {
		$scope.runningProgress = true;
		var tempData = {};
		result.data = {
			'name': $scope.textname,
			'data':'',
			'type': 'text',
			'count': 1,
			'postfix': 0,
		}
		tempData = {
			'left': $scope.tempObject.pageX,
			'top': $scope.tempObject.pageY,
			'text': $scope.textProps.text, 
			'bgColor': $scope.textProps.bgColor,
			'fontColor': $scope.textProps.fontColor,
			'fontStyle': $scope.textProps.fontStyle,
			'fontSize': $scope.textProps.fontSize
		}
		result.data.data = fromByteArray(new TextEncoderLite('utf-8').encode(JSON.stringify(tempData)));
		// do not remove next string 
		// if($scope.textProps.text) $scope.result.data.data = btoa($scope.textProps.text);


		console.log("### $scope.result.data",result.data)
		$http({
			method: 'POST',
			url:'/api/labs'+$rootScope.lab+'/textobjects',
			data: result.data}).then(
			function successCallback(response){
				$scope.runningProgress = false;
				console.log("Response:", response)
				result.data.id=response.data.result.id;
				result.result=true;
				$uibModalInstance.close(result);
			}, function errorCallback(response){
				$scope.gotError = true;
				$scope.errorText = "";
				// $scope.runningProgress = false;
				console.log('Server Error: addText method');
				console.log(response);
				// $uibModalInstance.close($scope.result);
			}
		);
			
		console.log("timeout")
	}
};

function AddShapeModalCtrl($scope, $uibModalInstance, $http, $rootScope, data) {
	var result={};
	$scope.shapeName='Shape';
	$scope.tempObject=data.object;
	console.log("sahpe tempobject",$scope.tempObject)
	// $scope.runningProgress = false;
	// $scope.gotError = false;
	result.result=false;
	$scope.shapeProps = { 
		'borderType': 'solid',
		'borderWidth': 1,
		'borderColor': 'black',
		'bgColor': 'white',
		'shapeType': 'circle',
		'name': '',
		'isShape': true
	}
	$scope.closeModal = function () {
		$uibModalInstance.dismiss('cancel');
	};
	
	$scope.addShape = function () {
		// $scope.runningProgress = true;
		// var tempData = {};
		result.data = {
			'name': $scope.shapename,
			'data':'',
			'type': 'shape',
			'count': 1,
			'postfix': 0,
		}
		var tempData = {
			'left': $scope.tempObject.pageX,
			'top': $scope.tempObject.pageY,
			'text': $scope.shapeProps.text, 
			'bgColor': $scope.shapeProps.bgColor,
			'shapeType': $scope.shapeProps.shapeType,
			'borderType': $scope.shapeProps.borderType,
			'borderWidth': $scope.shapeProps.borderWidth,
			'borderColor': $scope.shapeProps.borderColor,
		}
		result.data.data = fromByteArray(new TextEncoderLite('utf-8').encode(JSON.stringify(tempData)));
		// do not remove next string 
		// if($scope.textProps.text) $scope.result.data.data = btoa($scope.textProps.text);


		console.log("### $scope.result.data",result.data)
		$http({
			method: 'POST',
			url:'/api/labs'+$rootScope.lab+'/textobjects',
			data: result.data}).then(
			function successCallback(response){
				$scope.runningProgress = false;
				console.log("Response:", response)
				result.data.id=response.data.result.id;
				result.result=true;
				$uibModalInstance.close(result);
			}, function errorCallback(response){
				$scope.gotError = true;
				$scope.errorText = "";
				// $scope.runningProgress = false;
				console.log('Server Error: addText method');
				console.log(response);
				// $uibModalInstance.close($scope.result);
			}
		);
			
		console.log("timeout")
	}
}

function editNodeModalCtrl($scope, $uibModalInstance, $http, data, $state) {
	
	var id = data.id
	$scope.path = data.path
	$scope.result = {};
	$scope.result.result=false;
	$http.get('/api/labs'+$scope.path+'/nodes/'+id)
	.then(
		function successCallback(response){
			// console.log(response, 'response when open editNode ');
			$scope.nodeInfo=response.data.data
			$scope.nodeNameOld=$scope.nodeInfo.name;
			$http.get('/api/list/templates/'+$scope.nodeInfo.template)
			.then(function successCallback(response){
				console.log(response)
				$scope.nodeTemplate = response.data.data;
				$scope.selectIcon = $scope.nodeInfo.icon;
				$scope.selectImage = $scope.nodeInfo.image;
				$scope.selectSlot1 = $scope.nodeInfo.slot1;
				$scope.selectSlot2 = $scope.nodeInfo.slot2;
				$scope.selectConsole = $scope.nodeInfo.console;
				$scope.selectConfig = $scope.nodeInfo.config + "";
			})
		}
	)
	$scope.select_image = function(x)
  	{
  		$scope.selectIcon = x;
  		$scope.show = false;
  	}
	$scope.editNode = function(){
		var putdata = {
			'template' : $scope.nodeInfo.template,
			'type' : $scope.nodeInfo.template,
			'name' : $scope.nodeInfo.name,
			'icon' : $scope.selectIcon,
			'image' : $scope.selectImage,
			'postfix' : 0,
		}
		if ($scope.nodeInfo.cpu !== undefined) putdata.cpu=$scope.nodeInfo.cpu;
		if ($scope.nodeInfo.idlepc !== undefined) putdata.idlepc=$scope.nodeInfo.idlepc;
		if ($scope.nodeInfo.nvram !== undefined) putdata.nvram=$scope.nodeInfo.nvram;
		if ($scope.nodeInfo.ram !== undefined) putdata.ram=$scope.nodeInfo.ram;
		if ($scope.nodeInfo.ethernet !== undefined) putdata.ethernet=$scope.nodeInfo.ethernet;
		if ($scope.nodeInfo.serial !== undefined) putdata.serial=$scope.nodeInfo.serial;
		if ($scope.nodeInfo.slot1 != undefined) putdata.slot1 = $scope.selectSlot1;
		if ($scope.nodeInfo.slot2 != undefined) putdata.slot2 = $scope.selectSlot2;
		if ($scope.nodeInfo.console != undefined) putdata.console = $scope.selectConsole;
		if ($scope.nodeInfo.config != undefined) putdata.config = $scope.selectConfig;
		console.log(putdata)
		$http.put('/api/labs/'+$scope.path+'/nodes/'+id, putdata)
		.then(
			function successCallback(response){
				// console.log(response, "qqqqqqqqqqqqqqqqqqqqqqqqqq");
				$scope.result.result=true;
				$uibModalInstance.close($scope.result);
				$state.reload();
			},
			function errorCallback(response){
				console.log(response);
			}
		)
	}

  	$scope.closeModal = function () {
    	$uibModalInstance.dismiss('cancel');
  	};
};

function AddNetModalCtrl($scope, $uibModalInstance, $http, $rootScope, data) {
	
	$scope.netList={}
	$scope.netname='Net';
	$scope.tempObject=data.object;
	console.log($scope.tempObject)
	$scope.result={};
	$scope.result.result=false;
	
	$http.get('/api/list/networks').then(
		function successCallback(response){
			//console.log(response)
			$scope.netList=response.data.data
		}, function errorCallback(response){
			console.log('Server Error');
			console.log(response.data);
		}
	);

	$scope.closeModal = function () {
		$uibModalInstance.dismiss('cancel');
	};
	
	$scope.addNet = function () {
		$scope.result.data = { 
			'name': $scope.netname,
			'left': $scope.tempObject.pageX,
			'top': $scope.tempObject.pageY,
			'type': $scope.selectNetType,
			'count': 1,
			'postfix': 0
		}
		$http({
			method: 'POST',
			url:'/api/labs'+$rootScope.lab+'/networks',
			data: $scope.result.data}).then(
			function successCallback(response){
				console.log(response)
				$scope.result.data.id=response.data.data.id;
				$scope.result.result=true;
				$uibModalInstance.close($scope.result);
			}, function errorCallback(response){
				console.log('Server Error');
				console.log(response);
				//$uibModalInstance.close($scope.result);
			}
		);
	}
};

function editNetModalCtrl($scope, $uibModalInstance, $http, data) {
	
	$scope.netInfo={};
	$scope.netList={}
	$scope.path = data.path;
	var id = data.id;
	
	$http.get('/api/list/networks').then(
		function successCallback(response){
			//console.log(response)
			$scope.netList=response.data.data
		}, function errorCallback(response){
			console.log('Server Error');
			console.log(response.data);
		}
	);
	
	$http.get('/api/labs'+$scope.path+'/networks/'+id)
	.then(
		function successCallback(response){
			console.log(response);
			$scope.netInfo=response.data.data;
			$scope.oldName=$scope.netInfo.name;
			$scope.netInfo.id = id;
			$scope.selectNetType=$scope.netInfo.type;
		}
	)
	
	$scope.editNet = function(){
		var putdata = {
			'name' : $scope.netInfo.name,
			'type' : $scope.selectNetType,
			'top' : $scope.netInfo.top,
			'left' : $scope.netInfo.left,
		}
		$http.put('/api/labs/'+$scope.path+'/networks/'+$scope.netInfo.id, putdata)
		.then(
			function successCallback(response){
				console.log(response);
				putdata.result=true;
				putdata.id=$scope.netInfo.id;
				$uibModalInstance.close(putdata);
			},
			function errorCallback(response){
				console.log(response);
			}
		)
	}
	$scope.closeModal = function () {
	    $uibModalInstance.dismiss('cancel');
	};
};

function nodeListModalCtrl($scope, $uibModalInstance, $http, data, $rootScope, $state) {
	$scope.path=data.path;
	$scope.anychanges=false;
	$scope.nodeList={};
	$scope.iconTempObj={};
	$scope.imageTempObj={};
	$scope.templateList={};
	$scope.consoleTempObj={};
	$scope.configTempObj={};
	$scope.lastId = 0;
	$scope.refreshNodeList = function(){
	$http.get('/api/labs'+$scope.path+'/nodes')
	.then(
		function successCallback(response){
			// console.log(response);
			$scope.nodeList=response.data.data
			for (var key in $scope.nodeList){
				$scope.nodeList[key].newname=$scope.nodeList[key].name
				if ($scope.nodeList[key].cpu !== undefined) $scope.nodeList[key].newcpu=$scope.nodeList[key].cpu;
				if ($scope.nodeList[key].idlepc !== undefined) $scope.nodeList[key].newidlepc=$scope.nodeList[key].idlepc;
				if ($scope.nodeList[key].nvram !== undefined) $scope.nodeList[key].newnvram=$scope.nodeList[key].nvram;
				if ($scope.nodeList[key].ram !== undefined) $scope.nodeList[key].newram=$scope.nodeList[key].ram;
				if ($scope.nodeList[key].ethernet !== undefined) $scope.nodeList[key].newethernet=$scope.nodeList[key].ethernet;
				if ($scope.nodeList[key].serial !== undefined) $scope.nodeList[key].newserial=$scope.nodeList[key].serial;
				
				// if ($scope.nodeList[key].cpu == undefined) $scope.nodeList[key].cpu='N/A';
				// if ($scope.nodeList[key].config !== undefined) $scope.nodeList[key].newconfig=$scope.nodeList[key].config;
				// if ($scope.nodeList[key].consola !== undefined) $scope.nodeList[key].newconsola=$scope.nodeList[key].consola;
				console.log('status' , $scope.nodeList[key].status);
				//if ($scope.nodeList[key].status == 0)
				//	$scope.beforeEdit(key, $scope.nodeList[key].template)
			}
		},
		function errorCallback(response){
			console.log('Server Error');
			console.log(response);
		}
	)
	}
	// $http.get('/api/icons')
	// .then(
	// 	function successCallback(response){
	// 		console.log(response);
	// 		$scope.icon_list=response.data;
	// 	},
	// 	function errorCallback(response){
	// 		console.log('Server Error');
	// 		console.log(response);
	// 	}
	// )
	

	$scope.select_image = function(x)
  	{
  		$scope.selectIcon = x;
  		$scope.show = false;
  	}
	$scope.refreshNodeList();

	$scope.escEditMode = function(id){
		for (var key in $scope.nodeList){
			$scope.cancelChanges(id)
			$scope.nodeList[key].editmode=false;
		}
	}

	$scope.cancelChanges = function(id){
		//console.log($scope.nodeList[id])
		$scope.nodeList[id].newname=$scope.nodeList[id].name
		$scope.imageTempObj[id].selected=$scope.nodeList[id].image
		if ($scope.nodeList[id].cpu !== undefined) $scope.nodeList[id].newcpu=$scope.nodeList[id].cpu;
		if ($scope.nodeList[id].idlepc !== undefined) $scope.nodeList[id].newidlepc=$scope.nodeList[id].idlepc;
		if ($scope.nodeList[id].nvram !== undefined) $scope.nodeList[id].newnvram=$scope.nodeList[id].nvram;
		if ($scope.nodeList[id].ram !== undefined) $scope.nodeList[id].newram=$scope.nodeList[id].ram;
		if ($scope.nodeList[id].ethernet !== undefined) $scope.nodeList[id].newethernet=$scope.nodeList[id].ethernet;
		if ($scope.nodeList[id].serial !== undefined) $scope.nodeList[id].newserial=$scope.nodeList[id].serial;
		if ($scope.nodeList[id].serial !== undefined) $scope.nodeList[id].newconfig=$scope.nodeList[id].config;
		$scope.iconTempObj[id].selected.fullname=$scope.nodeList[id].icon;
		$scope.imageTempObj[id].selected.brname=$scope.nodeList[id].icon.replace('.png','');
		$scope.nodeList[id].editmode=false;
	}

	$scope.beforeEdit = function(id, template){
		$scope.escEditMode(id);
		if ($scope.lastId != id && $scope.lastId != 0)
		{
			$scope.nodeList[$scope.lastId].editmode = false;
		}	
		$scope.lastId = id;

		if($scope.nodeList[id].status != 0){
			if(confirm('Befor edit you should shutdown node. Do that now?')){
				$scope.startstopNode(id);
				$scope.nodeList[id].editmode=true;
			}
		} 
		else
		 
			$scope.nodeList[id].editmode=true;
		
		if ($scope.templateList[template] == undefined){
			$http.get('/api/list/templates/' + template)
			.then(
				function successCallback(response){
					console.log(response)
					$scope.templateList[template]=response.data.data.options
					$scope.templateList[template].icon.array=[];
					var iconIndex=0;
					for (var key in $scope.templateList[template].icon.list){
						$scope.templateList[template].icon.array[iconIndex]={'fullname' : key, 'brname' : $scope.templateList[template].icon.list[key]}
						iconIndex++
					}
					var imageIndex=0;
					$scope.templateList[template].image.array=[]
					for (var key in $scope.templateList[template].image.list){
						$scope.templateList[template].image.array[imageIndex]=key;
						imageIndex++
					}
				}
			)
		}
		console.log("done");
	}
	
	$scope.startstopNode = function(id){
		$scope.nodeList[id].startLoading=true;
		if($scope.nodeList[id].status == 0){
			//START NODE //START
			$http.get('/api/labs'+$scope.path+'/nodes/'+id+'/start').then(
				function successCallback(response){
					$scope.nodeList[id].status=2;
					$scope.nodeList[id].startLoading=false;
				}, function errorCallback(response){
					$scope.nodeList[id].startLoading=false;
					console.log('Server Error');
					console.log(response.data);
					toastr["error"](response.data.message, "Error");
				}
			);
			//START NODE //END
		} else if ($scope.nodeList[id].status == 2){
			//STOP NODE //START
			$http.get('/api/labs'+$scope.path+'/nodes/'+id+'/stop').then(
				function successCallback(response){
					$scope.nodeList[id].status=0;
					$scope.nodeList[id].startLoading=false;
				}, function errorCallback(response){
					$scope.nodeList[id].startLoading=false;
					console.log('Server Error');
					console.log(response.data);
					toastr["error"](response.data.message, "Error");
				}
			);
			//STOP NODE //END
		} else toastr["error"]('Unknown error', "Error");
	}
	
	$scope.applyChanges = function(id){
		console.log('applyChanges')
		// console.log("Node List" + $scope.consoleTempObj[id]);

		var putdata = {
			'template' : $scope.nodeList[id].template,
			'type' : $scope.nodeList[id].template,
			'id' : id,
			'name' : $scope.nodeList[id].name,
			'icon' : $scope.iconTempObj[id].selected.fullname,
			'image' : $scope.imageTempObj[id].selected,
			'postfix' : 0,
			'console' : $scope.consoleTempObj[id].selected,
			'config' : $scope.configTempObj[id].selected.key

		}
		if ($scope.nodeList[id].cpu !== undefined) putdata.cpu=$scope.nodeList[id].cpu;
		if ($scope.nodeList[id].idlepc !== undefined) putdata.idlepc=$scope.nodeList[id].idlepc;
		if ($scope.nodeList[id].nvram !== undefined) putdata.nvram=$scope.nodeList[id].nvram;
		if ($scope.nodeList[id].ram !== undefined) putdata.ram=$scope.nodeList[id].ram;
		if ($scope.nodeList[id].ethernet !== undefined) putdata.ethernet=$scope.nodeList[id].ethernet;
		if ($scope.nodeList[id].serial !== undefined) putdata.serial=$scope.nodeList[id].serial;

		console.log(putdata);
		$http.put('/api/labs'+$scope.path+'/nodes/'+id, putdata)
		.then(
			function successCallback(response){
				console.log(response + 'datele salvate');
				// $scope.refreshNodeList();
				// $scope.nodeList[id].editmode = false;
				// $scope.anychanges = false;
				
				// $scope.nodeList[id].cpu=$scope.nodeList[id].newcpu;
				// $scope.nodeList[id].idlepc=$scope.nodeList[id].newidlepc;
				// $scope.nodeList[id].nvram=$scope.nodeList[id].newnvram;
				// $scope.nodeList[id].ram=$scope.nodeList[id].newram;
				// $scope.nodeList[id].ethernet=$scope.nodeList[id].newethernet;
				// $scope.nodeList[id].serial=$scope.nodeList[id].newserial;
				// $scope.nodeList[id].config=$scope.nodeList[id].newconfig;
				// $scope.nodeList[id].name=$scope.nodeList[id].newname;

				// $scope.nodeList[id].icon=$scope.iconTempObj[id].selected.fullname;
				// $scope.nodeList[id].image=$scope.imageTempObj[id].selected;
				// $scope.nodeList[id].console=$scope.consoleTempObj[id].selected;
			},
			function errorCallback(response){
				console.log(response);
				$scope.refreshNodeList();
				$scope.anychanges = false;
			}
		)
	}
	
	$scope.deleteNode = function(id,name){
		if(!confirm('Do you realy want to delete '+name+'?'))return;
		console.log('Delete node with id '+id)
		$scope.anychanges=true;
		if ($scope.nodeList[id].count > 0) {$scope.anychanges=true;}
		$http({
			method: 'DELETE',
			url:'/api/labs'+$scope.path+'/nodes/'+id}).then(
			function successCallback(response){
				//console.log(response)
				console.log('Delete node done')
				$scope.anychanges=false;
				$scope.refreshNodeList();
			}, function errorCallback(response){
				console.log('Server Error');
				console.log(response);
			}
		);
	}
	
	
	$scope.closeModal = function () {
  		// console.log($scope.anychanges);
  		// $rootScope.topologyRefresh();
  		// if ($scope.anychanges==true)
  		// 	alert('So you need to edit some node, save and then close')
    // 	else
    		$state.reload();
    		$uibModalInstance.dismiss();
  	};

  	// $scope.closeBeforeEdit = function(id, template){
  	// 	$(document).on('click', '.modal', function(e){
  	// 		$scope.nodeList[id].editmode = false;
  	// 		console.log('click on modalclass');
  	// 	})
  	// }
  	// $scope.closeBeforeEdit();

	$scope.opacity = function(){
		$(".modal-content").toggleClass("modal-content_opacity");
	}

};

function netListModalCtrl($scope, $uibModalInstance, $http, data, $rootScope, $state) {
	$scope.path=data.path;
	$scope.astNetId = 0;
	// $scope.anychanges=false;
	$scope.netList={};

	$http.get('/api/list/networks').then(
		function successCallback(response){
			//console.log(response)
			$scope.netListType=response.data.data
		}, function errorCallback(response){
			console.log('Server Error');
			console.log(response.data);
		}
	);

	$scope.netListRefresh = function(){
	$http.get('/api/labs'+$scope.path+'/networks')
	.then(
		function successCallback(response){
			console.log(response);
			$scope.netList=response.data.data;
			for (var key in $scope.netList){
				$scope.netList[key].newname=$scope.netList[key].name;
				var img = "";
				if ($scope.netList[key].type == "bridge")
					img = "Switch";
				if ($scope.netList[key].type == "ovs")
					img = "Cloud";
				if ($scope.netList[key].type.indexOf("pnet") != -1)
					img = "Cloud";
				$("#networkID_" + $scope.netList[key].id).find("a img").attr("src", "/images/icons/" + img + ".png");
			}
		},

		function errorCallback(response){
			console.log('Server Error');
			console.log(response);
		}
	)
	}
	$scope.netListRefresh();
	
	$scope.cancelChanges = function(id){
		
		if (id !== undefined){
			$scope.netList[id].editmode=false;
			$scope.netList[id].newname=$scope.netList[id].name;
		} else {
			for (var key in $scope.netList){
				$scope.netList[key].editmode=false;
				$scope.netList[key].newname=$scope.netList[key].name;
			}
		}
	}
	
	$scope.escEditMode = function(id){
		for (var key in $scope.netList){
			$scope.netList[key].editmode=false;
		}
	}

	$scope.editMode=function(id){
		if ($scope.astNetId != id && $scope.astNetId != 0)
		{
			$scope.nodeList[$scope.lastNetId].editmode = false;
		}	
		$scope.astNetId = id;
		//$scope.cancelChanges();
		$scope.netList[id].editmode=true;
		
	}
	$scope.applyChanges=function(id){
		var putdata = {
			'name' : $scope.netList[id].name,
			'type' : $scope.netList[id].type,
		}
		$http.put('/api/labs/'+$scope.path+'/networks/'+id, putdata)
		.then(
			function successCallback(response){
				$scope.netList[id].editmode=false;
				// $scope.anychanges=false;
				$scope.netListRefresh();
			},
			function errorCallback(response){
				console.log(response);
				$scope.netListRefresh();
				$scope.anychanges=false;
			}
		)
	}
	
	$scope.deleteNet = function(id,name){
		if(!confirm('Do you realy want to delete '+name+'?'))return;
		console.log('Delete node with id '+id)
		if ($scope.netList[id].count > 0) 
			{
				// $scope.anychanges=true;
			} else 
			{
				$('#networkID_'+id).remove();
			}
		$http({
			method: 'DELETE',
			url:'/api/labs'+$scope.path+'/networks/'+id}).then(
			function successCallback(response){
				// console.log(response)
				// console.log('Delete network done')
				$scope.netListRefresh();
				$scope.netList=response.data.data;
				$rootScope.topologyRefresh();
				// $scope.anychanges=false;
			}, function errorCallback(response){
				console.log('Server Error');
				console.log(response);
				// $scope.anychanges=false;
			}
		);

	}

  	$scope.closeModal = function() {
  		console.log($scope.anychanges);
  		// if ($scope.anychanges==true)
  		// 	alert('So you need to edit some network, save and then close')
    // 	else
    		$uibModalInstance.dismiss();
    		$state.reload();
  	};

  	$scope.opacity = function(){
		$(".modal-content").toggleClass("modal-content_opacity");
	}

	
};

function sysStatModalCtrl($scope, $uibModalInstance, $http, $interval, $rootScope) {
	
	$rootScope.sysStat=true;
	$scope.versiondata='';
	$scope.serverstatus=[];
	$scope.valueCPU = 0;
	$scope.valueMem = 0;
	$scope.valueSwap = 0;
	$scope.valueDisk = 0;
	$scope.optionsCPU = {
		unit: "%",
		readOnly: true,
		size: 150,
		subText: {
			enabled: true,
			text: 'CPU used',
			color: 'gray',
			font: 'auto'
		},
		trackWidth: 10,
		barWidth: 15,
		trackColor: '#656D7F',
		barColor: '#2CC185'
	};
	
	$scope.optionsMem = {
		unit: "%",
		readOnly: true,
		size: 150,
		subText: {
			enabled: true,
			text: 'Memory used',
			color: 'gray',
			font: 'auto'
		},
		trackWidth: 10,
		barWidth: 15,
		trackColor: '#656D7F',
		barColor: '#2CC185'
	};
	
	$scope.optionsSwap = {
		unit: "%",
		readOnly: true,
		size: 150,
		subText: {
			enabled: true,
			text: 'Swap used',
			color: 'gray',
			font: 'auto'
		},
		trackWidth: 10,
		barWidth: 15,
		trackColor: '#656D7F',
		barColor: '#2CC185'
	};
	
	
	$scope.optionsDisk = {
		unit: "%",
		readOnly: true,
		size: 150,
		subText: {
			enabled: true,
			text: 'Disk used',
			color: 'gray',
			font: 'auto'
		},
		trackWidth: 10,
		barWidth: 15,
		trackColor: '#656D7F',
		barColor: '#2CC185'
	};
	$scope.systemstat = function(){
		$http.get('/api/status').then(
				function successCallback(response) {
					//console.log(response.data.data)
					$scope.serverstatus=response.data.data;
					$scope.valueCPU = $scope.serverstatus.cpu;
					$scope.valueMem = $scope.serverstatus.mem;
					$scope.valueSwap = $scope.serverstatus.swap;
					$scope.valueDisk = $scope.serverstatus.disk;
					$scope.versiondata="Current API version: "+response.data.data.version;
				}, 
				function errorCallback(response) {
					console.log("Unknown Error. Why did API doesn't respond?"); 
					//$location.path("/login");
				}	
		);
	}
	$scope.opacity = function(){
		$(".modal-content").toggleClass("modal-content_opacity");
	}
	$scope.systemstat()
	stop = $interval(function () {
			//if ($location.path() == '/sysstat') 
				$scope.systemstat()
    }, 2000, 15);

	$scope.closeModal = function () {
		$interval.cancel(stop);
		$uibModalInstance.dismiss('cancel');
	};
};


function startUpConfigModalCtrl($scope, $uibModalInstance, $http, data) {
	$scope.path=data.path;
	$http.get('/api/labs'+$scope.path+'/configs')
	.then(
		function successCallback(response){
			console.log(response);
			$scope.configList=response.data.data
		},
		function errorCallback(response){
			console.log('Server Error');
			console.log(response);
		}
	);

	$scope.closeModal = function () {
		$uibModalInstance.dismiss('cancel');
	};
 	 $scope.openConfigForm = function (id){
		$("#stockdata").val(id);
		$http.get('/api/labs'+$scope.path+'/configs/' + id)
		.then(
			function successCallback(response){
				$("#nodeconfig").val(response.data.data.data)
			},
			function errorCallback(response){
				console.log('Server Error');
				console.log(response);
			}
		)	
		$('#form-node-config').removeClass('form-horizontal--hidden').addClass('form-horizontal--active')
	}
	$scope.saveChanged = function(){
		var id = $("#stockdata").val();
		var putdata = {
			'data' : $("#nodeconfig").val(),
			'id' : id,
		}
		
		$http.put('/api/labs'+$scope.path+'/configs/' + id, putdata)
		.then(
			function successCallback(response){
				console.log(response);
			},
			function errorCallback(response){
				console.log(response);
			}
		)
		console.log("s-a transmis")
	}
	$scope.opacityVar;
	$scope.opacity = function(){
		$(".modal-content").toggleClass("modal-content_opacity");
	}
};

function labDetailsModalCtrl($scope, $uibModalInstance, $http, data) {
	$scope.path=data.path;
	$http.get('/api/labs'+$scope.path)
	.then(
		function successCallback(response){
			console.log(response);
			$scope.labData=response.data.data
		},
		function errorCallback(response){
			console.log('Server Error');
			console.log(response);
		}
	);

	$scope.closeModal = function () {
    	$uibModalInstance.dismiss('cancel');
  	};

  	$scope.opacity = function(){
		$(".modal-content").toggleClass("modal-content_opacity");
	}
};

function configObjectModalCtrl($scope, $uibModalInstance, $http, data) {
	console.log("se incarca")
	$scope.path=data.path;
	$http.get('/api/labs'+$scope.path)
	.then(
		function successCallback(response){
			console.log(response);
			$scope.labData=response.data.data
		},
		function errorCallback(response){
			console.log('Server Error');
			console.log(response);
		}
	);

	$scope.closeModal = function () {
    	$uibModalInstance.dismiss('cancel');
  	};

  	$scope.opacity = function(){
		$(".modal-content").toggleClass("modal-content_opacity");
	}
};

function editLabModalCtrl($scope, $uibModalInstance, $http, data, $rootScope) {
	console.log("se incarca")
	$scope.path = data.path;
	$scope.anychanges = false;
	$scope.editLab = {};
	$scope.digits = {};
	$scope.restrictTest = '\\d+';
	$scope.restrictNumber = '^[a-zA-Z0-9-_ ]+$';

	$http.get('/api/labs'+$scope.path)
	.then(
		function successCallback(response){
			console.log(response);
			$scope.labData=response.data.data;
		},
		function errorCallback(response){
			console.log('Server Error');
			console.log(response);
		}
	);

	$scope.saveChanged = function(){
		var putdata = {
			"name" : $scope.labData.name,
			"version" : $scope.labData.version,
			"author" : $scope.labData.author,
			"scripttimeout" : $scope.labData.scripttimeout,
			"description" : $scope.labData.description,
			"body" : $scope.labData.body
		}

		$http.put('/api/labs'+$scope.path, putdata)
		.then(
			function successCallback(response){
				console.log('S-a salvat')
				//console.log("basename" , basename($scope.path));
				//console.log("dirname" , dirname($scope.path));
				console.log($scope.path)
				if (basename($scope.path) != $scope.labData.name + '.unl')
				{
					$rootScope.lab = dirname($scope.path) + $scope.labData.name + '.unl'
					//$scope.path = dirname($scope.path) + $scope.labData.name + '.unl'
				}
				// console.log($scope.path)
				$scope.labData=response.data.data;
				$scope.refreshEditLab();
			},
			function errorCallback(response){
				console.log('Server Error');
				console.log(response);
			}
		);
	}

	$scope.closeModal = function () {
    	$uibModalInstance.dismiss('cancel');
  	};

  	$scope.opacity = function(){
		$(".modal-content").toggleClass("modal-content_opacity");
	};

	$scope.refreshEditLab = function(){
		$http.get('/api/labs'+$scope.path)
		.then(
			function successCallback(response){
				console.log(response);
				$scope.labData=response.data.data
			
			},
			function errorCallback(response){
				console.log('Server Error');
				console.log(response);
			}
		)
	}	
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////Scripturi experimentale.

// $scope.patern = function(){
	// 	var valid = formLabEdit.version.$valid;
	// 	if(valid == false)
	// 	{
	// 		$(".chars").css("color", "blue")
	// 	}

	// }





// 	$('input').keyup(function() {
//     var $th = $(this);
//     $th.val( $th.val().replace(/[^a-zA-Z0-9]/g, function(str) { alert('You typed " ' + str + ' ".\n\nPlease use only letters and numbers.'); return ''; } ) );
// });

// 	$('input').on('keypress', function(event){
//         var char = String.fromCharCode(event.which);
//         var txt = $(this).val();
//         if (!txt.match(/^[0-9]*$/)){
//             var changeTo = txt.replace(char, '')
//             $(this).val(changeTo).change();
//         }
// });
	