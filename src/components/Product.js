import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { addToWishlist, removeFromWishList } from "../store/wishListSlice";
import Spinner from 'react-bootstrap/Spinner';
import { getProducts } from "../store/productSlice";
import Alert from "react-bootstrap/Alert";
import StatusCode from "../utils/StatusCode";

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);
  const wishlist = useSelector((state) => state.wishList);
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (status === StatusCode.LOADING) {
  return (
    <div
      style={{
        height: "70vh", // gives vertical space to center within
        display: "flex",
        justifyContent: "center", // center horizontally
        alignItems: "center",     // center vertically
      }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

  if (status === StatusCode.ERROR) {
    return (
      <Alert key="danger" variant="danger">
        Something went wrong! Try again later
      </Alert>
    );
  }
  const addToCart = (product) => {
    dispatch(add(product));
  };

  const handleWishlistToggle = (product) => {
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    if (isInWishlist) {
      dispatch(removeFromWishList(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };
  const cards = products.map((product) => {
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    return (
      <div
        className="col-md-3"
        key={product.id}
        style={{ marginBottom: "10px" }}
      >
        <Card style={{ width: "18rem" }} className="h-100">
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
                variant={isInWishlist ? "danger" : "outline-primary"}
                onClick={() => handleWishlistToggle(product)}
              >
                WISHLIST
              </Button>
              <Button variant="primary" onClick={() => addToCart(product)}>
                ADD
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </div>
    );
  });

  return (
    <>
      <h2 className="text-center my-4">Product Dashboard</h2>
      <div className="row p-3">{cards}</div>
    </>
  );
};

export default Product;
