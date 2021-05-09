import React from "react";
import "./css/Transaction.css";

const Transaction = ({ tx }) => {
  return (
    <div className="koYsLf">
      <div className="jhFHoy">
        <div className="gVJVZs">
          <div className="dIdVxU">HASH</div>
          <div className="dJDEkx">
            <a href="/" class="eEewhk" opacity="1">
              22d7fc4fc21ae0176a77c97785f7875576c9bf04a24c4283f5a068dc2a559c6a
            </a>
          </div>
        </div>
        <div className="gVJVZs">
          <div className="dIdVxU"></div>
          <div className="dJDEkx">
            <div className="fjudWa">
              <span class="eQTRKC">2020-12-22 15:09</span>
            </div>
          </div>
        </div>
      </div>
      <div className="jhFHoy"></div>
      <div className="jhFHoy">
        <div className="gVJVZs">
          <div className="dIdVxU">Free</div>
          <div className="dJDEkx">
            <div class="dwZIUy">
              <span class="cILyoi eQTRKC">0.00020812 BTC</span>
              <div class="cOpXwY">
                <span class="cILyoi eQTRKC">
                  (93.327 sat/B - 37.032 sat/WU - 223 bytes)
                </span>
                <span class="cILyoi eQTRKC">
                  (147.603 sat/vByte - 141 virtual bytes)
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="gVJVZs"></div>
      </div>
    </div>
  );
};

export default Transaction;
