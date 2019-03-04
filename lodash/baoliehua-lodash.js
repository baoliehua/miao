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

    if (Object.prototype.toString.call(n) === "[object Function]") {
      var func = iteratee(n);
      while(array.length&&func(array[array.length - 1])){
        array.pop();
      }
    }
    return array;
  }

	function dropWhile(array,n) {
    if(arguments[1] === undefined){
      array.pop();
      return array;
    }

    //最后一个参数为数组
    if (Object.prototype.toString.call(n) === "[object Array]") {
      var object = {};
      object[n[0]] = n[1];
      var func = iteratee(object);
      while(array.length&&func(array[0])){
        array.shift();
      }
    }
    //最后一个参数为对象
    if (Object.prototype.toString.call(n) === "[object Object]") {
      var func = iteratee(n);
      while(array.length&&func(array[0])){
        array.shift();
      }
    }
    //最后一个参数为字符串
    if (Object.prototype.toString.call(n) === "[object Object]") {
      var func = iteratee(n);
      while(array.length&&func(array[0]) === undefined){
        array.shift();
      }
    }

    if (Object.prototype.toString.call(n) === "[object Function]") {
      var func = iteratee(n);
      while(array.length&&func(array[0])){
        array.shift();
      }
    }
    return array;
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
    if(Object.prototype.toString.call(arg[0]) === "[object Array]"){
      var object = {};
      object[arg[0][0]] = arg[0][1];
      arg[0] = object;
    }
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
    if(Object.prototype.toString.call(arg[0]) === "[object Array]"){
      var object = {};
      object[arg[0][0]] = arg[0][1];
      arg[0] = object;
    }
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
      key = 0;
      for (var i = 0; i < array.length; i++) {
       // console.log(array[i])
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
    for (var z = 0; z < array.length; z++) {
      if(func(array[z]) >= value){
        return z;
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
  		if(array[i] <= value){
  			return i + 1;
  		}
  	}
  }

  function sortedLastIndexBy(array,...arg) {
    var func = iteratee(arg[arg.length - 1]);
    var value = func(arg[0]);
    for (var z = array.length - 1; z >= 0; z--) {
      if(func(array[z]) <= value){
        return z + 1;
      }
    }
    return 0;
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
      if (Object.prototype.toString.call(func) === "[object Array]") {
        var object = {};
        object[func[0]] = func[1];
        func = object;
      }
      var result = [];
      func = iteratee(func);
      var index;
      for (var i = array.length - 1; i >= 0; i--) {
        if(!func(array[i])){
          break;
        }
        result.unshift(array[i]);
      }
      return result;
  }

  function takeWhile(array,func) {
      if (Object.prototype.toString.call(func) === "[object Array]") {
        var object = {};
        object[func[0]] = func[1];
        func = object;
      }
      var result = [];
      func = iteratee(func);
      var index;
      for (var i = 0; i < array.length; i++) {
        if(!func(array[i])){
          break;
        }
        result.push(array[i]);
      }
      return result;
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
    for (var i = 0; i < arg.length - 1; i++) {
      for (var j = 0; j < arg[i].length; j++) {
        arr.push(arg[i][j]);
        newarr.push(func(arg[i][j]));
      }
    }
    for (var z = 0; z < newarr.length; z++) {
      result.add(arr[newarr.indexOf(newarr[z])]);
    }
    return Array.from(result);
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
    return Array.from(result);
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

  function unzip(array) {
  	// body...
  	var result = [];
  	for (var i = 0; i < array[0].length; i++) {
      console.log(i)
  		result[i] = [];
  		for (var j = 0; j < array.length; j++) {
  			result[i].push(array[j][i]);
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
    for (var i = 0; i < array.length - 1; i++) {
      for (var j = 0; j < array[i].length; j++) {
        newarr.push(func(array[i][j]));
        arr.push(array[i][j]);
      }
    }
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      console.log(newarr,i,arr[i])
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
   

  //Collection
  function countBy(array,func) {
    var result = {};
    func = iteratee(func);
    for (var i = 0; i < array.length; i++) {
      result[func(array[i])]?result[func(array[i])]++:result[func(array[i])] = 1;
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


  function every(array,func) {
    if (Object.prototype.toString.call(func) === "[object Array]") {
      var object = {};
      object[func[0]] = func[1];
      func = object;
    }
    func = iteratee(func);
    for (var i = 0; i < array.length; i++) {
      if(!func(array[i])){
        return false;
      }
    }
    return true;
  }


  function filter(array,func) {
    if (Object.prototype.toString.call(func) === "[object Array]") {
      var object = {};
      object[func[0]] = func[1];
      func = object;
    }
    var result = [];
    func = iteratee(func);
    for (var i = 0; i < array.length; i++) {
      if(func(array[i])){
        result.push(array[i]);
      }
    }
    return result;
  }


  function find(array,func,index = 0) {
    if (Object.prototype.toString.call(func) === "[object Array]") {
      var object = {};
      object[func[0]] = func[1];
      func = object;
    }
    func = iteratee(func);
    for (var i = index; i < array.length; i++) {
      if(func(array[i])){
        return array[i];
      }
    }
  }


  function findLast(array,func,index = array.length-1) {
    func = iteratee(func);
    for (var i = index; i >=0; i--) {
      if(func(array[i])){
        return array[i];
      }
    }
  }


  function flatMap(array,func) {
    func = iteratee(func);
    var result = [];
    for (var i = 0; i < array.length; i++) {
      result = result.concat(func(array[i]))
    }
    return result;
  }

  function flatMapDeep(array,func) {
    func = iteratee(func);
    var result = [];
    for (var i = 0; i < array.length; i++) {
      result = result.concat(func(array[i]))
      }
    
    result = flattenDeep(result);
    return result;
  }

  function flatMapDepth(array,func,n = 1) {
    func = iteratee(func);
    for (var i = 0; i < array.length; i++) {
      array[i] = func(array[i]);
    }
    return flattenDepth(result,n);
  }

  function groupBy(array,func) {
    func = iteratee(func);
    var result = {};
    for (var i = 0; i < array.length; i++) {
      result[func(array[i])] ?result[func(array[i])].push(array[i]):result[func(array[i])] = [array[i]];
    }
    return result;
  }

  function includes(array,value,index = 0) {
    if (Object.prototype.toString.call(array) === "[object Object]") {
      var arr = [];
      for(var j in array){
        arr.push(array[j]);
      }
      array = arr;
    }

    if (Object.prototype.toString.call(array) === "[object String]") {
      var reg = new RegExp(value);
      if (reg.test(array)) {
        return true;
      }else{
        return false;
      }

    }
    for (var i = index; i < array.length; i++) {
      if(array[i] === value){
        return true;
      }
    }
    return false;
  }


  function invokeMap(array,...arg) {
    var func = arg[0];
    if (arg.length === 1) {
      for (var i = 0; i < array.length; i++) {

        array[i] = array[i][func]();
      }
    }else{
      for (var i = 0; i < array.length; i++) {
        array[i] = array[i][func](arg[1]);
      }
    }
    return array;
  }


  function keyBy(array,func) {
    var result = {};
    func = iteratee(func);
    for (var i = 0; i < array.length; i++) {
      result[func(array[i])] = array[i];
    }
    return result;
  }

  function map(array,func) {
    if(Object.prototype.toString.call(array) === "[object Object]"){
      var arr = [];
      for(var j in array){
        arr.push(array[j]);
      }
      array = arr;
    }
    if(Object.prototype.toString.call(array) === "[object String]"){
      var arr = [];
      for(var j in array){
        arr.push(array[j]);
      }
      array = arr;
    }
    func = iteratee(func);
    for (var i = 0; i < array.length; i++) {
      array[i] = func(array[i]);
    }
    return array;
  }

  function orderBy(argument) {
    // body...
  }

  function partition(array,func) {
    if(Object.prototype.toString.call(func) === "[object Array]"){
      var object = {};
      object[func[0]] = func[1];
      func = object;
      console.log(func)
    }
    func = iteratee(func);
    var result1,result2;
    for (var i = 0; i < array.length; i++) {
      if(func(array[i])){
        result1?result1.push(array[i]):result1 = [array[i]];
      }else{
        result2?result2.push(array[i]):result2 = [array[i]];
      }
    }
    var result = [];
    if(result1){
      result.push(result1);
    }
    if(result2){
      result.push(result2);
    }
    return result;
  }


  function reduce(array,func,init) {
    func = iteratee(func);
    if(init !== undefined){
      var result = init;
      for (var i = 0; i < array.length; i++) {
        result = func(result,array[i]);
      }
    }else{
      var result = array[0];
      for (var i = 1; i < array.length; i++) {
        result = func(result,array[i]);
      }
    }
    return result;
  }

  function reduceRight(array,func,init) {
    func = iteratee(func);
    if(init !== undefined){
      var result = init;
      for (var i = array.length - 1; i >=0; i--) {
        result = func(result,array[i]);
      }
    }else{
      var result = array[array.length-1];
      for (var i = array.length - 2; i >=0; i--) {
        result = func(result,array[i]);
      }
    }
    return result;
  }

  function reject(array,func) {
    if (Object.prototype.toString.call(func) === "[object Array]") {
      var object = {};
      object[func[0]] = func[1];
      func = object;
    }
    func = iteratee(func);
    var result = [];
    for (var i = 0; i < array.length; i++) {
     if(!func(array[i])){
      result.push(array[i]);
     }
    }
    return result;
  }

  function sample(array) {
    return array[Math.floor(Math.random()*array.length)];
  }

  function sampleSize(array,n = 1) {
    var result = [];
    for (var i = 0; i < n&&array.length; i++) {
      var index = Math.floor(Math.random()*array.length);
      result.push(array[index]);
      array.splice(index,1);
    }
    return result;
  }

  function shuffle(array) {
    return sampleSize(array,array.length);
  }
  
  function size(array){
    var count = 0;
    for(var i in array){
      count++;
    }
    return count;
  } 

  function some(array,func) {
    if (Object.prototype.toString.call(func) === "[object Array]") {
      var object = {};
      object[func[0]] = func[1];
      func = object;
    }
    func = iteratee(func);
    for (var i = 0; i < array.length; i++) {
      if(func(array[i])){
        return true;
      }
    }
    return false;
  }

  function sortBy(array,funcs) {
    for (var i = 0; i < funcs.length; i++) {
      func = iteratee(funcs[i]);
      array = array.sort(function(a,b){
        a = func(a);
        b = func(b);
        if(Object.prototype.toString.call(a) === "[object String]"){
          for(var i = 0;i < a.length;i++){
            if (a[i] !== undefined&&b[i] === undefined||a[i].charCodeAt() > b[i].charCodeAt()) {
              console.log(a[i].charCodeAt() ,b[i].charCodeAt())
              return true;
            }
            if (a[i] === undefined||a[i].charCodeAt() < b[i].charCodeAt()) {
              console.log(a[i].charCodeAt() ,b[i].charCodeAt())
              return false;
            }

          }
        }
        return a - b;
      })
    }
    return array;
  }

  //lang

  function castArray(value) {
    return arguments.length !== 0?[value]:[];
  }

  function clone(value) {
    var result = [];
    for(var i in value){
      result[i] = value[i];
    }
    return result;
  }

  function cloneDeep(value) {
    var result = [],count = 0;
    for(var i in value){
      count++;
      result[i] = cloneDeep(value[i]);
    }
    return count?result:value;
  }

  function conformsTo(object,source) {
    for(var i in source){
      return source[i](object[i]);
    }
  }

  function eq(value,other) {
    console.log(value,other,isNaN(NaN),isNaN(1))
    if(isNaN(value)&&isNaN(other)){
      return true;
    }
    return value === other;
  }

  function gt(value,other) {
    return value > other;
  }

  function gte(value,other) {
    return value >= other;
  }

  function isArguments(value) {
    return Object.prototype.toString.call(value) === "[object Arguments]"
  }

  function isArray(value) {
    return Object.prototype.toString.call(value) === "[object Array]"
  }

  function isArrayBuffer(value) {
    return Object.prototype.toString.call(value) === "[object ArrayBuffer]"
  }

  function isArrayLike(value) {
    return Object.prototype.toString.call(value) !== "[object Function]"&&value.length !== undefined&&value.length>=0&&value.length < Number.MAX_SAFE_INTEGER;
  }

  function isArrayLikeObject(value) {
    return isArrayLike(value)&&typeOf(value) === "object";
  }

  function isBoolean(value) {
    return Object.prototype.toString.call(value) === "[object Boolean]"
  }

  function isBuffer(value) {
    return Object.prototype.toString.call(value) === "[object Buffer]"
  }

  function isDate(value) {
    return Object.prototype.toString.call(value) === "[object Date]"
  }

  function isDate(value) {
    return Object.prototype.toString.call(value) === "[object Date]"
  }


  function isElement(value) {
    return Object.prototype.toString.call(value) === "[object Element]"
  }


  function isEmpty(value) {
    var count = 0;
    for(var i in value){
      count++;
    }
    return count === 0;
  }


  function isEqual(value,other) {
    var count = 0;
    for(var i in value){
      count++;
    }
    for(var i in other){
      count++;
    }
    if (!count) {
      return value === other;
    }
    for(var i in value){
      if(!isEqual(value[i])){
        return false;
      }
    }
    return true;
  }


  function isError(value) {
    return Object.prototype.toString.call(value) === "[object Error]"
  }


  function isFinite(value) {
    return Object.prototype.toString.call(value) === "[object Number]"&&value !== Infinity;
   }


  function isFunction(value) {
    return Object.prototype.toString.call(value) === "[object Function]";
  }


  function isInteger(value) {
    return Math.floor(value) === value&&value !== Infinity;
  }


  function isLength(value) {
    return this.isInteger(value);
  }


  function isMap(value) {
    return Object.prototype.toString.call(value) === "[object Map]"
  }

  function isMatch(object,source) {
    for(var i in source){
      if (!this.isEqual(source[i],object[i])) {
        return false;
      }
    }
    return true;
  }

  function isMatchWith(object,source,func) {
    for(var i in source){
      if (!func(source[i],object[i])) {
        return false;
      }
    }
    return true;
  }

  function isNaN(value) {
    return Number.isNaN(value)||Object.prototype.toString.call(value) !== "[object Function]";
  }

  function isNative(value) {
    return Object.prototype.toString.call(value) === "[object Function]"
  }

  function isNil(value) {
    return Object.prototype.toString.call(value) === "[object Null]"||Object.prototype.toString.call(value) === "[object Undefined]";
  }

  function isNull(value) {
    return Object.prototype.toString.call(value) === "[object Null]"
  }

  function isNumber(value) {
    return Object.prototype.toString.call(value) === "[object Number]"
  }

  function isObject(value) {
    return typeof(value) === "object";
  }

  function isObjectLike(value) {
    return this.isObject(value)&&Object.prototype.toString.call(value) !== "[object Null]";
  }

  function isPlainObject(value) {
    return value.constructor === Object||value.constructor === undefined;
  }

  function isRegExp(value) {
    return Object.prototype.toString.call(value) === "[object RegExp]"
  }

  function isSafeInteger(value) {
    return this.isInteger(value);
  }

  function isSet(value) {
    return Object.prototype.toString.call(value) === "[object Set]"
  }

  function isString(value) {
    return Object.prototype.toString.call(value) === "[object String]"
  }

  function isSymbol(value) {
    return Object.prototype.toString.call(value) === "[object Symbol]"
  }

  function isTypedArray(value) {
    return this.isArrayLike(value)&&!this.isArray(value);
  }

  function isUndefined(value) {
    return Object.prototype.toString.call(value) === "[object Undefined]"
  }

  function isWeakMap(value) {
    return Object.prototype.toString.call(value) === "[object WeakMap]"
  }

  function isWeakSet(value) {
    return Object.prototype.toString.call(value) === "[object WeakSet]"
  }

  function lt(value,other) {
    return value < other;
  }

  function lte(value,other) {
    return value <= other;
  }

  function toArray(value) {
    var result =[];
    for(var i in value){
      result.push(value[i]);
    }
    return result;
  }

  function toFinite(argument) {
    // body...
  }

  function toInteger(value) {
    return Math.floor(value)
  }

  function toLength(value) {
    return String(value).length;
  }

  function toNumber(value) {
    return Number(value);
  }

  function toPlainObject(value) {
    return String(value).length;
  }

  function toSafeInteger(value) {
    return String(value).length;
  }

  function toString(value) {
    return String(value);
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
    countBy:countBy,
    forEach: forEach,
    forEachRight: forEachRight,
    every:every,
    filter:filter,
    find:find,
    findLast:findLast,
    flatMap:flatMap,
    flatMapDeep:flatMapDeep,
    flatMapDepth:flatMapDepth,
    groupBy:groupBy,
    includes:includes,
    invokeMap:invokeMap,
    keyBy:keyBy,
    map:map,
    orderBy:orderBy,
    partition:partition,
    reduce:reduce,
    reduceRight:reduceRight,
    reject:reject,
    sample:sample,
    sampleSize:sampleSize,
    shuffle:shuffle,
    size:size,
    some:some,
    sortBy:sortBy,
    //lang
    castArray:castArray,
    clone:clone,
    cloneDeep:cloneDeep,
    conformsTo:conformsTo,
    eq:eq,
    gt:gt,
    gte:gte,
    isArguments:isArguments,
    isArray:isArray,
    isArrayBuffer:isArrayBuffer,
    isArrayLike:isArrayLike,
    isArrayLikeObject:isArrayLikeObject,
    isBoolean:isBoolean,
    isBuffer:isBuffer,
    isDate:isDate,
    isElement:isElement,
    isEmpty:isEmpty,
    isEqual:isEqual,
    isError:isError,
    isFinite:isFinite,
    isFunction:isFunction,
    isInteger:isInteger,
    isLength:isLength,
    isMap:isMap,
    isMatch:isMatch,
    isMatchWith:isMatchWith,
    isNaN:isNaN,
    isNative:isNative,
    isNil:isNil,
    isNull:isNull,
    isNumber:isNumber,
    isObject:isObject,
    isObjectLike:isObjectLike,
    isPlainObject:isPlainObject,
    isRegExp:isRegExp,
    isSafeInteger:isSafeInteger,
    isSet:isSet,
    isString:isString,
    isSymbol:isSymbol,
    isTypedArray:isTypedArray,
    isUndefined:isUndefined,
    isWeakMap:isWeakMap,
    isWeakSet:isWeakSet,
    lt:lt,
    lte:lte,
    toArray:toArray,
    toFinite:toFinite,
    toInteger:toInteger,
    toLength:toLength,
    toNumber:toNumber,
    toPlainObject:toPlainObject,
    toSafeInteger:toSafeInteger,
    toString:toString,
  }
}()