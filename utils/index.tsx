const formatTime = (time: number) => {
    if(time < 60) {
      return time < 10 ? `0 ${time}s` : `${time}s`;
    }else {
      return Math.floor(time / 60) + 'm' + (time % 60) + 's';
    }
  }
  const getAverage=(data:object[])=>{
    // data.filter(d==)
    let jS:number=0;
    let jv:number=0;
    let c:number=0;
    let nll:number=0;
    data.filter((n:any)=>{
      if(n.a==='Javascript'){
        jS++
      }else if(n.a==='Java'){
        jv++;
      }else if(n.a==='C#'){
        c++;
      }else{
        nll++
      }
    })
    return {jS,jv,c,nll} 
  }
  export {
    formatTime,
    getAverage
  }