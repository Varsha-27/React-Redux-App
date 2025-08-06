import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { removeFromWishList } from "../store/wishListSlice";
import {  add } from "../store/cartSlice";


const WishList = () => {
  const WishListproducts = useSelector((state) => state.wishList);
   const products = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleRemoveFromWishList = (id) => {
    dispatch(removeFromWishList(id));
  };

   const handleAddToCart = (id,product) => {
    dispatch(add(product))
    dispatch(removeFromWishList(id));
  };


  const cards = WishListproducts.map((product) => (
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
              variant="primary"
              onClick={() => handleAddToCart(product.id, product)}
            >
              Add to Cart
            </Button>
             <Button
              variant="danger"
              onClick={() => handleRemoveFromWishList(product.id)}
            >
              Remove Item
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  ));
  return (
    <div className="row">
      {WishListproducts.length > 0 ? (
        <h4 className=" my-4">
          My Wishlist{" "}
          <span style={{ color: "#888" }}>{WishListproducts.length} items</span>
        </h4>
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
          <h3 style={{ color: "#888" }}>Please add items to your wishlist</h3>
        </div>
      )}
      {cards}
    </div>
  );
};
export default WishList;
