var baoliehua = function (){
	//测试通过
	function chunk(array,n){
		var result = [];
		while(array.length > n ){
			result.push(array.slice(0,n));
			array = array.slice(n);
		}
		if(array.length){
			result.push(array);
		}
		return result;
	}
	function compact(array) {
		var result = [];
		for (var i = 0; i < array.length; i++) {
			if(array[i]){
				result.push(array[i]);
			}
		}
		return result;
	}
	function concat(...argument) {
		var result = [];
		for(var i = 0;i < argument.length;i++){
			if (Object.prototype.toString.call(argument[i]) === "[object Array]") {
				result = [...result,...argument[i]];
			}else{
				result.push(argument[i]);
			}
		}
		return result;
	}
	//未测试
	function difference(array1,...array2) {
		var result;
		for(var j = 0;j < array2.length;j++){
			result = [];
		for(var i = 0;i < array1.length;i++){
			if(!array2[j].includes(array1[i])){
				result.push(array1[i]);
			}
			array1 = result;
		}
		}
		return array1;
	}
	function differenceBy (...argument) {
		var result = [];
		if (Object.prototype.toString.call(argument[argument.length -1]) === "[object Array]") {
			return difference(argument[0],argument.slice(1));
		}
		if (argument[0]  === "[object Object]") {
			for (var i = 0; i < argument.length - 1; i++) {
				for (var j in argument[i]) {
					argument[i][j] = argument[i][j][argument[argument.length - 1]];
				}
			}
			return difference(argument[0],argument.slice(1,argument.length - 1));
		}
		if (Object.prototype.toString.call(argument[argument.length -1]) === "[object Function]") {
			for (var i = 0; i < argument.length - 1; i++) {
				for (var j in argument[i]) {
					argument[i][j] = argument[argument.length - 1](argument[i][j]);
				}
	    }
	    return difference(argument[0],argument.slice(1,argument.length - 1));
	}

	function drop(array,n) {
		while(n){
			array.shift();
			n--;
		}
		return array;
	}

    function dropRight(array,n) {
		while(n){
			array.pop();
			n--;
		}
		return array;
	}

	function dropWhile(array,n) {
		while(n){
			array.shift();
			n--;
		}
		return array;
	}

	function fill(...argument) {
		if(argument.length === 2){
			argument[0].forEach(i => argument[1])
		}else{
			for(var i = argument[2];i < argument[3];i++){
				argument[0][i] = argument[1];
			}
		}
		return argument[0];
	}

	function head(array) {
			return array[0];// body...
		}	
   
    function indexOf(...argument) {
    	var index = argument[2]?argument[2]:0;
    	for (var i = index; i < argument[0].length; i++) {
    		if(argument[0][i] === argument[1]){
    			return i;
    		}
    	}
    	return -1;
    }

    function initial(array) {
    	array.pop();
    	return array; 
    }

    function intersection(...argument) {
    	var result = [];
    	for(var i = 0;i < argument[0].length;i++){
    		for (var j = 1; j < argument.length; j++) {
    			if(!argument[j].includes(argument[0][i])){
    				break;
    			}
    		}
    		result.push(argument[0][i]);
    	}
    	return result;
    }

    function join(array,str){
    	var result = array.shift();
    	while(array.length){
    		result += str + array.shift()
    	}
    	return result;
    }

    function last(array) {
    	return array.pop();
    }

    function lastIndexOf(array){
    	
    }


}()