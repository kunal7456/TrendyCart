import React from 'react'
import  { Fragment, useEffect, useState, ChangeEvent } from "react";
import Carousel from "react-material-ui-carousel";
import {useProductDetailsQuery} from '../redux/api/productAPI';
import { Rating } from '@material-ui/lab';
import { RatingProps } from "@material-ui/lab/Rating";
import { useParams } from 'react-router-dom';
import Loader from '../components/loader';
import { server } from '../redux/store';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from "@material-ui/core";
import { CartReducerInitialState } from '../types/reducer-types';
import { CartItem } from '../types/types';
import { useDispatch } from 'react-redux';
import { addToCart, calculatePrice, cartReducer, discountApplied, removeCartItem } from '../redux/reducer/cartReducer';


function ProductDetails() {
    const params=useParams()
    const dispatch=useDispatch()
    const {data,isLoading,isError,error}=useProductDetailsQuery(params.id!);
    const {cartItems,subtotal,tax,total,shippingCharges,discount}=useSelector((state:{
        cartReducer:CartReducerInitialState
      })=>state.cartReducer)

    console.log(data)
    const options:RatingProps = {
        size: "large",
        value: data?.product.ratings|| 0,
        readOnly: true,
        precision: 0.5,
      };
      const [quantity, setQuantity] = useState(1);
      const [open, setOpen] = useState(false);
      const [rating, setRating] = useState(0);
      const [comment, setComment] = useState("");

      const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
      };
    
      const reviewSubmitHandler = () => {
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", match.params.id);
    
        dispatch(newReview(myForm));
    
        setOpen(false);
      };

      const incrementHandler = (cartItem: CartItem) => {
        if (cartItem.quantity >= cartItem.stock) return;
    
        dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
      };
      const decrementHandler = (cartItem: CartItem) => {
        if (cartItem.quantity <= 1) return;
    
        dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
      };
    
     

  return (
    <Fragment>
    {isLoading ? (
      <Loader />
    ) : (
      <Fragment>
        <div className="ProductDetails">
          <div>
            <Carousel>
              {data?.product.photo &&
                data?.product.photo.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={`${server}/${item}`}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
          </div>

          <div>
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
              <p>Product # {data?.product._id}</p>
            </div>
            <div className="detailsBlock-2">
              <Rating {...options} />
              <span className="detailsBlock-2-span">
                {" "}
                ({product.numOfReviews} Reviews)
              </span>
            </div>
            <div className="detailsBlock-3">
              <h1>{`₹${product.price}`}</h1>
              <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decrementHandler}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={incrementHandler}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
              <p>
                Status:
                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                  {product.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>

            <div className="detailsBlock-4">
              Description : <p>{product.description}</p>
            </div>

            <button onClick={submitReviewToggle} className="submitReview">
              Submit Review
            </button>
          </div>
        </div>

        <h3 className="reviewsHeading">REVIEWS</h3>

        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
            <Rating
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              size="large"
            />

            <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">
              Cancel
            </Button>
            <Button onClick={reviewSubmitHandler} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product.reviews &&
              product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </Fragment>
    )}
  </Fragment>
  )
}

export default ProductDetails