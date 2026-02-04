import { useDispatch, useSelector } from "react-redux";
import { toggleUnits } from "../features/weatherSlice";

export default function UnitToggle() {
  const dispatch = useDispatch();
  const units = useSelector((s) => s.weather.units);

  return (
    <button onClick={() => dispatch(toggleUnits())}>
      {units === "metric" ? "°C" : "°F"}
    </button>
  );
}
