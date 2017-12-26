function isPrime(num){
  if (num.eq(1) || num.eq(2)) {
    return true;
  }
  var numSqrt = num.sqrt();
  for ( var j = new BigNumber(2); j.lessThan(numSqrt); j = j.plus(1) ) {
    if ( num.mod(j).eq(0) ) {
      return false;
    }
  }
  return true;
}

function getPrime(min) {
  var tryStart = min.plus(min.times(BigNumber.random()).round());
  var prime = tryStart;
  for( var i=tryStart; i.lessThan(tryStart.plus(100)); i = i.plus(1)) {
    var num = i;
    var found = isPrime(num);
    if (found) {
      prime = i;
      break;
    }
  }
  return prime;
}

function xgcd(a,b)
{ 
  if (b.eq(0)){
    return [new BigNumber(1), new BigNumber(0), new BigNumber(a)];
  }
  else {
    temp = xgcd(b, a.mod(b));
    x = temp[0]
    y = temp[1]
    d = temp[2]
    return [y, x.minus(y.times(a.dividedToIntegerBy(b))), d];
  }
}

function showInfo(boxId, varName, val){
  $("#" + boxId).append(varName + " : " + val + "<br />");
}

$(function(){
  var p, q, N, phiN;
  var e, d;

  $("#generate").click(function(){
    p = getPrime(new BigNumber(2).pow(16));
    q = getPrime(new BigNumber(2).pow(16));
    showInfo("key_info", "p", p);
    showInfo("key_info", "q", q);
    N = p.times(q);
    phiN = p.minus(1).times(q.minus(1));
    showInfo("key_info", "N", N);
    showInfo("key_info", "phiN", phiN);
    for (e = new BigNumber(3); e.lessThan(10000); e = e.plus(1)) {
      if ( isPrime(e) && !phiN.mod(e).eq(0) ) {
        break;
      }
    }
    var out = xgcd(new BigNumber(e), new BigNumber(phiN));
    // converting potential negative value
    d = phiN.plus(out[0]).mod(phiN);
    showInfo("key_info", "e", e);
    showInfo("key_info", "d", d);
  });
  
  var m, c;
  
  $("#encrypt").submit(function(event){
    m = $("#msg").val();
    // $("#msg")[0].checkValidity();
    if(!m || !N) return false;
    m = new BigNumber(m);
    c = m.pow(e, N);
    showInfo("cipher_info", "m", m);
    showInfo("cipher_info", "c", c);
    // event.preventDefault();
    return false;
  });
  
  var md;
  $("#dencrypt").click(function(){
    md = c.pow(d,N);
    showInfo("message_info", "m", md);
  });
});

console.log(isPrime(new BigNumber(130)));