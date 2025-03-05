import { Link } from "react-router-dom";
export function Home() {
  return (
    <div style={{ paddingLeft: 20, paddingRight: 20 }}>
      <Link to="/supplier">Hallo pakcik</Link>
      <span>Hallo gaes</span>
    </div>
  );
}
