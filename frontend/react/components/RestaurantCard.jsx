import { Link } from "react-router-dom";
import { formatCurrency } from "../data";

export default function RestaurantCard({ restaurant }) {
  return (
    <article className="mf-card mf-reveal">
      <Link to={`/restaurante/${restaurant.id}`}>
        <div className="mf-card-media">
          <img src={restaurant.image} alt={`Pratos de ${restaurant.name}`} />
          <span className="mf-card-rating">
            ★ {restaurant.rating.toFixed(1)} ({restaurant.reviews})
          </span>
        </div>
        <div className="mf-card-body">
          <h3 className="mf-title">{restaurant.name}</h3>
          <p className="mf-caption" style={{ margin: "0.35rem 0 0" }}>
            {restaurant.cuisine}
          </p>
          <div className="mf-card-meta">
            <span>{restaurant.deliveryMinutes} min</span>
            <span>{formatCurrency(restaurant.deliveryFee)}</span>
            <span>{restaurant.distanceKm} km</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
