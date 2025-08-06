import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { getProducts } from "../store/productSlice";
import Alert from 'react-bootstrap/Alert';
import StatusCode from "../utils/StatusCode";


const Product = () => {
  const dispatch = useDispatch();
  const { data: products,status } = useSelector(state => state.products);
  
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (status === StatusCode.LOADING){
    return <p>Loading.....</p>
  }
   if (status === StatusCode.ERROR){
    return <Alert key="danger" variant="danger">Something went wrong! Try again later</Alert>
  }
  const addToCart = (product) => {
    dispatch(add(product));
  };
  const cards = products.map((product) => (
    <div className="col-md-3" key={product.id} style={{ marginBottom: "10px" }}>
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
          <Button variant="primary" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));

  return (
    <>
      <h1 className="text-center my-4">Product Dashboard</h1>
      <div className="row">{cards}</div>
    </>
  );
};

export default Product;
