import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { url } from "../slice/api";
import { resetCart } from "../features/cartSlice";

const PayButton = ({ cartItems }) => {
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post(
        `${url}/stripe/create-checkout-session`,
        {
          cartItems,
        }
      );

      if (data.url) {
        window.location.href = data.url;
        dispatch(resetCart());
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>PROCEED TO CHECKOUT</button>
    </>
  );
};

export default PayButton;
