exports. generateStrongPassword=()=> {
    let lower_letters="abcdefghijklmnopqrstuvwxyz"
    let upper_letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let numbers="0123456789"
    let special_chars="@#$*&!"
    let password="";
    let n=8;
    for (var i = 0; i < n; ++i) {
      if(i==0){
      password+=upper_letters[Math.floor(Math.random()*(upper_letters.length))]
      }else if(i>0 && i<4){
      password+=lower_letters[Math.floor(Math.random()*(lower_letters.length))]
      }else if(i===4){
      password+=special_chars[Math.floor(Math.random()*(special_chars.length))]
      }else{
      password+=numbers[Math.floor(Math.random()*(numbers.length))]
      }
    }
    return password;
  }

  exports.getOtp=(length)=>{
      return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
  }