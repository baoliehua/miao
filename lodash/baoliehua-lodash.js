var baoliehua = function() {
	/**公用函数区，待添加 
	1、迭代器

	**/
  function identity(...value) {
    return value[0];
  }

  function iteratee(argument) {
    if (Object.prototype.toString.call(argument) === "[object String]") {
      return function (object) {
        return object[argument] === undefined;
      }
    }else if(Object.prototype.toString.call(argument) === "[object Array]"||Object.prototype.toString.call(argument) === "[object Object]"){
      return function (object) {
        for(var i in object){
          if(argument[i] !== object[i]){
            return false;
          }
        }
        return true;
      }
    }else if(Object.prototype.toString.call(argument) === "[object RegExp]"){
      return function (object) {
        return argument.test(object);
    }
  }else if(Object.prototype.toString.call(argument) === "[object Function]"){
    console.log("function");
    return argument;
  }
}
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
	
	function difference(array1,...array2) {
		var result =[],arr = [];
		for(var j = 0;j < array2.length;j++){
		  arr = arr.concat(array2[j]);
		}
    for (var i = 0; i < array1.length; i++) {
      if(!arr.includes(array1[i])){
        result.push(array1[i]);
      }
    }
		return result;
	}


	function differenceBy (array,...arg) {
		var result = [];
    var func = iteratee(arg[arg.length - 1]);
    //console.log(func,arg[arg.length-1],arg);
    var arr = [];
    for (var i = 0; i < arg.length - 1; i++) {
      for (var j = 0; j < arg[i].length; j++) {
        arr.push(func(arg[i][j]));
      }
    }
    for (var z = 0; z < array.length; z++) {
      if(!arr.includes(func(array[z]))){
        result.push(array[z]);
      }
    }
    return result;
  }


  function differenceWith (array,...arg) {
    var result = [];
    var func = iteratee(arg[arg.length - 1]);
    //console.log(func,arg[arg.length-1],arg);
    var arr = [];
    for (var i = 0; i < arg.length - 1; i++) {
      for (var j = 0; j < arg[i].length; j++) {
        arr.push(arg[i][j]);
      }
    }
    for (var z = 0; z < array.length; z++) {
      if(func(array[z],arr)){
        result.push(array[z]);
      }
    }
    return result;
  }


	function drop(array,n) {
    if(arguments[1] === undefined){
      array.shift();
      return array;
    }
		while(n){
			array.shift();
			n--;
		}
		return array;
	}

    function dropRight(array,n) {
    if(arguments[1] === undefined){
      array.pop();
      return array;
    }
		while(n){
			array.pop();
			n--;
		}
		return array;
	}

	function dropWhile(array,n) {
    var result = [];
    var func = iteratee(n);
		for (var i = 0; i < array.length; i++) {
      if(!func(array[i])){
        result.push(array[i])
      }
    }
    return result;
	}

	function fill(...argument) {
    if(argument.length === 2){
      for (var i = 0; i < argument[0].length; i++) {
        argument[0][i] = argument[1];
      };
    }else{
      for(var i = argument[2];i < argument[3];i++){
        argument[0][i] = argument[1];
      }
    }
    return argument[0];
  }

  function findIndex(array,...arg) {
    var func = iteratee(arg[0]);
    var index = arg.length > 1?arg[arg.length - 1]:0;
    for (var i = index; i < array.length; i++) {
      if(func(array[i])){
        return i;
      }
    }
    return -1;
  }

  function findIndex(array,...arg) {
    var func = iteratee(arg[0]);
    var index = arg.length > 1?arg[arg.length - 1]:array.length - 1;
    for (var i = index; i >= 0; i--) {
      if(func(array[i])){
        return i;
      }
    }
    return -1;
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
        var key = 1;
    		for (var j = 1; j < argument.length; j++) {
    			if(!argument[j].includes(argument[0][i])){
    				key = 0;
    			}
    		}
    		key?result.push(argument[0][i]):1;
    	}
    	return result;
    }

    function join(array,str){
    	var result ="" + array.shift();
    	while(array.length){
    		result =result + str + array.shift()//result += str + array.shift();会先将等号右边加好；
        console.log(result,array)
    	}
    	return result;
    }

    function last(array) {
    	return array.pop();
    }

    function lastIndexOf(){
    	var index = arguments[2]?arguments[2]:arguments[0].length - 1;
    	for (var i = index; i >= 0; i--) {
    		if(arguments[0][i] === arguments[1]){
    			return i;
    		}
    	}
    	return -1;
    }

    function nth(array,n) {
    	return n > 0 ? array[n]:array[array.length + n];
    }

    function pull(array1,...arg){
    	var result = [];
    	for (var i = 0; i < array1.length; i++) {
    		if(!arg.includes(array1[i])){
    			result.push(array1[i]);
    		}
    	}
    	return result;
    }

     function pullAll(array1,array2){
    	var result = [];
    	for (var i = 0; i < array1.length; i++) {
    		if(!array2.includes(array1[i])){
    			result.push(array1[i]);
    		}
    	}
    	return result;
    }

    function pullAllWith(argument) {
    	// body...
    }

    function pullAt(array1,array2) {
    	var result = [];
    	for (var i = 0; i < array2.length; i++) {
    		result.push(array1[array2[i]]);
    		delete array1[array2[j]];
    	}
    	var len = array2.length;
    	for (var z = 0; z < len; z++) {
    		var key = array1.pop();
    		if(key !== undefined){
    			array1.unshift(key);
    		}
    	}
    	return result;
    }

    function remove(array,func){
    	var result = [];
    	for (var i = 0; i < array.length; i++) {
    		if(func(array[i])){
    			result.push(i);
    		}
    	}
    	return pullAt(array,result);
    }

    function reverse(array) {
    	var start = 0;
    	var end = array.length -1;
    	while(start < end){
    		[array[start],array[end]] = [array[end],array[start]];
        start++;
        end--;
    	}
      return array;
    }


    function slice(array,start = 0,end = array.length + 1){
    	var result = [];
    	for(var i = start;i < end;i++){
    		result.push(array[i]);
    	}
    	return result;
    }
    
    function sortedIndex(array,value) {
      for(var i = 0;i < array.length;i++){
        if(array[i] >= value){
          return i;
        }
      }
      return array.length;
      /**
    	var start = 0;
    	var end = array.length;
    	var index = Math.floor((start - end)/2);
    	if(value < array[0]){
    		return 0;
    	}
    	if(value > array[array.length - 1]){
    		return array.length;
    	}
    	while(start < end){
    		if(array[index] < value&&value <array[index + 1]){
    			return index + 1;
    		}

    		if(array[index] > value){
    			end = index;
    		}
    		if(array[index] < value){
    			start = index;
    		}
    	}
      **/
    }
 
    function sortedLastIndex(array,value) {
    	for (var i = array.length - 1; i >= 0; i--) {
    		if(array[i] === value){
    			return i;
    		}
    	}
    	return -1;

    }

    function sortedUniq(array) {
    	var result = [];
    	for (var i = 0; i < array.length; i++) {
    		if(array[i] !== array[i+1]){
    			result.push(array[i]);
    		}
    	}
      return result;
    } 
    

    function tail(array) {
    	// body...
    	return array.slice(1);
    }

    function take(array,n = 1) {
    	// body...
    	return array.slice(0,n);
    }

	function takeRight(array,n = 1) {
    	// body...
      if(array.length - n < 0){
        return array;
      }
    	return array.slice(array.length - n);
    }

    function union(...arg){
    	var result = new Set();
    	for (var i = 0; i < arg.length; i++) {
    		for (var j = 0; j < arg[i].length; j++) {
    			result.add(arg[i][j]);
    		}
    	}
    	return Array.from(result);
    }    

    function uniq(...arg){
    	var result = new Set();
    	for (var i = 0; i < arg.length; i++) {
    		for (var j = 0; j < arg[i].length; j++) {
    			result.add(arg[i][j]);
    		}
    	}
    	return Array.from(result);
    }

    function zipped(argument) {
      	// body...
      	var result = [];
      	for (var i = 0; i < argument[0].length; i++) {
      		result[i] = [];
      		for (var j = 0; j < argument.length; j++) {
      			result[j][i] !== undefined?result[i].push(result[j][i]):1;
      		}
      	}
      	return result;
      }

      function without(array,...arg) {
        	// body...
        	var result = [];
        	for (var i = 0; i < array.length; i++) {
        		if(!arg.includes(array[i])){
              result.push(array[i]);
            }
        	}
        	return result;
        }

        function xor(...array) {
         	// body...
         for (var i = 1; i < array.length; i++) {
           array[0] = array[0].concat(array[i]);
         }
          var arr = array[0];
         	var result = [];
         	for (var i = 0; i < arr.length; i++) {
         		if(arr.lastIndexOf(arr[i]) === arr.indexOf(arr[i])){
         			result.push(arr[i]);
         		}
         	}
         	return result;
         } 

         function zip(...argument) {
         	var result = [];
         	for (var i = 0; i < argument[0].length; i++) {
         		result[i] = [];
         		for (var j = 0; j < argument.length; j++) {
         			result[i].push(argument[j][i]);
         		}
         	}
         	return result;
         }


        function zipObject(array1,array2) {
         	var result = {};
         	for (var i = 0; i < array1.length; i++) {
         		result[array1[i]] = array2[i];
         	}
         	return result;
        }
         //需修改
         function zipObjectDeep(array1,array2) {
         	var result = {};
         	for (var i = 0; i < array1.length; i++) {
         		var key = array1[i];
         		while(Object.prototype.toString.call(key) === "[object Object]"){
         			for(var j in key){
         				key = key[j];
         			}
         		}
         		key[array1[i]] = array2[i];
         	}
         	return result;
         }

         function forEach(array,func) {
           // body...
           func = Function(func);
           for (var i = 0; i < array.length; i++) {
             func(array[i]);
           }

         }



         function forEachRight(array,func) {
           // body...
           for (var i = array.length - 1; i >= 0; i--) {
             func(array[i]);
           }

         }

      
         
return {
    identity:identity,
    chunk: chunk,
    compact: compact,
    concat: concat,
    difference: difference,
    differenceBy:differenceBy,
    differenceWith:differenceWith,
    drop: drop,
    dropRight: dropRight,
    dropWhile:dropWhile,
    fill: fill,
    head: head,
    indexOf: indexOf,
    initial: initial,
    intersection: intersection,
    join: join,
    last: last,
    lastIndexOf: lastIndexOf,
    nth: nth,
    pull: pull,
    pullAll: pullAll,
    pullAt: pullAt,
    reverse: reverse,
    slice: slice,
    sortedIndex: sortedIndex,
    sortedUniq: sortedUniq,
    tail: tail,
    take: take,
    takeRight: takeRight,
    union: union,
    uniq: uniq,
    without: without,
    xor: xor,
    zip: zip,
    zipObject: zipObject,
    forEach: forEach,
    forEachRight: forEachRight,
  }
}()