import React from 'react';
import { Container, FormControl, Navbar, Dropdown, Badge, Nav, Button } from 'react-bootstrap';
import { MdOutlineShoppingBasket } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { CartState } from '../contexts/Context';
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import './style.css'

function Header() {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <div className='header'>
      <Navbar bg='dark' variant='dark' fixed="top" style={{ height: '80px'}}>
        <Container>
          <Navbar.Brand>
            <Link to='/'>Shopping Cart</Link>
          </Navbar.Brand>
          <Navbar.Text className='search'>
            <FormControl
             style={{ width: 500 }}
             type="search"
             placeholder="Search a product..."
             className="m-auto"
             aria-label="Search"
             onChange={(e) => {
               productDispatch({
                 type: "FILTER_BY_SEARCH",
                 payload: e.target.value,
               });
             }} 
            />
          </Navbar.Text>

          <Nav style={{ position: 'relative'}}>
            <Dropdown alignRight >
              <Dropdown.Toggle variant="success">
                <MdOutlineShoppingBasket color="white" fontSize="25px" />
                <Badge className='bg-green'>{cart.length}</Badge>
              </Dropdown.Toggle>

              <Dropdown.Menu
                style={{
                  minWidth: '300px', // Set a maximum width
                  backgroundColor: 'white',
                  position: 'absolute',
                  left: 'auto', // Adjust as needed
                  right: '0', // Adjust as needed
                }}
              >
                {/* Dropdown content goes here */}
                {cart.length > 0 ? 
                (
                  <>
                  {cart.map((prod) => (
                    <span className="cartitem" key={prod.id}>
                      <img
                        src={prod.image}
                        className="cartItemImg"
                        alt={prod.name}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>₹ {prod.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
                ) 
                :
                (<span style={{ padding: 10 }}>Cart is Empty!!</span>)
                }
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
