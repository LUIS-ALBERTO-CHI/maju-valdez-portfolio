export default function BackgroundLayer() {
  return (
    <div className="background-layer" aria-hidden="true">
      {/* Top area – around Hero */}
      <span className="blob b1" />
      <span className="blob b2" />

      {/* Mid page – around Experience / Education */}
      <span className="blob b3" />
      <span className="blob b4" />

      {/* Lower page – around Videos / Cuentas */}
      <span className="blob b5" />
      <span className="blob b6" />

      <span className="grain" />
    </div>
  );
}
