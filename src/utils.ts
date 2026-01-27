export const random=(len:number)=>{
let options = "qwertyuiopadsfdghjfgkfjurhty12433414356548675567"
let length = options.length

let ans = ""
for(let i=0;i<len;i++){
    ans+=options[Math.floor((Math.random() * len))] //0-20
}
return ans;
}