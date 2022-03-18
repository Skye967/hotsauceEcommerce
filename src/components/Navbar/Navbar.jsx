import React,{useEffect} from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography  } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from "../../assets/commerceIcon.png";
import useStyles from './styles';
import {Link, useLocation} from 'react-router-dom';


const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();

    useEffect(() => {
        console.log('works')
        const viewWidth = window.innerWidth
        const searchBar = document.querySelector(".search");
        const login = document.querySelector("#login")
        console.log(viewWidth)
        if(viewWidth < 500){
            searchBar.style.display = 'none';
            login.style.display = 'none';
        }
      },);

  return (
    <>
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>

                <Typography component={Link} to='/' variant="h6" className={classes.title} color="inherit">
                    <img src={logo} alt="Commerce.js" height="25px" className={classes.image}/>
                    <div className="">
                        Kalani Hot Sauce
                    </div>
                </Typography>
            <div className='search'>
                <form action="#" style={{width: '100%'}}>
                    <div className="input-group w-100">
                        <input type="text" className="form-control" placeholder="Search" />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="submit">
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                    </div>
                </form>
            </div> 
        <div id='login' className="col-lg-4 col-sm-6 col-12">
                <div className="widgets-wrap float-md-right">
                    <div className="widget-header icontext">
                        <div className="text">
                            <span className="text-muted">Welcome!</span>
                            <div> 
                                <a href="#">Sign in</a> |  
                                <a href="#"> Register</a>
                            </div>
                        </div>
                    </div>
                </div> 
            </div> 
                <div className={classes.grow}/>
                {location.pathname === '/' && (
                <div className={classes.button}>
                    <IconButton component={Link} to='/cart' aria-label="Show cart items" color="inherit">
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCart/>
                        </Badge>
                    </IconButton>
                </div>)}
            </Toolbar>
        </AppBar>

    </>
  )
}

export default Navbar