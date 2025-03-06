import { Link } from "react-router-dom";
export function Home() {
  return (
    <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: "80px" }}>
      <Link to="/supplier">Hallo pakcik</Link>
      <span>Hallo home</span>
    </div>
  );
}
