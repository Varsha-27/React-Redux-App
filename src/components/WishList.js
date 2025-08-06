import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { removeFromWishList } from "../store/wishListSlice";

const WishList = () => {
  const products = useSelector((state) => state.wishList);
  const dispatch = useDispatch();
  const handleRemoveFromWishList = (id) => {
    dispatch(removeFromWishList(id));
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
          <Button
            variant="danger"
            onClick={() => handleRemoveFromWishList(product.id)}
          >
            Remove Item
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));
  return (
    <div className="row">
      <h2 className="text-center my-4">Wishlist</h2>
      {cards}
    </div>
  );
};
export default WishList;
