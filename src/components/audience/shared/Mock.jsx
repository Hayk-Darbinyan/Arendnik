import { Ic } from "./Icons.jsx";

export const S = ({ w = 100, c = "" }) => <i className={"sk " + c} style={{ width: w + "%" }} />;

export function Mock({ kind }) {
  const r3 = [0, 1, 2];
  switch (kind) {
    case "chat":
      return (
        <div className="mock">
          <div className="bub l"><S w={85} /><S w={55} /></div>
          <div className="bub r"><S w={70} /></div>
          <div className="bub l"><S w={60} /></div>
          <div className="bub r"><S w={90} /><S w={45} /></div>
          <div className="inp"><S w={55} /><b /></div>
        </div>
      );
    case "remind":
      return (
        <div className="mock">
          {r3.map((i) => (
            <div key={i} className="row">
              <span className="dot"><Ic n="bell" /></span>
              <div className="grow"><S w={80 - i * 12} /><S w={42} c="s" /></div>
              <span className={"tg" + (i !== 1 ? " on" : "")} />
            </div>
          ))}
        </div>
      );
    case "maint":
      return (
        <div className="mock">
          {[78, 46, 22].map((w, i) => (
            <div key={i} className="row">
              <span className="th"><Ic n="camera" /></span>
              <div className="grow">
                <S w={70 - i * 10} />
                <div className="pr"><u style={{ width: w + "%" }} /></div>
              </div>
            </div>
          ))}
        </div>
      );
    case "doc":
      return (
        <div className="mock">
          <div className="paper">
            {[92, 80, 96, 64].map((w, i) => <S key={i} w={w} />)}
            <svg className="sign" viewBox="0 0 90 26">
              <path d="M2 20c8-20 12 4 20-6s9 8 17 0 10-9 16-2 9 5 17 1" pathLength="100" />
            </svg>
          </div>
          <div className="row ok">
            <span className="dot"><Ic n="check" /></span>
            <div className="grow"><S w={45} /></div>
          </div>
        </div>
      );
    case "link":
      return (
        <div className="mock nodes">
          <b /><em /><b /><em /><b />
        </div>
      );
    case "card":
      return (
        <div className="mock">
          <div className="cc"><S w={35} c="w" /><S w={70} c="w" /></div>
          <div className="row">
            <div className="grow"><S w={60} /></div>
            <span className="tg on" />
          </div>
          <div className="pbtn"><S w={30} c="w" /></div>
        </div>
      );
    case "chart":
      return (
        <div className="mock">
          <div className="bars">
            {[42, 66, 52, 80, 62, 94].map((h, i) => (
              <u key={i} style={{ height: h + "%", animationDelay: i * 70 + "ms" }} />
            ))}
          </div>
          <div className="row">
            <div className="grow"><S w={50} /></div>
            <S w={20} />
          </div>
        </div>
      );
    case "tasks":
      return (
        <div className="mock">
          {[1, 1, 0, 0].map((d, i) => (
            <div key={i} className="row">
              <span className={"cb" + (d ? " on" : "")}>{d ? <Ic n="check" /> : null}</span>
              <div className="grow"><S w={78 - i * 9} /></div>
            </div>
          ))}
        </div>
      );
    default:
      return (
        <div className="mock">
          {[["in", 70], ["out", 55], ["in", 80]].map(([d, w], i) => (
            <div key={i} className="row">
              <span className={"arr " + d}><Ic n="arrow" /></span>
              <div className="grow"><S w={w} /><S w={35} c="s" /></div>
              <S w={18} />
            </div>
          ))}
        </div>
      );
  }
}

export default Mock;
