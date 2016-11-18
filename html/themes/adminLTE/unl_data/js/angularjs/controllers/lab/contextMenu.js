  "use strict";
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //
  // H E L P E R    F U N C T I O N S
  //
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Function to check if we clicked inside an element with a particular class
   * name.
   * 
   * @param {Object} e The event
   * @param {String} className The class name to check against
   * @return {Boolean}
   */
  function clickInsideElement( e, className ) {
    var el = e.srcElement || e.target;
	if ( ( e.path && e.path[0].tagName == 'path' ) || el.classList.contains('aLabel')) return false;
    if ( el.classList.contains(className) ) {
      return el;
    } else {
      while ( el = el.parentNode ) {
        if ( el.classList && el.classList.contains(className) ) {
          return el;
        }
      }
    }

    return false;
  }

  /**
   * Get's exact position of event.
   * 
   * @param {Object} e The event passed in
   * @return {Object} Returns the x and y position
   */
  function getPosition(e) {
    var posx = 0;
    var posy = 0;
    if (!e) var e = window.event;
    
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return {
      x: posx,
      y: posy
    }
  }

var contextMenuInit = function() {
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //
  // C O R E    F U N C T I O N S   T O   E L E M E N T S
  //
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * Variables.
   */
  var contextMenuClassName = "context-menu";
  var contextMenuItemClassName = "context-menu__item";
  var contextMenuLinkClassName = "context-menu__link";
  var contextMenuActive = "context-menu--active";
  
  var contextMenuClassName_mainDiv = "context-menu_mainDiv";
  var contextMenuItemClassName_mainDiv = "context-menu__item_mainDiv";
  var contextMenuLinkClassName_mainDiv = "context-menu__link_mainDiv";
  var contextMenuActive_mainDiv = "context-menu_mainDiv--active";

  //leftClick 
  var contextMenuClassName_leftClick = "context-menu_leftClick";
  var contextMenuItemClassName_leftClick = "context-menu__item_leftClick";
  var contextMenuLinkClassName_leftClick = "context-menu__link_leftClick";
  var contextMenuActive_leftClick = "context-menu_leftClick--active";

  var contextMenuClassName_freeSelect = "context-menu_freeSelect";
  var contextMenuItemClassName_freeSelect = "context-menu__item_freeSelect";
  var contextMenuLinkClassName_freeSelect = "context-menu__link_freeSelect";
  var contextMenuActive_freeSelect = "context-menu_freeSelect--active";

  var taskItemClassName = "element-menu";
  var taskItemClassName_mainDiv = "mainDiv-menu";
  var taskItemClassName_leftClick = "leftClick-menu"; //leftClick 
  var taskItemClassName_freeSelect = "freeSelect-menu"; //leftClick 
  var taskItemInContext;

  var clickCoords;
  var clickCoordsX;
  var clickCoordsY;
  
  var menuConn = document.querySelector("#context-menu_conn");
  var menuNet = document.querySelector("#context-menu_net");
  var menuLeftClick = document.querySelector("#context-menu_leftClick"); //leftClick
  var menuFreeSelect = document.querySelector("#context-menu_freeSelect"); //leftClick

  var menu = document.querySelector("#context-menu");
  var menu_mainDiv = document.querySelector("#context-menu_mainDiv");
  var menu_leftClick = document.querySelector("#context-menu_leftClick");
  var menu_freeSelect = document.querySelector("#context-menu_freeSelect");
  var menuItems = menu.querySelectorAll(".context-menu__item");
  var menuState = 0;
  var menuState_mainDiv = 0;
  var menuState_leftClick = 0;
  var menuState_freeSelect = 0;
  var menuWidth;
  var menuHeight;
  var menuPosition;
  var menuPositionX;
  var menuPositionY;

  var windowWidth;
  var windowHeight;

  /**
   * Initialise our application's code.
   */
  function init() {
    freeSelectNode();
    // nodeClick();
    contextListener();
    clickListener();
    keyupListener();
    resizeListener();
    freeSelectPopUp();
    
  }
  /*Open context menu //context-meniu_leftClick */
  // function nodeClick(){
  //   $(document).on("click", ".element-menu", function(e){
  //     console.log("click la inceput")
  //     e.preventDefault();
  //     e.stopPropagation();
  //     var pos = getPosition(e);
  //     $('#tempElID').val(e.target.parentElement.parentElement.id);
  //     $("#context-menu_leftClick").addClass("context-menu_leftClick--active").css("left", pos.x).css("top", pos.y);
  //     console.log("open context-meniu_leftClick");

  //     setTimeout(function() {
  //       menuState_leftClick = 1
  //     }, 100);
  //     console.log($scope.iconTempObj)
  //   })
  // }

  function freeSelectPopUp(){
    $(document).on("contextmenu", ".free-selected", function(e){
      console.log("click la inceput");
      e.preventDefault();
      e.stopPropagation();
      var pos = getPosition(e);
      $("#context-menu_freeSelect").addClass("context-menu_freeSelect--active").css("left", pos.x).css("top", pos.y);
      $("#context-menu").removeClass("context-menu--active");
      console.log("open context-meniu_freeSelect");

      setTimeout(function() {
        menuState_freeSelect = 1
      }, 100);
      
      console.log($scope.iconTempObj)
    })
  }
  /**
   * Listens for contextmenu events.
   */
  function contextListener() {
    document.addEventListener( "contextmenu", function(e) {
      //taskItemInContext = clickInsideElement( e, taskItemClassName );
      if ( clickInsideElement( e, taskItemClassName ) ) {
        e.preventDefault();
		    console.log( 'Context menu on '+e.target.parentElement.parentElement.id)
		    console.log(e.target.parentElement.parentElement.id)
		    $('#tempElID').val(e.target.parentElement.parentElement.id)
        toggleMenuOn(taskItemClassName);
        positionMenu(e);
      } else {
        taskItemInContext = null;
        toggleMenuOff(taskItemClassName);
		    if ( clickInsideElement( e, taskItemClassName_mainDiv ) ){
			   e.preventDefault();
			//console.log(clickInsideElement( e, taskItemClassName ))
			   toggleMenuOn(taskItemClassName_mainDiv);
			   positionMenu(e);
		      } else {
			     taskItemInContext = null;
			     toggleMenuOff(taskItemClassName_mainDiv);
		      }
      }
    });
  }
  //////////////////////////////////////
  ////
  function freeSelectNode(){
        $(document).on('click', ".element-menu", function(e) {
          if($("#freeSelect").hasClass("activeFreeSelect") )
          {
            $(this).toggleClass('free-selected')       
          }
          else
          {
            console.log('')
          }
      })
  }
  
  /**
   * Listens for click events.
   */
  function clickListener() {
    document.addEventListener( "click", function(e) {
      var clickeElIsLink = clickInsideElement( e, contextMenuLinkClassName );

      if ( false ) {
        e.preventDefault();
        menuItemListener( clickeElIsLink );
      } else {
        var button = e.which || e.button;
        if ( button === 1 ) {
          toggleMenuOff('closeAll');
        }
      }
    });
  }

  /**
   * Listens for keyup events.
   */
  function keyupListener() {
    window.onkeyup = function(e) {
      if ( e.keyCode === 27 ) {
        toggleMenuOff('closeAll');
      }
    }
  }

  /**
   * Window resize event listener
   */
  function resizeListener() {
    window.onresize = function(e) {
      toggleMenuOff('closeAll');
    };
  }

  /**
   * Turns the custom context menu on.
   */
  function toggleMenuOn(target) {
	toggleMenuOff('closeAll')
	if ( menuState !== 1 && target=="element-menu") {
      menuState = 1;
      menu.classList.add( contextMenuActive );
      if ($(".free-selected").length)
      {
        $("#nodesGroup-content").show();
        $("#network_content").hide();
        $("#node_content").hide();
      }
      else
      {
        $("#nodesGroup-content").hide();
        if($("#tempElID").val().indexOf("networkID_") != -1)
        {
          $("#network_content").show();
          $("#node_content").hide();
        }
        else
        {
          $("#network_content").hide();
          $("#node_content").show();
        }
      }
	  $("#context-menu_conn").removeClass('context-menu_conn--active')
	  return;
    }
    if ( menuState_mainDiv !== 1 && target=="mainDiv-menu") {
      menuState_mainDiv = 1;
      $(menu_mainDiv).addClass( contextMenuActive_mainDiv );
	  $("#context-menu_conn").removeClass('context-menu_conn--active')
	  return
    }
  }

  /**
   * Turns the custom context menu off.
   */
  function toggleMenuOff(target) {
    if ( menuState !== 0 && target=="element-menu" || target=="closeAll") {
      menuState = 0;
      menu.classList.remove( contextMenuActive );
    }
	
	if ( menuState_mainDiv !== 0 && target=="mainDiv-menu" || target=="closeAll") {
      menuState_mainDiv = 0;
      $(menu_mainDiv).removeClass( contextMenuActive_mainDiv );
    }
  if ( menuState_leftClick !== 0 && (target=="element-menu" || target=="closeAll")) {
      menuState_leftClick = 0;
      $(menu_leftClick).removeClass( contextMenuActive_leftClick );
    }
  if ( menuState_freeSelect !== 0 && (target=="element-menu" || target=="closeAll")) {
      menuState_freeSelect = 0;
      $(menu_freeSelect).removeClass( contextMenuActive_freeSelect );
    }
  }

  /**
   * Positions the menu properly.
   * 
   * @param {Object} e The event
   */
  function positionMenu(e) {
    clickCoords = getPosition(e);
    clickCoordsX = clickCoords.x;
    clickCoordsY = clickCoords.y;

    menuWidth = menu.offsetWidth + 4;
    menuWidth = menu_mainDiv.offsetWidth + 4;
    menuHeight = menu.offsetHeight + 4;
    menuHeight = menu_mainDiv.offsetHeight + 4;

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    if ( (windowWidth - clickCoordsX) < menuWidth ) {
      menu.style.left = windowWidth - menuWidth + "px";
      menu_mainDiv.style.left = windowWidth - menuWidth + "px";
    } else {
      menu.style.left = clickCoordsX + "px";
      menu_mainDiv.style.left = clickCoordsX + "px";
    }

    if ( (windowHeight - clickCoordsY) < menuHeight ) {
      menu.style.top = windowHeight - menuHeight + "px";
      menu_mainDiv.style.top = windowHeight - menuHeight + "px";
    } else {
      menu.style.top = clickCoordsY + "px";
      menu_mainDiv.style.top = clickCoordsY + "px";
    }
  }

  /**
   * Run the app.
   */
  init();

}

