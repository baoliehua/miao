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
        return baoliehua.method(argument)(object) ;
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
    if(isNaN(value)&&isNaN(other)&&typeof(value) === "number"&&typeof(other) === "number"){
      return true;
    }
    return value === other&&typeof(value) === typeof(other);
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
    return isArrayLike(value)&&typeof(value) === "object";
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
    if(Object.prototype.toString.call(value) !== Object.prototype.toString.call(other)){
      return false;
    }
    if(Object.prototype.toString.call(value) ==="[object String]"&&Object.prototype.toString.call(other) ==="[object String]" ){
      return value === other;
    }
    var count1 = 0,count2 = 0;
    for(var i in value){
      count1++;
    }
    for(var i in other){
      count2++;
    }
    if(count1 !== count2){
      return false;
    }
    if (!count1||!count2) {
      if(!count1&&!count2){
        if(baoliehua.isArray(value)&&baoliehua.isArray(other)||baoliehua.isObject(value)&&baoliehua.isObject(other)){
          return true;
        }
      }
      return value === other;
    }
    for(var i in value){
      console.log(i,value[i],other[i])
      if(!isEqual(value[i],other[i])){
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
    return Number.isNaN(value)||typeof(value) !== "[object Number]";
  }

  function isNative(value) {
    //return Object.prototype.toString.call(value) === "[object Function]"
    return value.constructor = Function; 
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
    console.log(value === null)
    if (value === null) {
      return false;
    }
    return typeof(value) === "object"||typeof(value) === "function";
  }

  function isObjectLike(value) {
    return typeof(value) === "object"&&Object.prototype.toString.call(value) !== "[object Null]";
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

  function add(augend, addend) {
    return augend + addend;
  }

  function ceil(argument) {
    return Math.round()
  }

  function divide(dividend, divisor) {
    return dividend/divisor;
  }

  function floor() {
    // body...
  }

  function max(array) {
    var result = array[0];
    for (var i = 0; i < array.length; i++) {
      array[i] > result? result = array[i]:1;
    }
    return result;
  }

  function maxBy(array,func) {
    console.log(1)
    func = iteratee(func);
    var result = array[0];
    console.log(array,array.length)
    for (var i = 0; i < array.length; i++) {
      console.log(func(array[i]),func(result));
      func(array[i] )> func(result)? result = array[i]:1;
    }
    return result;
  }


  function mean(array) {
    var len = array.length;
    var count = 0;
    for (var i = 0; i < array.length; i++) {
      count += array[i];
    }
    return count/len;
  }

  function meanBy(array,func) {
    func = iteratee(func);
    var sum = 0;
    var count = 0;
    for (var i in array) {
      count++;
      sum += func(array[i]);
    }
    return sum/count;
  }

  function min(array) {
    var result = array[0];
    for (var i = 0; i < array.length; i++) {
      array[i] < result? result = array[i]:1;
    }
    return result;
  }

  function minBy(array,func) {
    func = iteratee(func);
    var result = array[0];
    for (var i = 0; i < array.length; i++) {
      func(array[i]) < func(result)? result = array[i]:1;
    }
    return result;
  }

  

  function multiply(multiplier, multiplicand) {
    return multiplier * multiplicand;
  }

  function round(argument) {
    // body...
  }

  function subtract(minuend, subtrahend) {
    return minuend - subtrahend;
  }

  function sum(array) {
    var result = 0;
    for (var i = 0; i < array.length; i++) {
      result += array[i];
    }
    return result;
  }

  function sumBy(array,func) {
    func = iteratee(func);
    var result = 0;
    for (var i = 0; i < array.length; i++) {
      result += func(array[i]);
    }
    return result;
  }

  function clamp(number,lower,upper) {
    var result = number;
    if(result < lower){
      return lower;
    }

    if (result > upper) {
      return upper;
    }

    return result;
  }

  function inRange(number,start,end) {
    if (end !== undefined) {
      start > end?[start,end] = [end,start]:1;
    }else{
      number > start?end = number:[end,start] = [start,number];
    }
    return number >= start&&number < end?true:false;
  }


  function random(lower = 0,upper = 1,floating) {
    if (arguments[2] === true) {
      return Math.random()*arguments[1] + arguments[0];
    }
    if (arguments.length === 2) {
      if(arguments[1] === true||Math.floor(arguments[0]) !== arguments[0]||Math.floor(arguments[1]) !== arguments[1]){
        return arguments[1] === true?Math.random()*arguments[0]:Math.random()*arguments[1]+arguments[0];
      }else{
        return  Math.floor(Math.random()*arguments[1]+arguments[0]);
      }
    }
    
    if (arguments.length === 1) {
      return Math.floor(arguments[0]) !== arguments[0]?Math.random()*arguments[0]:Math.floor(Math.random()*arguments[0]);
    }
    if (arguments.length === 0) {
      return Math.random();
    }
  }


  function assign(object,...objs) {
    for (var i = 0; i < objs.length; i++) {
      for(var j in Object.keys(objs[i])){
        object[j] = objs[i][j];
      }
    }
    return object;
  }


  function assignIn(object,...objs) {
    for (var i = 0; i < objs.length; i++) {
      for(var j in objs[i]){
        object[j] = objs[i][j];
      }
    }
    return object;
  }


  function at(object,path) {
    var result = [];
    console.log(result);
    for (var i = 0; i < path.length; i++) {
      var func = iteratee(path[i]);
      console.log("func",func)
      result.push(func(object));
    }
    console.log(result);
    return result;
  }


  function defaults(object,...source) {
    for (var i = 0; i < source.length; i++) {
      for(var j in source[i]){
        if(object[j] === undefined){
          object[j] = source[i][j];
        }
      }
    }
    return object;
  }


  function defaultsDeep(object,...source) {
    for (var i = 0; i < source.length; i++) {
      for(var j in source[i]){
        if(object[j] === undefined){
          object[j] = source[i][j];
        }
      }
    }
    return object;
  }


  function findKey(object,func) {
    if(this.isArray(func)){
      var obj = {};
      obj[func[0]] = func[1];
      func = obj;
    }
    func = iteratee(func);
    for(var i in object){
      if(func(object[i])){
        return i;
      }
    }
  }


  function findLastKey(object,func) {
    var result;
    if(Object.prototype.toString.call(func) === "[object Array]"){
      var obj = {};
      obj[func[0]] = func[1];
      func = obj;
    }
    func = iteratee(func);
    for(var i in object){
      if(func(object[i])){
        result = i;
      }
    }
    return result;
  }


  function forIn(object,func) {
    func = iteratee(func);
    for(var i in object){
      func(i,object[i],object);
    }
    return object;
  }


  function forInRight(object,func) {
    var result = [];
    func = iteratee(func);
    for(var i in object){
      result.push([i,object[i],object]);
    }
    for (var i = result.length - 1; i >= 0; i--) {
      func(result[i][0],result[i][1],result[i][2])
    }
    return object;
  }


  function forOwn(object,func) {
    func = iteratee(func);
    for(var i in Object.keys(object)){
      func(i,object[i],object);
    }
    return object;
  }


  function forOwnRight(object,func) {
    var result = [];
    func = iteratee(func);
    for(var i in Object.keys(object)){
      result.push([i,object[i],object]);
    }
    for (var i = result.length - 1; i >= 0; i--) {
      func(result[i][0],result[i][1],result[i][2])
    }
    return object;
  }


  function functions(object) {
    var result = [];
    for(var i in Object.keys(object)){
      result.push(Object.keys(object)[i]);
    }
    return result;
  }

  function functionsIn(object) {
    var result = [];
    for(var i in object){
      result.push(i);
    }
    return result;
  }

  function get(object,path,defaults) {
    var result = defaults;
    if(Object.prototype.toString.call(path) === "[object String]"){
      var func = iteratee(path);
      try{
        result = func(object);
      }catch(e){
        return defaults;
      }
      return result;
    }
    for (var i = 0; i < path.length; i++) {
      var func = iteratee(path[i]);
      try{
        object = func(object);
      }catch(e){
        return defaults;
      }
    }
    return object?object:defaults;
  }



  function has(object,path) {
    var result = defaults;
    if(Object.prototype.toString.call(path) === "[object String]"){
      var func = iteratee(path);
      try{
        result = func(object);
        return result === undefined?false:true;
      }catch(e){
        return false;
      }
    }
    for (var i = 0; i < path.length; i++) {
      var func = iteratee(path[i]);
      try{
        object = func(object);
      }catch(e){
        return false;
      }
    }
    return object !== undefined?true:false;
  }



  function hasIn(object,path) {
    var result = defaults;
    if(Object.prototype.toString.call(path) === "[object String]"){
      var func = iteratee(path);
      try{
        result = func(object);
        return result === undefined?false:true;
      }catch(e){
        return false;
      }
    }
    for (var i = 0; i < path.length; i++) {
      var func = iteratee(path[i]);
      try{
        object = func(object);
      }catch(e){
        return false;
      }
    }
    return object !== undefined?true:false;
  }

  function invert(object) {
    var obj = {};
    for(var i in object){
      obj[object[i]]= i;
    }
    return obj;
  }

  function invertBy(object,func) {
    var obj = {};
    if(func !== undefined){
      func = iteratee(func);
      for(var i in object){
        console.log(i);
        obj[func(object[i])] === undefined?obj[func(object[i])] = [i]:obj[func(object[i])].push(i);
      }
    }else{
      for(var i in object){
        obj[object[i]] === undefined? obj[object[i]]= [i]:obj[object[i]].push(i);
      }
    }
    return obj;
  }


  function invoke(object,path,...arg) {
    if (Object.prototype.toString.call(path) === "[object String]") {
      var func = iteratee(path);
      arg = Array.from(arg);
      console.log(arg,func(object));
      func = func
      return func(object)(...arg);
    }
  }


  function keys(object) {
    return Object.keys(object);
  }


  function keysIn(object) {
    var result = [];
    for(var i in object){
      result.push(i);
    }
    return result;
  }

  function mapKeys(object,func) {
    func = iteratee(func);
    var obj = {};
    for(var i in object){
      obj[func(object[i],i)] = object[i];
    }
    return obj;
  }


  function mapValues(object,func) {
    func = iteratee(func);
    var obj = {};
    for(var i in object){
      obj[i] = func(object[i]);
    }
    return obj;
  }


  function merge(object,...source) {
    for (var i = 0; i < source.length; i++) {
      for(var j in source[i]){
        if(object[j] === undefined){
          object[j] = source[i][j];
        }else{
          if(this.isArray(source[i][j])&&this.isArray(object[j])||Object.prototype.toString.call(source[i][j]) === "[object Object]"&&Object.prototype.toString.call(object[j]) === "[object Object]"){
          object[j] =  merge(object[j],source[i][j]);
          }else{
            object[j] = source[i][j];
          }
        }
      }
    }
    return object;
  }


  function mergeWith(object,...source) {
    var func = iteratee(source[source.length - 1]);
    for (var i = 0; i < source.length - 1; i++) {
      for(var j in source[i]){
        if(object[j] === undefined){
          object[j] = source[i][j];
        }else{
          object[j] = func(object[j],source[i][j]);
        }
      }
    }
    return object;
  }


  function omit(object,...path) {
    for (var i = 0; i < path.length; i++) {
      if(this.isArray(path[i])){
        for (var j = 0; j < path[i].length; j++) {
          if(object[path[i][j]] !== undefined){
            delete object[path[i][j]];
          }
        }
      }else{
        if(object[path[i]] !== undefined){
            delete object[path[i]];
        }
      }
    }
    return object;
  }


  function omitBy(object,func) {
    func = iteratee(func);
    for (var i in object) {
      if(func(object[i])){
        delete object[i];
      }
    }
    return object;
  }


  function pick(object,...path) {
    var obj = {};
    for (var i = 0; i < path.length; i++) {
      if(isArray(path[i])){
        for (var j = 0; j < path[i].length; j++) {
          if(object[path[i][j]] !== undefined){
            obj[path[i][j]] =  object[path[i][j]];
          }
        }
      }else{
        if(object[path[i]] !== undefined){
            obj[path[i]] = object[path[i]];
        }
      }
    }
    return obj;
  }


  function pickBy(object,func) {
    var obj = {};
    func = iteratee(func);
    for (var i in object) {
      if(func(object[i])){
        obj[i] = object[i];
      }
    }
    return obj;
  }


   function result(object,path,defaults) {
    var result = defaults;
    if(Object.prototype.toString.call(path) === "[object String]"){
      var func = iteratee(path);
      try{
        result = func(object);
      }catch(e){
        return defaults;
      }
      return result;
    }
    for (var i = 0; i < path.length; i++) {
      var func = iteratee(path[i]);
      try{
        object = func(object);
      }catch(e){
        return defaults;
      }
    }
    return object?object:defaults;
  }

/**
  function set(object,path,target) {
    var result;
    if(Object.prototype.toString.call(path) === "[object String]"){
      var func = iteratee(path);
      try{
        func(object) = target;
      }catch(e){
        return object;
      }
      return object;
    }
    for (var i = 0; i < path.length; i++) {
      var func = iteratee(path[i]);
      try{
        result = func(object);
      }catch(e){
        return object;
      }
    }
    result = target;
    return object;
  }
**/
  function setWith(argument) {
    // body...
  }

  function transform(argument) {
    // body...
  }
/**
  function unset(object,path) {
    var result;
    if(Object.prototype.toString.call(path) === "[object String]"){
      var func = iteratee(path);
      try{
        func(object) = target;
      }catch(e){
        return object
      }
      return object;
    }
    for (var i = 0; i < path.length; i++) {
      var func = iteratee(path[i]);
      try{
        result = func(object);
      }catch(e){
        return object;
      }
    }
    result = target;
    return object;
  }
  **/

  function update(argument) {
    // body...
  }

  function updateWith(argument) {
    // body...
  }

  function values(object) {
    var result = [];
    for(var i in Object.keys(object)){
      console.log(Object.keys(object)[i],object[i]);
      result.push(object[Object.keys(object)[i]]);
    }
    return result;
  }


  function valuesIn(object) {
    var result = [];
    for(var i in object){
      result.push(object[i]);
    }
    return result;
  }


  //String

  function camelCase(string = "") {
    var reg = /\w+/g;
    var arr = string.match(reg);
    arr[0] = arr[0].toLowerCase();
    for (var i = 1; i < arr.length; i++) {
        arr[i] = arr[i][0].toUpperCase() + (arr[i].slice(1)).toLowerCase();
    }
    return arr.join("");
  }

  function capitalize(string = "") {
    string = string[0].toUpperCase() + (string.slice(1)).toLowerCase();
  }


  function deburr(string = "") {
    // body...
  }

  function endWith(string = "",target,position = string.length) {
    return string[position - 1] === target;
  }


  function escape(string = "") {
    srting = string.split("");
    for (var i = 0; i < Things.length; i++) {
      switch(string[i]){
        case "&":string[i] = "&amp;";break;
        case "<":string[i] = "&lt;";break;
        case ">":string[i] = "&gt;";break;
        case "'":string[i] = "&quot;";break;
        case '"':string[i] = "&apos;";break;
      }
    }
    return string.join("");
  }


  function escapeRegExp(string = "") {
    var arr = ["^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}","|"];
    var result = [];
    for (var i = 0; i < string.length; i++) {
      if(arr.includes(string[i])){
        result.push("\\" +string[i]);
      }else
        result.push(string[i]);
    }
    return result.join("");
  }


  function kebabCase(string = "") {
    var reg = /\w+/g;
    var arr = string.match(reg);
    for (var i = 0; i < arr.length; i++) {
      for(var j = 0;j < arr[i].length;j++){

      }
    }
  }


  function lowerCase(argument) {
    // body...
  }


  function lowerFirst(string = "") {
    return string[0].toLowerCase() + string.slice(1);
  }


  function pad(string = "",length = 0,chars = " ") {
    if (string.length >= length) {
      return string;
    }else{
      var len = length - string.length;
      var lenl = Math.floor(len/2);
      var lenr = len - lenl;
      var lenc = chars.length;
      console.log(len,lenl,lenr,lenc)
      var strl = chars.repeat(Math.ceil(lenl/lenc)).slice(0,lenl);
      var strr = chars.repeat(Math.ceil(lenr/lenc)).slice(0,lenr);
      return strl + string + strr;
    }
  }

  function padEnd(string = "",length = 0,chars = " ") {
    if (string.length >= length) {
      return string;
    }else{
      var len = length - string.length;
      var lenc = chars.length;
      var strr = chars.repeat(Math.ceil(len/lenc)).slice(0,len);
      return string + strr;
    }
  }


  function padStart(string = "",length = 0,chars = " ") {
    if (string.length >= length) {
      return string;
    }else{
      var len = length - string.length;
      var lenc = chars.length;
      var strl = chars.repeat(Math.ceil(len/lenc)).slice(0,len);
      return strl + string;
    }
  }


  function padInt(string = "",length = 0,chars = " ") {
    if (string.length >= length) {
      return string;
    }else{
      var len = length - string.length;
      var lenc = chars.length;
      var strl = chars.repeat(Math.ceil(len/lenc)).slice(0,len);
      return strl + string;
    }
  }


  function repeat(string = "",n = 1) {
    var result = "";
    for (var i = 0; i < n; i++) {
      result += string;
    }
    return result;
  }

  function replace(string = "",pattern,replacement) {
    if (Object.prototype.toString.call(pattern) === "[object String]") {
      string = string.split(pattern);
      return string.join(replacement);
    }
  }


  function snakeCase(argument) {
    // body...
  }

  function split(string = "",separator,limit) {
    
  }

  function startCase(argument) {
    // body...
  }

  function startsWith(argument) {
    // body...
  }

  function template(argument) {
    // body...
  }

  function toLower(string) {
    var reg = /[A-Z]/;
    var result = [];
    for (var i = 0; i < string.length; i++) {
      if(reg.test(string[i])){
        result.push(string[i].toLowerCase);
      }else{
        result.push(string[i]);
      }
    }
    return result.join("");
  }

  function toupper(string) {
    var reg = /[a-z]/;
    var result = [];
    for (var i = 0; i < string.length; i++) {
      if(reg.test(string[i])){
        result.push(string[i].toUpperCase);
      }else{
        result.push(string[i]);
      }
    }
    return result.join("");
  }

  function trim(string = "",chars = " ") {
    for (var i = 0; i < chars.length; i++) {
      string = string.split(chars[i]);
      string = string.join("");
    }
    return string;
  }


  function trimEnd(string = "",chars = " ") {
    var arr = chars.split("");
    string = string.split("");
    for (var i = string.length - 1; i >= 0; i--) {
      if(!arr.includes(string[i])){
        break;
      }else{
        string.pop();
      }
    }
    return string.join("");
  }


  function trimStart(string = "",chars = " ") {
    var arr = chars.split("");
    for (var i = 0; i < string.length; i++) {
      if(!arr.includes(string[i])){
        return string.slice(i);
      }
    }
  }


  function truncate(argument) {
    // body...
  }

  function unescape(string = "") {
    string = string.split("");
    var arr = "&amp;, &lt;, &gt;, &quot;,&#39;".split(",");
    var arr1 = ["&","<",">",'"',"'"];
    for (var i = 0; i < arr.length; i++) {
      string = string.split(arr[i]);
      string = string.join(arr1[i]);
    }
  }


  function upperCase(argument) {
    // body...
  }

  function upperFirst(argument) {
    // body...
  }

  function words(string = "",pattern) {
    if(pattern === undefined){
      var reg = /\w+/g;
    }else if(Object.prototype.toString.call(pattern) === "[object Object]"){
      var reg = new RegExp(pattern);
    }
      return string.match(reg);    
  }


  //until

  function matches(argument) {
    
  }


  function method(path,...args) {
    if (Object.prototype.toString.call(path) === "[object String]") {
      path = path.split(".");
      var result = [];
      for (var i = 0; i < path.length; i++) {
        if(path[i].includes("[")){
          path[i] = path[i].split("[");
          for (var j = 0; j < path[i].length; j++) {
            if(path[i][j].includes("]")){
              path[i][j] = path[i][j].slice(0,path[i][j].length - 1);
            }
          }
        }
        result = result.concat(path[i]);
      }
    }
    path = result;
    console.log(result);
    return function(object){
      for (var i = 0; i < path.length; i++) {
        object = object[path[i]];
      }
      return object;
    }
  }


  function methodOf(object,...args) {
    return function(path){
      if (Object.prototype.toString.call(path) === "[object String]") {
      path = path.split(".");
      }
      for (var i = 0; i < path.length; i++) {
        object = object[path[i]];
      }
      return object;
    }
  }


  function mixin(argument) {
    // body...
  }


  function range() {
    var start,end,step;
    if(arguments.length === 1){
      start = 0;
      end = arguments[0];
      arguments[0] > 0 ? step = 1:step = -1;
    }else if(arguments.length === 2){
      start = arguments[0];
      end = arguments[1];
      step = 1;
    }else{
      start = arguments[0];
      end = arguments[1];
      step = arguments[2];
    }
    var count = Math.abs(start - end);
    var result = [];
    if (start < end) {
      for (var i = start; i < end; i = i + step) {
        result.push(i);
        count--;
        if (count === 0) {
          return result;
        }
      }
      return result;
    }else if(end < start){
      for (var i = start; i > end; i = i +step) {
        result.push(i);
        count--;
        if (count === 0) {
          return result;
        }
      }
      return result;
    }else{
      while(count){
        result.push(start);
        count--;
      }
      return result;
    }
  }


  function rangeRight() {
    var start,end,step;
    if(arguments.length === 1){
      start = 0;
      end = arguments[0];
      arguments[0] > 0 ? step = 1:step = -1;
    }else if(arguments.length === 2){
      start = arguments[0];
      end = arguments[1];
      step = 1;
    }else{
      start = arguments[0];
      end = arguments[1];
      step = arguments[2];
    }
    var count = Math.abs(start - end);
    var result = [];
    if (start < end) {
      for (var i = start; i < end; i = i + step) {
        result.unshift(i);
        count--;
        if (count === 0) {
          return result;
        }
      }
      return result;
    }else if(end < start){
      for (var i = start; i > end; i = i +step) {
        result.unshift(i);
        count--;
        if (count === 0) {
          return result;
        }
      }
      return result
    }else{
      while(count){
        result.push(start);
        count--;
      }
      return result;
    }
  }

  function ary(func,n = func.length) {
    return function(...arg){
      var result = [];
      for (var i = 0; i < arg.length&&i<n; i++) {
        result.push(arg[i]);
      }
      func(...result);
    }
  }

  function unary(func) {
    return function(...arg){
      func(arg[0]);
    }
  }


  function once(func) {
    
  }


  function flip(func) {
    return function () {
      var arg = Array.from(arguments);
      arg = arg.reverse;
      func(...arg);
    }
  }

  function spread(func) {
    return function (argument) {
      return func(...argument);
    }
  }

  function toPath(path) {
    if (Object.prototype.toString.call(path) === "[object String]") {
      path = path.split(".");
      var result = [];
      for (var i = 0; i < path.length; i++) {
        if(path[i].includes("[")){
          path[i] = path[i].split("[");
          for (var j = 0; j < path[i].length; j++) {
            if(path[i][j].includes("]")){
              path[i][j] = path[i][j].slice(0,path[i][j].length - 1);
            }
          }
        }
        result = result.concat(path[i]);
      }
      path = result
    }
    return path;
  }

  function times(n,func) {
    var result = [];
    var func = iteratee(func);
    for (var i = 0; i < n; i++) {
      result.push(func(i));
    }
    return result;
  }


  function flow(funcs) {
    return function (argument) {
      argument = Array.from(arguments);
      if (baoliehua.isArray(funcs)) {
        for (var i = 0; i < funcs.length; i++) {
          if(baoliehua.isArray(argument)){
            argument = funcs[i](...argument);
          }else{
            argument = funcs[i](argument);
          }
        }
      }
      return argument;
    }
  }

  return {
    //other
    ary:ary,
    unary:unary,
    once:once,
    flip:flip,
    spread:spread,
    toPath:toPath,
    times:times,
    flow:flow,

    //Array
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
    identity:identity,
    //Math
    add:add,
    ceil:ceil,
    divide:divide,
    floor:floor,
    max:max,
    maxBy:maxBy,
    mean:mean,
    meanBy:meanBy,
    min:min,
    minBy:minBy,
    multiply:multiply,
    round:round,
    subtract:subtract,
    sum:sum,
    sumBy:sumBy,
    //Object
    assign:assign,
    assignIn:assignIn,
    at:at,
    defaults:defaults,
    defaultsDeep:defaultsDeep,
    findKey:findKey,
    findLastKey:findLastKey,
    forIn:forIn,
    forInRight:forInRight,
    forOwn:forOwn,
    forOwnRight:forOwnRight,
    functions:functions,
    functionsIn:functionsIn,
    get:get,
    has:has,
    hasIn:hasIn,
    invert:invert,
    invertBy:invertBy,
    invoke:invoke,
    keys:keys,
    keysIn:keysIn,
    mapKeys:mapKeys,
    mapValues:mapValues,
    merge:merge,
    mergeWith:mergeWith,
    omit:omit,
    omitBy:omitBy,
    pick:pick,
    pickBy:pickBy,
    result:result,
    //set:set,
    setWith:setWith,
    transform:transform,
   // unset:unset,
    update:update,
    updateWith:updateWith,
    values:values,
    valuesIn:valuesIn,
    //String
    camelCase:camelCase,
    capitalize:capitalize,
    deburr:deburr,
    escape:escape,
    escapeRegExp:escapeRegExp,
    kebabCase:kebabCase,
    lowerCase:lowerCase,
    lowerFirst:lowerFirst,
    pad:pad,
    padEnd:padEnd,
    padStart:padStart,
    parseInt:parseInt,
    repeat:repeat,
    replace:replace,
    snakeCase:snakeCase,
    split:split,
    startCase:startCase,
    startsWith:startsWith,
    template:template,
    toLower:toLower,
    trim:trim,
    trimEnd:trimEnd,
    trimStart:trimStart,
    truncate:truncate,
    unescape:unescape,
    upperCase:upperCase,
    upperFirst:upperFirst,
    words:words,
    //until
    matches:matches,
    method:method,
    methodOf:methodOf,
    mixin:mixin,
    range:range,
    rangeRight:rangeRight,
    //Number
    clamp:clamp,
    inRange:inRange,
    random:random,
  }
}()