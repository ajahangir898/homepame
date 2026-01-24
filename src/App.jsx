import { Routes, Route } from "react-router-dom";
import { FrameScreen } from "./screens/FrameScreen";
import { PaymentScreen } from "./screens/PaymentScreen";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<FrameScreen />} />
      <Route path="/payment" element={<PaymentScreen />} />
    </Routes>
  );
};
