var myApp = angular.module("myApp",[]);
 
myApp.controller("ContactListCtrl", function( $scope, $http ){
    $http.get('json/contact.json').success(function(data) {
		$scope.data = data;
	  });
	$scope.headers = ["age","city","country","firstName","id","lastName","postalCode"];
	$scope.dataPageSize = 10;
	$scope.setPageSize = function(pageSize){$scope.dataPageSize = pageSize;}
	$scope.toggleHeader = function( header ){
		var headerIndex = $scope.headers.indexOf(header);
		if ( headerIndex >= 0 ){
		$scope.headers.splice(headerIndex,1);
		}else{
		$scope.headers.push(header);
		}
	};
	 
	$scope.orderTableBy = function(header){
		if ( $scope.orderHeader == header && $scope.orderDirection == false){
		$scope.orderHeader = null;
		}
		else if ( $scope.orderHeader == header ){
		$scope.orderDirection = false;
		}else{
		$scope.orderHeader = header;
		$scope.orderDirection = true;
		}
	};
});
 
myApp.filter("pageFilter", function(){
	return function(input, currentPage, pageSize ){
	return input ? input.slice(currentPage * pageSize, currentPage * ( pageSize + 1 )) : [];
	}
});

myApp.directive("pagination", function(){
 	return {template:'<div><button ng-disabled="!hasPrevious()" ng-click="onPrev()"> Previous </button> {{start()}} - {{end()}} of {{size()}} <button ng-disabled="!hasNext()" ng-click="onNext()"> Next </button><div ng-transclude="" style="margin-top: 20px;"></div> </div>', restrict:'AEC', transclude:true, scope:{'currentPage':'=', 'pageSize':'=', 'data':'&'},

	link:function($scope, element, attrs){
	 	$scope.size = function(){
		 	return angular.isDefined($scope.data()) ? $scope.data().length : 0;
		};
		$scope.end = function(){
			return $scope.start() + $scope.pageSize;
		};
		$scope.start = function(){
			return $scope.currentPage * $scope.pageSize;
		};
		$scope.page = function(){
			return !!$scope.size() ? ( $scope.currentPage + 1 ) : 0;
		};
		$scope.hasNext = function(){
			return $scope.page() < ( $scope.size() / $scope.pageSize ) ;
		};
		$scope.onNext = function(){
			$scope.currentPage = parseInt($scope.currentPage) + 1;
		};
		$scope.hasPrevious = function(){
			return !!$scope.currentPage;
		};
		$scope.onPrev = function(){
			$scope.currentPage=$scope.currentPage-1;
		};
		try{
			if ( typeof($scope.data) == "undefined"){
				$scope.data = [];
			}
			if ( typeof($scope.currentPage) == "undefined" ){
				$scope.currentPage = 0;
			}
			if ( typeof($scope.pageSize) == "undefined"){
				$scope.pageSize = 10;
			}
		}catch(e){ console.log(e);}
	}
  }
})
 
 




