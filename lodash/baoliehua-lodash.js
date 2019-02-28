var baoliehua = function() {
	/**公用函数区，待添加 
	1、迭代器

	**/
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
    	var index = argument[2]?argument[2]:0;
    	for (var i = index; i <= 0; i--) {
    		if(argument[0][i] === argument[1]){
    			return i;
    		}
    	}
    	return -1;
    }

    function nth(array,n) {
    	return n > 0 ? array[n]:array[array.length + n + 1];
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
    	}
    }


    function slice(array,start = 0,end = array.length + 1){
    	var result = [];
    	for(var i = start;i < end;i++){
    		result.push(array[i]);
    	}
    	return result;
    }
    
    function sortedIndex(array,value) {
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
        	var result = array;
        	for (var i = 0; i < arg.length; i++) {
        		result = result.filler(arg[i]);
        	}
        	return result;
        }

        function xor(argument) {
         	// body...
         	var arr = argument.reduce(function(a,b){
         		a.concat(b);
         	});
         	var result = [];
         	for (var i = 0; i < arr.length; i++) {
         		if(arr.lastIndexOf(arr[i]) === arr.indexOf(arr[i])){
         			result.push(arr[i]);
         		}
         	}
         	return result;
         } 

         function zip(argument) {
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
         		a[array1[i]] = array2[i];
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
    drop: drop,
    dropRight: dropRight,
    fill: fill,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    fromPairs: fromPairs,
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
    sortedIndexOf: sortedIndexOf,
    sortedLastIndex: sortedLastIndex,
    sortedLastIndexOf: sortedLastIndexOf,
    sortedUniq: sortedUniq,
    sortedUniqBy: sortedUniqBy,
    tail: tail,
    take: take,
    takeRight: takeRight,
    union: union,
    uniq: uniq,
    unzip: unzip,
    without: without,
    xor: xor,
    zip: zip,
    zipObject: zipObject,
    unzipWith: unzipWith,
    forEach: forEach,
    forEachRight: forEachRight,
    includes: includes,
    size: size,
    eq: eq,
    gt: gt,
    gte: gte,
    isBoolean: isBoolean,
    isObject: isObject,
    isEqual: isEqual,
    isEmpty: isEmpty,
    lt: lt,
    lte: lte,
    toArray: toArray,
    add: add,
    divide: divide,
    max: max,
    mean: mean,
    min: min,
    multiply: multiply,
    subtract: subtract,
    sum: sum,
    every: every,
    some: some,
    groupBy: groupBy,
    reduce: reduce,
    isArray: isArray,
    isFunction: isFunction,
    isNull: isNull,
    isNumber: isNumber,
    isString: isString,
    isArguments: isArguments,
    isArrayBuffer: isArrayBuffer,
    isArrayLike: isArrayLike,
    isArrayLikeObject: isArrayLikeObject,
    isDate: isDate,
    isElement: isElement,
    isError: isError,
    isFinite: isFinite,
    isInteger: isInteger,
    isLength: isLength,
    isMap: isMap,
    isMatch: isMatch,
    isNaN: isNaN,
    isNil: isNil,
    isNull: isNull,
    isNative: isNative,
    isObjectLike: isObjectLike,
    isPlainObject: isPlainObject,
    isRegExp: isRegExp,
    isSafeInteger: isSafeInteger,
    isSet: isSet,
    isSymbol: isSymbol,
    isTypedArray: isTypedArray,
    isUndefined: isUndefined,
    isWeakMap: isWeakMap,
    isWeakSet: isWeakSet,
    toInteger: toInteger,
    toLength: toLength,
    toSafeInteger: toSafeInteger,
    inRange: inRange,
    endsWith: endsWith,
    identity: identity,
    toLower: toLower,
    lowerFirst: lowerFirst,
    capitalize: capitalize,
    forOwn: forOwn,
    assign: assign,
    toPairs: toPairs,
    toPairsIn: toPairsIn,
    toNumber: toNumber,
    toFinite: toFinite,
    keys: keys,
    keysIn: keysIn,
    values: values,
    valuesIn: valuesIn,
    camelCase: camelCase,
    escape: escape,
    escapeRegExp: escapeRegExp,
    kebabCase: kebabCase,
    lowerCase: lowerCase,
    pad: pad,
    padEnd: padEnd,
    padStart: padStart,
    parseInt: parseInt,
    repeat: repeat,
    replace: replace,
    snakeCase: snakeCase,
    split: split,
    startCase: startCase,
    startsWith: startsWith,
    toUpper: toUpper,
    trim: trim,
    trimEnd: trimEnd,
    trimStart: trimStart,
    unescape: unescape,
    upperCase: upperCase,
    upperFirst: upperFirst,
  }
}