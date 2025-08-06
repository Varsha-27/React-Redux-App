import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { remove, add } from "../store/cartSlice";

const Cart = () => {
  const products = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const incrementQuantity = (product) => {
    dispatch(add(product)); // Uses same add reducer
  };

  const decrementQuantity = (id) => {
    dispatch(remove(id)); // Uses updated remove reducer
  };
  const cards = products.map((product) => (
    <div
      className="col-md-4 "
      key={product.id}
      style={{ marginBottom: "10px" }}
    >
      <Card style={{ width: "18rem", margin: "auto" }} className="h-100">
        <div className="text-center">
          <Card.Img
            variant="top"
            src={product.image}
            height="200"
            style={{ width: "100px", height: "130px" }}
          />
        </div>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>INR: {product.price}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ backgroundColor: "white" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="success"
              onClick={() => incrementQuantity(product)}
            >
              +
            </Button>
            <span style={{ margin: "0 10px" }}>{product.quantity}</span>
            <Button
              variant="danger"
              onClick={() => decrementQuantity(product.id)}
            >
              -
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  ));
  return (
    <div className="row">
      {products.length > 0 ? (
        <h2 className="text-center my-4">Cart Dashboard</h2>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh", // Adjust height as needed
            width: "100%",
          }}
        >
          <h3 style={{ color: "#888" }}>
            There is nothing in your bag. Let's add some items
          </h3>
        </div>
      )}
      {cards}
    </div>
  );
};
export default Cart;