var contextMenuInitConn = function() {
	console.log('init the contextMenuInitConn')
//////////////////////////////
jsPlumb.bind("contextmenu", function (c,e) {
	//e.preventDefault();
    //console.log(c.canvas);
    //console.log(e);
    $scope.tempConn = e;
	
	
	function clickInsideElement_conn( e, className ) {
		var el = e.srcElement || e.target;
		if ( el.classList.contains(className) ) {
		return el;
		} else {
		while ( el = el.parentNode ) {
			if ( el.classList && el.classList.contains(className) ) {
			return el;
			}
		}
		}
	
		return false;
	}
	
	/**
	* Variables.
	*/
	var contextMenuClassName = "context-menu_conn";
	var contextMenuItemClassName = "context-menu__item_conn";
	var contextMenuLinkClassName = "context-menu__link_conn";
	var contextMenuActive = "context-menu_conn--active";
	
	var taskItemClassName = "element-menu";
	var taskItemInContext;
	
	var clickCoords;
	var clickCoordsX;
	var clickCoordsY;
	
	var menu = document.querySelector("#context-menu_conn");
	var menuItems = menu.querySelectorAll(".context-menu__item_conn");
	var menuState = 0;
	var menuWidth;
	var menuHeight;
	var menuPosition;
	var menuPositionX;
	var menuPositionY;
	
	var windowWidth;
	var windowHeight;
	
	/**
	* Initialise our application's code.
	*/
	e.preventDefault();
	toggleMenuOn_conn();
	positionMenu_conn(e)
	keyupListener_conn();
	resizeListener_conn();
	clickListener_conn();
	
	function getPosition_conn(e) {
		var posx = 0;
		var posy = 0;
		if (!e) var e = window.event;
		
		if (e.pageX || e.pageY) {
			posx = e.pageX;
			posy = e.pageY;
		} else if (e.clientX || e.clientY) {
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return {
			x: posx,
			y: posy
		}
	}
	
	function positionMenu_conn(e) {
		clickCoords = getPosition_conn(e);
		clickCoordsX = clickCoords.x;
		clickCoordsY = clickCoords.y;
	
		menuWidth = menu.offsetWidth + 4;
		menuHeight = menu.offsetHeight + 4;
	
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
	
		if ( (windowWidth - clickCoordsX) < menuWidth ) {
		menu.style.left = windowWidth - menuWidth + "px";
		} else {
		menu.style.left = clickCoordsX + "px";
		}
	
		if ( (windowHeight - clickCoordsY) < menuHeight ) {
		menu.style.top = windowHeight - menuHeight + "px";
		} else {
		menu.style.top = clickCoordsY + "px";
		}
	}
	
	/**
	* Listens for click events.
	*/
	function clickListener_conn() {
		document.addEventListener( "click", function(e) {
		var clickeElIsLink = clickInsideElement_conn( e, contextMenuLinkClassName );
		if ( clickeElIsLink ) {
			e.preventDefault();
			menuItemListener( clickeElIsLink );
		} else {
			var button = e.which || e.button;
			if ( button === 1 ) {
			toggleMenuOff_conn();
			}
		}
		});
	}
	
	/**
	* Listens for keyup events.
	*/
	function keyupListener_conn() {
		window.onkeyup = function(e) {
		if ( e.keyCode === 27 ) {
			toggleMenuOff_conn();
		}
		}
	}
	
	/**
	* Window resize event listener
	*/
	function resizeListener_conn() {
		window.onresize = function(e) {
		toggleMenuOff_conn();
		};
	}
	

	
	function toggleMenuOn_conn() {
		if ( menuState !== 1 ) {
			menuState = 1;
			menu.classList.add( contextMenuActive );
		}
	}

	/**
	* Turns the custom context menu off.
	*/
	function toggleMenuOff_conn() {
		if ( menuState !== 0 ) {
			menuState = 0;
			menu.classList.remove( contextMenuActive );
		}
	}
	/**
	* Dummy action function that logs an action when a menu item link is clicked
	* 
	* @param {HTMLElement} link The link that was clicked
	*/
	function menuItemListener( link ) {
		//console.log(link.getAttribute("my-action"))
		//console.log(c)
		toggleMenuOff_conn();
		switch (link.getAttribute("my-action")){
			case 'delConnection':
			$scope.delConn(c)
			break;
		}
	}
})
//////////////////////////////
}

/*
$(".higlited").each(function(){
  //start node
  var id = $(this).attr("id");
  id = id.replace("nodeID_", "");
})
        */

