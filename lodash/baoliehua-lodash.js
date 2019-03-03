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
        return object[argument] ;
      }
    }else if(Object.prototype.toString.call(argument) === "[object Array]"||Object.prototype.toString.call(argument) === "[object Object]"){
      return function (object) {
        for(var i in argument){
          console.log(argument[i] !== object[i],argument[i],object[i])
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
//实现功能
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
    if (Object.prototype.toString.call(arg[arg.length - 1]) === "[object Array]") {
      return difference(array,...arg);
    }
		var result = [];
    var func = iteratee(arg[arg.length - 1]);
    //console.log(func,arg[arg.length-1],arg);
    var arr = [];
    for (var i = 0; i < arg.length - 1; i++) {
      for (var j = 0; j < arg[i].length; j++) {
        arr.push(func(arg[i][j]));
      }
    }
    console.log(arr,func);
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

  function dropRightWhile(array,n) {
    if(arguments[1] === undefined){
      array.pop();
      return array;
    }

    //最后一个参数为数组
    if (Object.prototype.toString.call(n) === "[object Array]") {
      var object = {};
      object[n[0]] = n[1];
      var func = iteratee(object);
      while(array.length&&func(array[array.length - 1])){
        array.pop();
      }
    }
    //最后一个参数为对象
    if (Object.prototype.toString.call(n) === "[object Object]") {
      var func = iteratee(n);
      while(array.length&&func(array[array.length - 1])){
        array.pop();
      }
    }
    //最后一个参数为字符串
    if (Object.prototype.toString.call(n) === "[object Object]") {
      var func = iteratee(n);
      while(array.length&&func(array[array.length - 1]) === undefined){
        array.pop();
      }
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

  function findLastIndex(array,...arg) {
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
  
  function flatten(array) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
      if(Object.prototype.toString.call(array[i]) === "[object Array]"){
        result = result.concat(array[i]);
      }else{
        result.push(array[i]);
      }
    }
    return result;
  }
  function flattenDeep(array) {
    var key = 1;
    while(key){
      var result = [];
      k = 0;
      for (var i = 0; i < array.length; i++) {
      if(Object.prototype.toString.call(array[i]) === "[object Array]"){
        result = result.concat(array[i]);
        key = 1;
      }else{
        result.push(array[i]);
      }
    }
    array = result;
    }
    return array;
  }
  function flattenDepth(array,n = 1) {
    while(n){
      var result = [];
      k = 0;
      for (var i = 0; i < array.length; i++) {
      if(Object.prototype.toString.call(array[i]) === "[object Array]"){
        result = result.concat(array[i]);
      }else{
        result.push(array[i]);
      }
    }
    array = result;
    n--;
    }
    return array;
  }
  function fromPairs(pairs) {
    var result = {};
    for (var i = 0; i < pairs.length; i++) {
      result[pairs[i][0]] = pairs[i][1];
    }
    return result;
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
  function intersectionBy(array,...arg) {
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
      if(arr.includes(func(array[z]))){
        result.push(array[z]);
      }
    }
    return result;
  }
  function intersectionWith (array,...arg) {
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
  function pullAllBy(array,...arg) {
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

  function pullAllWith (array,...arg) {
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
     if(!func(array[z],arr)){
        result.push(array[z]);
      }
    }
    return result;
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
  }
  
  function sortedIndexBy(array,...arg) {
    var func = iteratee(arg[arg.length - 1]);
    var value = func(arg[0]);
    for (var z = array.length - 1; z >= 0; z--) {
      if(func(array[z]) > value){
        return i;
      }
    }
  }

  function sortedIndexOf(array,value) {
    for (var i = 0; i < array.length; i++) {
      if(array[i] === value){
        return i ;
      }
    }
    return -1;
  }

  function sortedLastIndex(array,value) {
  	for (var i = array.length - 1; i >= 0; i--) {
  		if(array[i] < value){
  			return i + 1;
  		}
  	}
  }

  function sortedLastIndexBy(array,...arg) {
    var func = iteratee(arg[arg.length - 1]);
    var value = func(arg[0]);
    for (var z = array.length - 1; z >= 0; z--) {
      if(func(array[z]) < value){
        return i + 1;
      }
    }
  }

  function sortedLastIndexOf(array,value) {
    for (var i = array.length - 1; i >= 0; i--) {
      if(array[i] === value){
        return i ;
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
  
  function sortedUniqBy(array,...arg) {
    var result = [];
    var func = iteratee(arg[arg.length - 1]);
    var key = array[0];
    for (var z = 0; z < array.length; z++) {
      if(func(array[z]) !== func(array[z+1])){
        result.push(key);
        key = array[z+1];
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

  function takeRightWhile(array,func) {
      var reslut = [];
      func = iteratee(func);
      var index;
      for (var i = array.length - 1; i >= 0; i++) {
        if(!func(array[i])){
          index = i;
          break;
        }
      }
      return index?array.slice(index+1):array;
  }

  function takeWhile(array,func) {
      var reslut = [];
      func = iteratee(func);
      var index;
      for (var i = 0; i < array.length; i++) {
        if(!func(array[i])){
          index = i;
          break;
        }
      }
      return index?array.slice(0,index):array;
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

  function unionBy(...arg) {
    var result = new Set();
    var func = iteratee(arg[arg.length - 1]);
    var arr = [],newarr = [];
    for (var i = 0; i < arg.length; i++) {
      for (var j = 0; j < arg[i].length; j++) {
        arr.push(arg[i][j]);
        newarr.push(func(arg[i][j]));
      }
    }
    for (var z = 0; z < newarr.length; z++) {
      result.add(arr[newarr.indexOf(newarr[z])]);
    }
    return result;
  }

  function unionWith(...arg) {
    var result = new Set();
    var func = iteratee(arg[arg.length - 1]);
    var arr = [],newarr = [];
    for (var i = 0; i < arg.length; i++) {
      for (var j = 0; j < arg[i].length; j++) {
        arr.push(arg[i][j]);
        newarr.push(func(arg[i][j]));
      }
    }
    for (var z = 0; z < newarr.length; z++) {
      result.add(arr[newarr.indexOf(newarr[z])]);
    }
    return result;
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

  function uniqBy(array,...arg) {
    var result = new Set();
    var func = iteratee(arg[arg.length - 1]);
    var newarr = [];
    for (var i = 0; i < array.length; i++) {
        newarr.push(func(array[i]));
    }
    for (var z = 0; z < newarr.length; z++) {
      result.add(array[newarr.indexOf(newarr[z])]);
    }
    return result;
  }

  function uniqWith(array,...arg) {
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

  function unzip(argument) {
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

  function unzipWith(array,...arg) {
    var result = [];
    var func = iteratee(arg[arg.length - 1]);
    for (var z = 0; z < array.length; z++) {
      result.push(func(array[z]));
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

  
  function xorBy(...array) {
    var newarr = [],arr = [];
    var func = iteratee(array[array.length - 1]);
    for (var i = 1; i < array.length - 1; i++) {
      for (var j = 0; j < array[i].length; j++) {
        newarr.push(func(array[i][j]));
        arr.push(array[i][j]);
      }
    }
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      if(newarr.lastIndexOf(newarr[i]) === newarr.indexOf(newarr[i])){
        result.push(arr[i]);
      }
    }
    return result;
  }

  function xorWith(...array) {
    var newarr = [],arr = [];
    var func = iteratee(array[array.length - 1]);
    for (var i = 1; i < array.length - 1; i++) {
      for (var j = 0; j < array[i].length; j++) {
        arr.push(array[i][j]);
      }
    }
    var result = new Set();
    for (var i = 0; i < arr.length; i++) {
      if(func(arr[i])){
        result.add(arr[i]);
      }
    }
    return Array.from(result);
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

   function zipWith(...array) {
    var newarr = [],arr = [];
    var func = iteratee(array[array.length - 1]);
    var result = [];
    for (var i = 0; i < array[0].length; i++) {
      result[i] = [];
      for (var j = 0; j < array.length - 1; j++) {
        result[i].push(array[j][i]);
      }
    }
    for (var z = 0; z < result.length; z++) {
      result[z] = func(result[z]);
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
    chunk: chunk,
    compact: compact,
    concat: concat,
    difference: difference,
    differenceBy:differenceBy,
    differenceWith:differenceWith,
    drop: drop,
    dropRight: dropRight,
    dropRightWhile:dropRightWhile,
    dropWhile:dropWhile,
    fill: fill,
    findIndex:findIndex,
    findLastIndex:findLastIndex,
    head: head,
    flatten:flatten,
    flattenDeep:flattenDeep,
    flattenDepth:flattenDepth,
    fromPairs:fromPairs,
    indexOf: indexOf,
    initial: initial,
    intersection: intersection,
    intersectionBy:intersectionBy,
    intersectionWith:intersectionWith,
    join: join,
    last: last,
    lastIndexOf: lastIndexOf,
    nth: nth,
    pull: pull,
    pullAll: pullAll,
    pullAllBy:pullAllBy,
    pullAllWith:pullAllWith,
    pullAt: pullAt,
    remove:remove,
    reverse: reverse,
    slice: slice,
    sortedIndex: sortedIndex,
    sortedIndexBy:sortedIndexBy,
    sortedIndexOf:sortedIndexOf,
    sortedLastIndex:sortedLastIndex,
    sortedLastIndexBy:sortedLastIndexBy,
    sortedLastIndexOf:sortedLastIndexOf,
    sortedUniq: sortedUniq,
    sortedUniqBy:sortedUniqBy,
    tail: tail,
    take: take,
    takeRight: takeRight,
    takeRightWhile:takeRightWhile,
    takeWhile:takeWhile,
    union: union,
    unionBy:unionBy,
    unionWith:unionWith,
    uniq: uniq,
    uniqBy:uniqBy,
    uniqWith:uniqWith,
    unzip:unzip,
    unzipWith:unzipWith,
    without: without,
    xor: xor,
    xorBy:xorBy,
    xorWith:xorWith,
    zip: zip,
    zipObject: zipObject,
    zipObjectDeep:zipObjectDeep,
    zipWith:zipWith,
    forEach: forEach,
    forEachRight: forEachRight,
  }
}()