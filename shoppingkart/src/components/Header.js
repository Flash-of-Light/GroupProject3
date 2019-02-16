import React, { Component } from "react";
import CartScrollBar from "./CartScrollBar";
import Counter from "./Counter";
import EmptyCart from "../empty-states/EmptyCart";
import CSSTransitionGroup from "react-transition-group";
import { findDOMNode } from "react-dom";
import API from "./utils/API";


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
      cart: this.props.cartItems,
      mobileSearch: false
    };
  }
  handleCart(e) {
    e.preventDefault();
    this.setState({
      showCart: !this.state.showCart
    });
  }
  // handleSubmit(e) {
  //   e.preventDefault();
  //   API.getBestBuy(this.state.refs.searchBox.value)
  //     .then(res => this.setState({ recipes: res.data }))
  //     .catch(err => console.log(err));
  // }
  handleMobileSearch(e) {
    e.preventDefault();
    this.setState({
      mobileSearch: true
    });
  }
  handleSearchNav(e) {
    e.preventDefault();
    this.setState(
      {
        mobileSearch: false
      },
      function() {
        this.refs.searchBox.value = "";
        this.props.handleMobileSearch();
      }
    );
  }
  handleClickOutside(event) {
    const cartNode = findDOMNode(this.refs.cartPreview);
    const buttonNode = findDOMNode(this.refs.cartButton);
    if (cartNode.classList.contains("active")) {
      if (!cartNode || !cartNode.contains(event.target)) {
        this.setState({
          showCart: false
        });
        event.stopPropagation();
      }
    }
  }
  componentDidMount() {
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }
  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }
  render() {
    let cartItems;
    cartItems = this.state.cart.map(product => {
      return (
        <li className="cart-item" key={product.name}>
          <img className="product-image" src={product.image} />
          <div className="product-info">
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
          </div>
          <div className="product-total">
            <p className="quantity">
              {product.quantity} {product.quantity > 1 ? "Nos." : "No."}{" "}
            </p>
            <p className="amount">{product.quantity * product.price}</p>
          </div>
          <a
            className="product-remove"
            href="#"
            onClick={this.props.removeProduct.bind(this, product.id)}
          >
            ×
          </a>
        </li>
      );
    });
    let view;
    if (cartItems.length <= 0) {
      view = <EmptyCart />;
    } else {
      view = (
        <CSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          component="ul"
          className="cart-items"
        >
          {cartItems}
        </CSSTransitionGroup>
      );
    }
    return (
      <header>
        <div className="container">
          <div className="brand">
            <img
              className="logo"
              src="../logo.png"
              alt=" Shopping Kart"
            />
          </div>

          <div className="search">
            <a
              className="mobile-search"
              href="#"
              onClick={this.handleMobileSearch.bind(this)}
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEVNTU3///9MTExNTUzz8/P8/Pz39/f5+fk+Pj5FRUVISEhDQ0NAQEDg4OCZmZnS0tLm5ua3t7dVVVVmZmZ5eXm7u7uBgYGwsLCioqI5OTlbW1vIyMjs7OyoqKhTU1OHh4fOzs5qamqRkZGbm5txcXHBwcHY2NgHz56kAAATYUlEQVR4nN2daWOrKhCGkYgCmq1JszVLm57m///Eq4gLOCAQT4+5+dDadAI8ARlgXhBF//cXqn4REhkuCHAxsq3JxMfWnHVFmKbyzzSV/24viHYxsm3PxMfWJWtBmCbyr0RekCSRH0hkEml70dhqJqRnYraFkgvJum+rZ01KwjSuPykvSCw/mbYXqWoSxXFksE10WwLYpkbbxGwbUExSEja4sRegyfZJQIttQDGLporalutXg86AUG0/A+hTzLLxoqbP8avBXkF+q4l6FbP8j/QWE2miowLKrGvCSQCOew9KW6Tn8r+5B+tiooCvpleQCTbRppgV4V+qwQk00cofenpQ+dXUvy0XDiY+tr2xqAtg2vX4NsDijXS5Xmw3V4Sr10y7mGFcv9O7cLGd6eli2Ba9bbaL9TJ1q+2k6/EtgCR+HDZHmjHO1eIUF51L+DWy7QxzzjJ63ByWsQGwbfHS40dDgPPvE2UYoeIrRNWrvZhVv2f9//RNRrXlGT0dVvYaVDy+GXC+YwzDucx6Jfo1wNIWZ2w3j5KBDgkNAJ53R8lnBRyr0J62mB+3qx6gioSsgOSSM2Mu/x6wNOHZhVhqUBKaAFeb3KdE/wKwaKv5ZmUBFIQmwB/Gpw9YvDhbpyZA4fGbtQANcHHE5lym0UTr7/a4gO/BwhVGwuODgDdqyWVSgIUtvYE1mEqPDwLucrdcJgGIUL4DAbseX6/B1wJEKLs1C28qSe3x9XvQ1kSnCIgQvfcAux5fA3w/QrnMpgyI8fEHAqzXvDU/yCy96ITchGqL2QryfAgAJBvID068BosffEP6gLrHF/3qxW0kMzXAokO99Dyf7vGrwXb2ooDFAG6ldyup8IepAhjtzIPtaQMWd+JOA6w8PlEB50djLlMbyfRtj/MuoIhndTy+rMode11AxHe9xb/W49dLFi4T3mm5ic4FZmeiArYev150+mbDgL9aaD9b9p2qgI3HbxY7TviVARE+xSpg7fGbddEHdc1lkoAI04cKGCG1BqMDe23AGTsogNLjd9bjNhj65Is0UbFss+kCqh6/BEyPLw6I0DHtxH3SrscXy1VLas9lyoDSlj463UrX41frcevs1QFRtu82ytbjywXHBXtVwMaE3VUkLcq95a8OOONbFQkpf0Ub/pqA3WX+jYqkRLkjcsXqB6YOCJjgNxVJ0bXFBGFTEpMEhLwZ7gbuo1TTtUXVZ14MUC0mxkZdW7lkjPHrAWomBWET7tZ1bcWP8lMvOZJpTYpWCka55aI/xq8OWHyW2HRtQtyhf3LKswmomFEXsCaswzb41Wuw+A9WABtdm6zK8QEx5oxlVLzyLGO8+uffA5xhBbAibEVgbWPWkggrCM9ottktLuuPx3w+f3yuL4vdJqcZB5J72k3I/4g6bEVDmq4tqj3+CICY0Xy3f5TOttkzkIgfj/2WVhKkvwBYETaA0uPXt2ZStdIRmihm2WmxbNOt3G+7tEAe36eM4TDAgaxxV/bVjXKLgpQ2z/eiOEf3R7PhwSSwe9xmOfZKV7kwmZT+0KJrE+V7EhDT0zqODDHnqDsoXu2vOfYFHJoTYEwURYamaysL+FwTxfm1jMU6KH6TsiBrlM3GuwcloZK1pmvDz96D7LrvcjloQC+YOaTr8x2oWWu6NvwcIKf3OPKUNJPVjWLn0juYYDVrVdfW8fghgNnbMnIEVJTXn4iNCIhVJDXKXXv8MEB6I0ri7qL0dJePBVh7fEOUW3r8IEDO1iqXj+o+umTYkK4noCDUdW0d2Zf0+CGA10fk2kSBbQVkibkb4FBnLzy+WddWeXxkTMIIyE5nZ0B498P5ykeowcrjW3RthVFQDWZfz+98Sb7YCIClP7Tp2rCXGKoF3KbPNFF5cf5izwOiGY6UrDVdG24cog8g+xoDME3iakHab0bfL6aataZrC+tkTmNtzkre+JM12Hj8VItyNx4/oAb59awW+onNWSv0tPK6IkyVKHerzyDN3eoOiNlTbkKzXWZPAlYeP9Wi3I0+Q3p8v5FM7ehH2SBJDrml9A6AgjA1RblTfc3bZSx6G2yizSkAac+k/2VEW1gr4TwWKAhbwESNcqfqmrfbbOJtaCxK0vPqY39Y3O+L/ceqrGgbIIniK1QG98FO6fENUe7ybYz9ADEdmk08Ln/eaJ6x8pXl9G27fwxskPyg4U1U/E2U5Noot3gbey4OVSFlM+D7Jst4997GPGdfPzZASP7pN1xVkZDyV+QJiK+xpYmme57XUfOuv+IUrUlk7pBWjXgwaFUDq0hI+SvyA0T53lKDH6cccsjiJz196KrP1qWQQ/YEoKxDVdfWisBw7yu3rqpdzYDpLbeNcXl+JwbAOCLKjlVfQKwiqbq2vse3fo30x9hEVyc2UKKsnG8Z9tHv82DAyuMbdW09j29f+D0ZAZeUD5aI8wcxbFJOr+FBsCrKrXr8zohD8/j2GyFfm5roR+Yyz8T8I+rVYHVxyPplcANEIsrd6NqiSNO1qR7fDohRbDj3YukEiGaczWHAaC774IDlW4vH16Lcg11Z4QsN9yB1XSnA+bl3D4rkoh0PBCyj3DZdW9fjD/XV2QOOTaSn4XuwTpdvCDzz+MwDARHGKpKma/MAxCdD8OU21It2080WBJ5aYew4o+8VE6tImq7NHRCxBRw++3Dcm1ldzOhnBAFGdxYYQmk8PqRrI7U/dBlOUDgAmp78FrOk0K7XZ33SMEBUe3xI10Zq1ZfTeCkHAQtn7Vki+gPUYPFGHT31XTqSHl8mZ9K1OQDyHQgYeYsQhJYQ2KT8hwcBoq6ujaTq6S2xvA+dRrzZHgR8z31LhPIPyK2SCwsCREZdG2l1bU5DerFzoz/hBSS4Q50X36bQ0VOfNAiwXC81nN4icsHYERBnCTijr0dbHtMwzOcAYHTOgwDLOb5B1yZ+4b4PMsSwClcNrMlcMu8SFX3WOwAYJZ6dcmui1FkT5ZbtBDsClhv9gFW1VHYPfiXiNwAQVtW7JAdHub11bWwBLUOc37B/iYrRUQotMd6MWz2tyc2AKHfblbVR7iFvyzrbptuB7ooGABaDhzMASBamnZAD31c/yl0JW8TbTZR7cDiRrdM+YDliCwAsh0c9wCSV97RvclCUuzOAFqm4DAjpBwAY7bMQwPLr6gHG0U8eAoi6Ue5hXZsRsN7IqK2zHFgIIKqOelIB02oC5Z/csK7NbUhP5wDgwLYpY7rZAQAc3EdnmtU1UW6Drs1xzkLnAGAx5QkBxJJQ22b+sK/um5JrZsBP6tpKwv5S4L3fwbv412pnq36I5pIGNYixdG3FfdgHTPsdvNMAQozie6eEftIwwAFdm+usM//srXUWHfxe7+DdRkjlsK1/DOp7HgY4kq4tWwPnFVb+0Buw9Id9wLQ/xnWbE4yka8suUQ+QRGJM4w2IaKwf9VA2CHm6g29yVl1b6q5rYwsAMIrfPNZbmwt8ivuAcXTjIYDIpmtLNV2brSuTixj6WueW+wMiftPPshDpinlKwPfV1bURRdcmo9yOq9UbAgBG+9wfEOVrAgAmJxwCiMy6Nhnldo1h5QkUb3gEhG9nfAUAijl+ACAy6trMUW44l8IhAjoZ8sX9AbcQYNkvhwAadW0ycY/l+D24HP9Dvb9yueqtH/F9YGGABl1bE+WeOQIivoUfqlD6Gy/AMs4KAEZfPKwGIV2bLcptzAVTWKu2pp4lqta8e4AJDQNEoK7NHOW25NIcdaOuVpMT9yoR/wIB5fzXHxCNp2tj30ANRpEcuTk20RnO5hAgITseBoi6urbkKV2buH8g1f09cwdE+QEETGJ5F3oDjqlryx69JioG0EU7dS6RaKPAYzFS2Uj9AS1Rbm9dG7sRCLDw1dxlIl1pXxKoBotUtjwQEM1MUW5/XRueybFIb63zwblTiTBegYCxlLaFARqi3CG6NqFqg1aryYccvAEl6o788MMAGInFgjBAQ5Q7SNcmZG2g4jea59xaojI5DtagWAoU/UwoIBjlDtS15WujpPm8yWbWGsT5F3wPlmud31kwIFKi3PVTyQJ1bWXHbNRskwU1BkuL5HgGuwkBGFPXMCZQTMvpLd66NrFYbVbdf26oaYSE6Rfs6KvV6jsLB0SdKPezujbxRu9Y284yRPTzlvN+7zzj9ASPRSXgirrGaaFitqe3aE8l89e1lRfsZgQUuXxsGyG0XGMo/t7C06U2jLmn4YCoOb1FDrie0LWJCzG5sz2eb/5+O1GaFa9Sqk9PtzU4o+8CEiIXQ0IAUbOqDz+VzBewaBOpDVAUOj0v15fD4bB/X8Zxe9eDtlHVO6/LWzgIsPH4sebx/XVt8oLtLKr7JnrePCYUWDbUa1CYFIiBgNLjx5rHD9C11Rd5G/yzFzqClu6NtuvndG2x4vE7p7c0qhtnQISzpbEGwYG5E2DZ3RhHftaGJk9vgXRtxEvX1uaC8flZQEj2Vd2L3oCC0PJUMhwypOfXxHIPBtWgSG7trKbuFlNEuVVdW9TJBQeNePnXeejJWQGABaKvkrN6fxxdm5oL+4rVQo/0mMT6XvQARB1d21CU26crY5vkLwAm6d44tLUUU03OHOX266v522okN6He0qK78QMcSdfWy4WjpUF1Hw5YXqxz3x2DYJTbX9cGjHhrVczID5tdewoWQF1bo7Bx17VBueTb2FDo4Bos/1V3N44jyrF0bWAu7PrxFx42K2vReeFhJF2bwdvS3UofYw8CruyApGqoznMC4+ktnro2Uy6MHYgjYNWc4ztdEzugCJ47T3pMUW5fXZsxF5yxfQrsuYcf4hx/Uzaj+wHAKLpnroDtDFh9Kpm3rs2SC86vh7maCxh8SaPVgmflICpf2wFJklw9Jj1q1uOe11Z/jRnffdoBiyx/tuIhteUSZ3m2hgWwSKWSgDkB1lHuJ3VtQ7nwHN8/43q/UT/C+7OTS1TVCmCBaAWMUufoeR3lNujacNisE7Itzy/9c/k8J1HTXQv5VXL+OHzRXI0P4vpeNAB6rKHKKPfTujY3EQIvKE/b2+Ly87l8LD/fL9+3P6c8Z4AIQR4CY3yq/DpzXRvD3cW/cF2bC6CsnvIc4TyvzhEun+wNJ1chmgcFS9c1VBHlHkHXZs4ldDG3RDTWYETkQ4wc7o7W40NPJcOB57UZa9AjOZzvuyEUFTBZUsd0x9K1uZfeI7m6u+kDxqQK7Dt9typSsK7tLwBi2d0AgEkk9LRuWatIwbq2Ue/B2lYggoDiQVRO6Y6ma7MABtageLsYhoNTqzl1/eJG07WN2sm0to3r1w5N2TodjNno2txPb/ltQFTfixrgx9E5XauurRfl/s17sDYRiBrgymNWZ9O19aLcv9eLdk3KhqoeubE6cfesfU5v+QdNtPqV39Umij0ALbq2XpT7XwEWF9n1vSxluZAUzbdHz3m5imSOcv9DQCyePbAupiM/31/UuReVJq6nt/xTwPKneLBJzlwdfWeWoiJpTyWrP/HPAcNtbae3RLGnrm2KgAjUtbXrl366tikConF1baP6wZFszbq2OEDXNr0aRGZdW++pZC8KiAaeSoZGfiTK7wM2M2CDru3t5QFn1TMsdV1bo5FqD0H6xdnEuLbV8WjaU8laXdvWYy/ONAFRtZ2xfYyNqmurz4R50U5G2Io92CZdW1I+0/nFAVG27kgJ+lFuse760oDl9l3b6S3ls9VftxcVv46puhypRbmLzvS1axDhTaqut2pR7uiQvTYgYodURdKi3OTTNcQzUcD+oaNqlDuN4xN+aUB+SlVALcpdXIgT318WsBbXGU9vSapj+18XEPOzCqjo2mRseOeyODlZQO0Ixv5TyYrX/Pi6gOg4VwFTJcpd35r16PsFAdlO7VbUKHfDvcrwiwLi7NzXDCIdsOC+5HAus14u0wJE+QWQqqI+YEQ2jsfGTwyQq+fidj2+vr1uFXb84T+2xWwFAOoeX/ar66Mp8enWIDr+ACS6x292cizoYC5TA6Tf0MZyJcqt7OS4gYeHTreJovwGASpRbm332S57LcAdAAjp2qJ2XerW28kxYUB6A+7BBNK1dcI2yf2IXwQQH6F7MAF1bZ2tAkn0w7rn+k0XkLMfM6Cua1OFq6tNHv7cpd+yxfkG8oMJrGvT9w+SS84siU8BkJUHSVs23Wi6tt72unS1O5a65akC8uMOGGxbdG3Qlrn5jrNxtmGMbcszflPngz3A/lPJ1BqUHzh/n2h1LNKEADGjp4O6ZAHsSUl7ujYIsPgO4sdhc6RCaS9fM6y8ZsD70Hva+yYTqy3nLKPHzWGpraoBG3QAXRsEKD+ZPvb37eat/HZlZqjOE9VFad+ZNSVztu2a6LZNMrPZ22a7WD9S84NpNcG/pmuzbVKu04zqL6Wp/uYNy4WDiY9t4rxRVYtyj78D1GnH9kDWTramrNHgJ+0bJCcDaCwm0j7ZK8g4NZiYbcf5bs27AFVd299qos8APnXsTaQ/lewVAH3uQfWpZC8MaCwm8FSyyQP6FbMb5f4fuglY1zatGoR6Ue9i1h6/LkizslhPONpzI5ttyxZbotoSs21isQ3KWrNtTOQcvx7kJfpFU+g0bS6cbQlgS3q2w8n52OrFlHH82jumwxcOJu3WbQdb4m/rVUzh8dsB9PDQN8x25OS8sv4PRxRNULicOa0AAAAASUVORK5CYII="
                alt="search"
              />
            </a>
            <form
              action="#"
              method="get"
              className={
                this.state.mobileSearch ? "search-form active" : "search-form"
              }
            >
              <a
                className="back-button"
                href="#"
                onClick={this.handleSearchNav.bind(this)}
              >
                <img
                  src="https://res.cloudinary.com/sivadass/image/upload/v1494756030/icons/back.png"
                  alt="back"
                />
              </a>
              <input
                type="search"
                ref="searchBox"
                placeholder="Search"
                className="search-keyword"
                onChange={this.props.handleSearch} //changed from handleSearch to handleSearchNav//
              />
              <button
                className="search-button"
                type="submit"
                onClick={this.props.handleSubmitHeader}
              />
            </form>
          </div>

          <div className="cart">
            <div className="cart-info">
              <table>
                <tbody>
                  <tr>
                    <td>No. of items</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.totalItems}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Sub Total</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.total}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a
              className="cart-icon"
              href="#"
              onClick={this.handleCart.bind(this)}
              ref="cartButton"
            >
              <img
                className={this.props.cartBounce ? "tada" : " "}
                src="https://img.icons8.com/ios-glyphs/30/000000/shopping-cart.png"
                alt="Cart"
              />
              {this.props.totalItems ? (
                <span className="cart-count">{this.props.totalItems}</span>
              ) : (
                ""
              )}
            </a>
            <div
              className={
                this.state.showCart ? "cart-preview active" : "cart-preview"
              }
              ref="cartPreview"
            >
              <CartScrollBar>{view}</CartScrollBar>
              <div className="action-block">
                <button
                  type="button"
                  className={this.state.cart.length > 0 ? " " : "disabled"}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
