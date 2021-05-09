import React from 'react'

const Summary = (props) => {
  const {transation} = props
  function add0(m){
    return m<10?'0'+m:m 
  }
  function format(shijianchuo)
  {
  //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
  }
  return (
    <div>
      {
      transation && 
      <>
        <div className="kiseLw">
          <p>
            Hash
          </p>
           <p>
            {transation.hash}
           </p>
        </div>
        <div className="kiseLw">
          <p>
            Confirmations
          </p>
           <p>
            {transation.hash}
           </p>
        </div>
        <div className="kiseLw">
          <p>
            Height
          </p>
           <p>
            {transation.height}
           </p>
        </div>
        <div className="kiseLw">
          <p>
            Timestamp
          </p>
           <p>
            {transation.time}
           </p>
        </div>
      </>
      }
    </div>
  )
}
export default Summary