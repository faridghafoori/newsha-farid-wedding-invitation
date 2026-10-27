import { wedding } from "../data.js";

export default function DressCode() {
  return (
    <section className="dress">
      <h2>Dress Code</h2>
      <p>{wedding.dressCode}</p>
      <div className="swatches">
        {wedding.colors.map((color) => (
          <span key={color} style={{ background: color }} />
        ))}
      </div>
    </section>
  );
}
